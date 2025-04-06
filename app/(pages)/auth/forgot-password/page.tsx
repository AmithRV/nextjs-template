"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
};

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {};

  return (
    <div className="bg-gray-100 font-sans">
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
                className="cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium 
                        text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Send Reset Link
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
  );
}

export default ForgotPassword;
