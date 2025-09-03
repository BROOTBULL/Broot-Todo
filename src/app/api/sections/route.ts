import { Project, Section, Todo } from "@/app/models/todoModel";
import { requireUser } from "@/lib/auth";
import { connect } from "@/app/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   try {
//     await connect();
//     const userId = await requireUser();

//     const projects = await Project.find({ owner: userId }).populate({
//       path: "sections",
//       populate: {
//         path: "todos",
//         populate: [
//           { path: "section", select: "name _id" },
//           { path: "project", select: "title _id" },
//         ],
//       },
//     });

//     return NextResponse.json(projects, { status: 200 });
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.error(error.message);
//       return NextResponse.json(
//         { error: "Something went wrong", details: error.message },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json(
//       { error: "Unknown error occurred" },
//       { status: 500 }
//     );
//   }
// }

/////////// add section
export async function POST(req: NextRequest) {
  try {
    await connect();
    const userId = await requireUser(); // ensure logged in

    const body = await req.json();
    const { name, projectId } = body;

    if (!name || !projectId) {
      return NextResponse.json(
        { error: "Name and ProjectId are required" },
        { status: 400 }
      );
    }

    // verify ownership of project
    const project = await Project.findOne({ _id: projectId, owner: userId });
    if (!project) {
      return NextResponse.json(
        { error: "Project not found or forbidden" },
        { status: 404 }
      );
    }

    // create section first (with project)
    const section = await Section.create({
      name,
      project: projectId,
    });

    // create todo (with both project + section)
    const todo = await Todo.create({
      task: "Task name ...",
      description: "Description....",
      priority: 4,
      project: projectId,
      section: section._id,
      user:userId,
    });

    // link todo to section
    section.todos.push(todo._id);
    await section.save();

    // link section to project
    project.sections.push(section._id);
    await project.save();

    // return full populated project
    const populated = await Project.findById(projectId).populate({
      path: "sections",
      populate: {
        path: "todos",
        populate: [
          { path: "section", select: "name _id" },
          { path: "project", select: "title _id" },
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

///////// delete section

export async function DELETE(req: NextRequest) {
  try {
    await connect();
    const userId = await requireUser();

    const { sectionId, projectId } = await req.json();
    if (!sectionId || !projectId) {
      return NextResponse.json(
        { error: "Section ID is required" },
        { status: 400 }
      );
    }

    // Check section exists
    const section = await Section.findById(sectionId);
    if (!section) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 });
    }

    // Verify ownership via project
    const project = await Project.findOne({
      _id: projectId,
      owner: userId,
    });
    if (!project) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Delete todos + section and update project
    await Todo.deleteMany({ _id: { $in: section.todos } });
    await Section.findByIdAndDelete(sectionId);
    await Project.findByIdAndUpdate(projectId, {
      $pull: { sections: sectionId },
    });

    return NextResponse.json({
      ok: true,
      message: "Section deleted successfully",
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Delete section error:", err.message);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
