import { connect } from "@/app/dbConfig/dbConfig";
import { Project, Todo, Section } from "@/app/models/todoModel";
import { User } from "@/app/models/userModel";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";



async function createProjectWithDefaults(ownerId: string, title: string,name:string, isInbox = false) {
  
  const section = await Section.create({ name: name , todos: [] });

  const project = await Project.create({
    title,
    owner: ownerId,
    isInbox,
    sections: [section._id],
  });

  const todo = await Todo.create({
    task: "Welcome to Broot-Todo",
    description: "You can add, edit, and track tasks here",
    priority: 2,
    section: section._id,
    project: project._id,
  });

  await Section.findByIdAndUpdate(section._id, { $push: { todos: todo._id } });

  const populated = await Project.findById(project._id).populate({
    path: "sections",
    select: "name",
    populate: {
      path: "todos",
      select: "task description priority status dueDate project section",
      populate: [
        { path: "project", select: "title isInbox _id" },
        { path: "section", select: "name _id" },
      ],
    },
  });

  return populated;
}

export async function POST(req: NextRequest) {
  try {
    await connect();
    const { email, password, username } = await req.json();
    if (!email || !password || !username) {
      return NextResponse.json({ error: "Email, username & password required" }, { status: 400 });
    }

    const exists = await User.findOne({ email });
    if (exists) return NextResponse.json({ error: "User already exists" }, { status: 409 });

    const passwordHash = await hash(password, 12);
    const user = await User.create({ email, username, password: passwordHash });

    const firstProject = await createProjectWithDefaults(user._id, "First Project","Getting Started", false);
    const inboxProject = await createProjectWithDefaults(user._id, "Inbox","Section", true);

    // keep user.data in sync (if you're using it)
    user.data = [firstProject!._id, inboxProject!._id];
    await user.save();

    return NextResponse.json({ ok: true, userId: user._id });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
