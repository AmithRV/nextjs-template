import User from "@/models/userModal";
import { genSalt, hash } from "bcryptjs";
import connect from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { name, email, password } = reqBody;

    // Check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //hash password
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    //Add user to the db
    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
