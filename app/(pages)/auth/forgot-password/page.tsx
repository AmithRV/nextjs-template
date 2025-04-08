"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import toast, { Toaster } from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { passwordReset } from "@/lib/api-collections/auth";

type Inputs = {
  email: string;
};

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResetLinkSend, setIsResetLinkSend] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const userDetails = { email: data.email };

    setIsLoading(true);
    passwordReset(userDetails)
      .then(() => {
        setIsResetLinkSend(true);
        toast.success("Password reset link has been sent to your email.");
      })
      .catch((error) => {
        console.log("error : ", error);
        const message = error.response.data.error;

        if (message) {
          toast.error(message);
        } else {
          toast.error("Something went wrong");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className={cn("bg-gray-100 font-sans", { hidden: isResetLinkSend })}>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
            {/* <!-- Logo/Brand --> */}
            <div className="text-center mb-8">
              <h2 className="text-center text-3xl font-extrabold text-gray-900">
                Password Recovery
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Enter your email to receive a password reset link
              </p>
            </div>

            {/* <!-- Form --> */}
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <Input
                    id="email"
                    type="email"
                    className={cn("px-4 py-3", {
                      "input-error": errors.email,
                    })}
                    {...register("email", { required: true })}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <span className="form-error">email required</span>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className={cn(
                    "cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white",
                    { "bg-red-500": isLoading },
                    { "bg-blue-600": !isLoading }
                  )}
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </div>
            </form>

            {/* <!-- Links --> */}
            <div className="mt-6 flex items-center justify-center">
              <div className="text-sm">
                <Link
                  href="/auth/login"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Return to login
                </Link>
              </div>
            </div>

            {/* <!-- Optional: Help text --> */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500">
                If you don't receive an email within 5 minutes, check your spam
                folder or
                <a href="#" className="text-blue-600 hover:underline">
                  {" "}
                  contact support
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "bg-gray-50 min-h-screen flex items-center justify-center",
          { hidden: !isResetLinkSend }
        )}
      >
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          {/* <!-- Icon/Image --> */}
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-green-100 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* <!-- Heading --> */}
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Password Reset Email Sent
          </h1>

          {/* <!-- Message --> */}
          <p className="text-gray-600 text-center mb-6">
            We've sent a password reset link to your email address. Please check
            your inbox and follow the instructions to reset your password.
          </p>

          {/* <!-- Instruction Details --> */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-medium text-blue-800 mb-2">
              Next Steps:
            </h2>
            <ul className="text-blue-700 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">1.</span>
                <span>
                  Check your email inbox for the reset link (including spam/junk
                  folders)
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">2.</span>
                <span>
                  Click the link in the email to create a new password
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">3.</span>
                <span>
                  The link will expire in 30 minutes for security reasons
                </span>
              </li>
            </ul>
          </div>

          {/* <!-- Buttons --> */}
          <div className="flex flex-col space-y-3">
            <Link
              href="/auth/login"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md text-center transition duration-200"
            >
              Return to Login
            </Link>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default ForgotPassword;
