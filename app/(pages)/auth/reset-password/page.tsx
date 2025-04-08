"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { resetPassword } from "@/lib/api-collections/auth";

type Inputs = {
  password: string;
  confirmPassword: string;
};

function page() {
  const router = useRouter();
  const { token } = router.query;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const password = watch("password");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsLoading(true);
    resetPassword({ token, password: data.password })
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="bg-gray-100 font-sans">
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          {/* <!-- Logo --> */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>

          {/* <!-- Header --> */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Reset Your Password
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              Enter a new password for your account
            </p>
          </div>

          {/* <!-- Form --> */}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="new-password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <div className="relative">
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Enter new password"
                  className={cn("px-4 py-3", {
                    "input-error": errors.password,
                  })}
                  {...register("password", {
                    required: "Password is required",
                    validate: (value: string) => {
                      if (value.length < 8) {
                        return "passwords must be at least 8 characters";
                      }
                    },
                  })}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Password must be at least 8 characters long
              </p>
              {errors.password && (
                <span className="form-error">{errors.password.message}</span>
              )}
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm new password"
                className={cn("px-4 py-3", {
                  "input-error": errors.confirmPassword,
                })}
                {...register("confirmPassword", {
                  required: "Password is required",
                  validate: (value: string) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <span className="form-error">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className={cn(
                  "cursor-pointer w-full text-white py-2 px-4 rounded-md ",
                  { "bg-red-500": isLoading },
                  { "bg-blue-600": !isLoading }
                )}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Reset Password"}
              </button>
            </div>
          </form>

          {/* <!-- Footer Links --> */}
          <div className="mt-6 text-center text-sm">
            <Link
              href="/auth/login"
              className="text-blue-600 hover:text-blue-800"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
