import { connect } from "@/app/dbConfig/dbConfig";
import { User } from "@/app/models/userModel";
import { compare } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connect();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "email & password required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }

    const isValid = await compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "invalid credentials" }, { status: 401 });
    }

    // user is authenticated (NextAuth will handle the session)
    return NextResponse.json({ ok: true, userId: user._id });
  } catch (err: unknown) {
   if (err instanceof Error) {
    console.error("Login error:", err.message);
  } else {
    console.error("Login error:", err);
  }
  return NextResponse.json({ error: "internal server error" }, { status: 500 });
  }
}
