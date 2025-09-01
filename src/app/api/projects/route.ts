import { Project, Section, Todo } from "@/app/models/todoModel";
import { requireUser } from "@/lib/auth";
import { connect } from "@/app/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/app/models/userModel";

export async function GET(req: NextRequest) {
  try {
    await connect();
    const userId = await requireUser();

    const projects = await Project.find({ owner: userId }).populate({
      path: "sections",
      populate: {
        path: "todos",
        populate: [
          { path: "section", select: "name _id" }, 
          { path: "project", select: "title _id" }, 
        ],
      },
    });

    return NextResponse.json(projects, { status: 200 });
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

export async function POST(req: NextRequest) {
  try {
    await connect();
    const userId = await requireUser();

    const body = await req.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    console.log("Title:", title);

    const todo = await Todo.create({
      task: "Task name ...",
      description: "Description....",
      priority: 4,
    });

    const section = await Section.create({
      name: "Section",
      todos: [todo._id],
    });

    const project = await Project.create({
      title,
      isInbox: false,
      owner: userId,
      sections: [section._id],
    });

    const populated = await Project.findById(project._id).populate({
      path: "sections",
      populate: { path: "todos" },
    });

    await User.findByIdAndUpdate(userId, { $push: { data: project._id } });

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


export async function DELETE(req: NextRequest) {
  try {
    await connect();
    const userId = await requireUser();

    const { projectId } = await req.json();
    if (!projectId) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    // Find the project to make sure the user owns it
    const project = await Project.findOne({ _id: projectId, owner: userId });
    if (!project) {
      return NextResponse.json({ error: "Project not found or forbidden" }, { status: 404 });
    }

    // Delete all todos in all sections of this project
    const sectionIds = project.sections;
    const sections = await Section.find({ _id: { $in: sectionIds } });
    const todoIds = sections.flatMap((section) => section.todos);

    await Todo.deleteMany({ _id: { $in: todoIds } });
    await Section.deleteMany({ _id: { $in: sectionIds } });
    await Project.findByIdAndDelete(projectId);

    // Remove project from user's data array
    await User.findByIdAndUpdate(userId, { $pull: { data: projectId } });

    return NextResponse.json({ ok: true, message: "Project deleted successfully" });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Delete project error:", err.message);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}