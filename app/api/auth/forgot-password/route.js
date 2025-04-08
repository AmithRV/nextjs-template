import crypto from "crypto";
import User from "@/models/userModal";
import connect from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import { sendResetEmail } from "@/util/email";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    // Check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      // Generate token and set expiry (1 hour from now)
      const token = crypto.randomBytes(20).toString("hex");
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

      await user.save();

      // Send email with reset link
      const resetUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/reset-password?token=${token}`;
      await sendResetEmail(user.email, resetUrl);

      NextResponse.json(
        { message: "Password reset email sent" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: "Not a valid email" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
