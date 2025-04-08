import User from "@/models/userModal";
import { genSalt, hash } from "bcryptjs";
import connect from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { token, password } = reqBody;

    // Check if user already exists
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (user) {
      // Hash new password and clear reset token
      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);

      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save();

      NextResponse.json(
        { message: "Password updated successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
