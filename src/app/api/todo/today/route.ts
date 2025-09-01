// app/api/todos/today/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/app/dbConfig/dbConfig";
import {Todo} from "@/app/models/todoModel"; // adjust if it's a named export

export async function GET(req: NextRequest) {
  try {
    await connect();

    // Get today's start and end times
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    // Query todos with due date between start and end of today
    const todos = await Todo.find({
      dueDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).populate("section","name _id").populate("project","title _id");

    return NextResponse.json({ todos }, { status: 200 });
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
