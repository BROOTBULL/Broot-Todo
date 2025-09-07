// app/api/ai-project/route.ts
import { connect } from "@/app/dbConfig/dbConfig";
import { Project, Todo, Section } from "@/app/models/todoModel";
import { User } from "@/app/models/userModel";
import {
  Section as SectionType,
  Todo as TodoType,
} from "@/app/utils/store/todo.store";
import { requireUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

const apiUrl =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent";
const apiKey = process.env.GEMINI_API_KEY!;

export async function POST(req: NextRequest) {
  try {
    await connect();
    const userId = await requireUser();

    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const systemPrompt = `
You are a world-class project planner.
Generate a project plan in **valid JSON only** that includes:
- A project title
- Multiple sections
- Each section must have todos.

Each todo must include:
- "task": short task title
- "description": always present, a detailed description (use bullet points where possible)  and must use Markdown-safe strings formate ,suggested duration if applicable (e.g., "5 days", "3 hours") in brackets
- "priority": integer from 1 (high) to 4 (low), based on importance
Do not include any text outside the JSON as Markdown-safe strings.
- Inside "description", always use "\\n" for new lines and "-" for bullets .
- Inside "description" always give two line break together .
- Example description format:
  "- Do research [2 days]\\n- Write draft [3 days]\\n- Review with team [1 day]

`;
    const userQuery = `Create a project plan for: "${prompt}". Include a title, at least 3 sections where possible , and 3–5 todos per section where possible.`;

    const payload = {
      contents: [{ parts: [{ text: userQuery }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            projectTitle: { type: "STRING" },
            sections: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  name: { type: "STRING" },
                  todos: {
                    type: "ARRAY",
                    items: {
                      type: "OBJECT",
                      properties: {
                        task: { type: "STRING" },
                        description: { type: "STRING" },
                        priority: { type: "NUMBER" },
                      },
                      required: ["task", "description", "priority"],
                    },
                  },
                },
                required: ["name", "todos"],
              },
            },
          },
          required: ["projectTitle", "sections"],
        },
      },
    };

    const response = await fetch(`${apiUrl}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Gemini API failed: ${response.status}`);
    }

    const result = await response.json();
    const rawJson = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawJson) {
      return NextResponse.json(
        { error: "No project plan generated" },
        { status: 500 }
      );
    }

    let llmPlan;
    try {
      llmPlan = JSON.parse(rawJson);
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON returned by LLM" },
        { status: 500 }
      );
    }

    const { projectTitle, sections } = llmPlan;

    const createdProject = await Project.create({
      title: projectTitle,
      isInbox: false,
      owner: userId,
      sections: [],
    });

    const projectSections = await Promise.all(
      sections.map(async (s: SectionType) => {
        const newSection = await Section.create({ name: s.name, todos: [] });

        const todos = await Promise.all(
          s.todos.map(async (t: TodoType) => {
            const newTodo = await Todo.create({
              task: t.task,
              description: t.description || "No description Provided",
              priority: t.priority ?? 4,
              project: createdProject._id,
              section: newSection._id,
              user: userId,
            });
            return newTodo._id;
          })
        );

        newSection.todos = todos;
        await newSection.save();

        return newSection._id;
      })
    );

    createdProject.sections = projectSections;
    await createdProject.save();

    await User.findByIdAndUpdate(userId, {
      $push: { data: createdProject._id },
    });

    const populated = await Project.findById(createdProject._id).populate({
      path: "sections",
      select: "name todos",
      populate: {
        path: "todos",
        select: "task description priority status dueDate project section user",
        populate: [
          { path: "project", select: "title isInbox _id" },
          { path: "section", select: "name _id" },
        ],
      },
    });

    return NextResponse.json(populated, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json(
        { error: "Something went wrong", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Unknown error occurred" },
      { status: 500 }
    );
  }
}
