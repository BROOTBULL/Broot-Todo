import { Project, Section, Todo } from "@/app/models/todoModel";
import { requireUser } from "@/lib/auth";
import { connect } from "@/app/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connect();
    const userId = await requireUser();

    const { task, description, priority, dueDate, projectId, sectionId } =
      await req.json();

    const project = await Project.findOne({ owner: userId, _id: projectId });
    if (!project) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const section = await Section.findOne({
      $and: [{ _id: sectionId }, { _id: { $in: project.sections } }],
    });

    if (!section) {
      return NextResponse.json({ error: "Invalid section" }, { status: 400 });
    }

    const todo = await Todo.create({
      task,
      description,
      priority: priority ?? 4,
      dueDate: dueDate ? new Date(dueDate) : null,
      project: project._id,
      section: section._id,
    });

    section.todos.push(todo._id);
    await section.save();

    return NextResponse.json(todo, { status: 201 });
  } catch (err: unknown) {
  console.error("Error creating todo:", err);

  let message = "Unknown error";
  if (err instanceof Error) {
    message = err.message;
  }

  return NextResponse.json(
    { error: "Internal Server Error", details: message },
    { status: 500 }
  );
}
}

export async function PATCH(req: NextRequest) {
  try {
    await connect();
    const userId = await requireUser();

    const { _id, task, description, priority, dueDate,status, projectId, sectionId } =
      await req.json();

    if (!_id) {
      return NextResponse.json(
        { error: "Todo ID is required" },
        { status: 400 }
      );
    }

    // find the todo 
    const todo = await Todo.findById(_id).populate("section project");
    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    // ensure the current todo belongs to the user
    const oldProject = await Project.findOne({
      owner: userId,
      _id: todo.project,
    });
    if (!oldProject) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    let newProject = oldProject;
    let newSection = await Section.findById(todo.section);

    //if project/section change requested
    if (projectId && sectionId) {
      newProject = await Project.findOne({ owner: userId, _id: projectId });
      if (!newProject) {
        return NextResponse.json({ error: "Forbidden project" }, { status: 403 });
      }

      newSection = await Section.findOne({
       $and:[ {_id: sectionId},
        {_id: { $in: newProject.sections }}]
      });

      if (!newSection) {
        return NextResponse.json({ error: "Invalid section" }, { status: 400 });
      }

      // remove todo from old section
      await Section.updateOne(
        { _id: todo.section },
        { $pull: { todos: todo._id } }
      );

      // add todo to new section
      newSection.todos.push(todo._id);
      await newSection.save();

      // update todo’s project + section
      todo.project = newProject._id;
      todo.section = newSection._id;
    }

    //update fields if provided
    if (task) todo.task = task;
    if (description) todo.description = description;
    if (status) todo.status=status;
    if (priority) todo.priority = priority;
    if (dueDate) todo.dueDate = new Date(dueDate);

    await todo.save();

    return NextResponse.json(todo, { status: 200 });
  } catch (err: unknown) {
    console.error("Error updating todo:", err);

    let message = "Unknown error";
    if (err instanceof Error) {
      message = err.message;
    }

    return NextResponse.json(
      { error: "Internal Server Error", details: message },
      { status: 500 }
    );
  }
}
