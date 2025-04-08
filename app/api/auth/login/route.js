import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import User from "@/models/userModal";
import connect from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    //check if password is correct
    const response = compare(password, user.password).then((valid) => {
      if (valid) {
        // Create token data
        const tokenData = {
          id: user._id,
          email: user.email,
        };

        //Create token
        const token = sign(tokenData, process.env.TOKEN_SECRET, {
          expiresIn: "1d",
        });

        //Create response
        const response = NextResponse.json({
          id: user._id,
          success: true,
          data: user,
        });
        response.cookies.set("token", token, { httpOnly: true });

        //  send verification mail

        return response;
      }
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
