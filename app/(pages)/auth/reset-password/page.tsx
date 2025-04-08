"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import toast, { Toaster } from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { resetPassword } from "@/lib/api-collections/auth";
import { useRouter, useSearchParams } from "next/navigation";

type Inputs = {
  password: string;
  confirmPassword: string;
};

function page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const password = watch("password");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResetSuccessfull, setIsResetSuccessfull] = useState<boolean>(true);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const token = searchParams.get("token");

    setIsLoading(true);
    resetPassword({ token, password: data.password })
      .then(() => {
        setIsResetSuccessfull(true);
        router.push("/auth/login");
      })
      .catch((error) => {
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
      <div
        className={cn("bg-gray-100 font-sans", { hidden: isResetSuccessfull })}
      >
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

      <div
        className={cn("bg-gray-100 font-sans", { hidden: !isResetSuccessfull })}
      >
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Redirecting...
            </h1>

            {/* <!-- Loading spinner --> */}
            <div className="flex justify-center my-6">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>

            <p className="text-gray-600 mb-2">
              You are being redirected to another page.
            </p>
            <p className="text-gray-600">
              If you are not redirected automatically,
              <Link
                href="/auth/login"
                className="text-blue-500 hover:text-blue-700 underline"
              >
                click here
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default page;
