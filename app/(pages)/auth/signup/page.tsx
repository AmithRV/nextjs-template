"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import toast, { Toaster } from "react-hot-toast";
import { userSignup } from "@/lib/api-collections/auth";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  terms: boolean;
  password: string;
  confirmPassword: string;
};

function Signup() {
  const router = useRouter();

  const {
    reset,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const password = watch("password");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  const handleSignup = (userDetails: any) => {
    setIsLoading(true);
    userSignup(userDetails)
      .then(() => {
        toast.success("Signup successful!");
        reset();
        setIsRedirecting(true);
        router.push("/auth/login");
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const userDetails = {
      name: data?.name,
      email: data?.email,
      password: data?.password,
    };
    setIsLoading;
    handleSignup(userDetails);
  };

  return (
    <>
      <div
        className={cn(
          "bg-gray-100 min-h-screen flex items-center justify-center",
          { hidden: isRedirecting }
        )}
      >
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md my-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
            <p className="text-gray-600 mt-2">Join our community today!</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              {/* <!-- Name fields --> */}
              <div>
                <label
                  htmlFor="text"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <Input
                  id="text"
                  type="text"
                  placeholder="name"
                  className={cn("px-4 py-3", {
                    "input-error": errors.name,
                  })}
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="form-error">name required</span>
                )}
              </div>

              {/* <!-- Email --> */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email"
                  className={cn("px-4 py-3", {
                    "input-error": errors.email,
                  })}
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="form-error">email required</span>
                )}
              </div>

              {/* <!-- Password --> */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <Input
                  type="password"
                  id="password"
                  placeholder="password"
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
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 8 characters
                </p>
                {errors.password && (
                  <span className="form-error">{errors.password.message}</span>
                )}
              </div>

              {/* <!-- Confirm Password --> */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password
                </label>
                <Input
                  type="password"
                  id="confirmPassword"
                  placeholder="password"
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

              {/* <!-- Terms checkbox --> */}
              <div className="flex items-start">
                <Input
                  type="checkbox"
                  id="terms"
                  className={cn(
                    "mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded",
                    {
                      "input-error": errors.terms,
                    }
                  )}
                  {...register("terms", { required: true })}
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-gray-700"
                >
                  I agree to the{" "}
                  <Link
                    target="_blank"
                    href="/auth/terms-of-service"
                    className="text-blue-600 hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    target="_blank"
                    href="/auth/privacy-policy"
                    className="text-blue-600 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>

            {/* <!-- Submit button --> */}
            <button
              type="submit"
              className={cn(
                "cursor-pointer w-full text-white font-medium py-3 rounded-md mt-6 focus:outline-none focus:ring-2",
                { "bg-red-500": isLoading },
                { "bg-blue-600": !isLoading }
              )}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Create Account"}
            </button>
          </form>

          {/* <!-- Sign in link --> */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-blue-600 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* <!-- Social signup options --> */}
          <div className="mt-8 hidden">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50"
              >
                <span className="sr-only">Sign up with Google</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.798-1.677-4.198-2.702-6.735-2.702-5.522 0-9.999 4.477-9.999 9.999s4.477 9.999 9.999 9.999c8.396 0 10.138-7.826 9.425-11.663h-9.425z"></path>
                </svg>
              </button>
              <button
                type="button"
                className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50"
              >
                <span className="sr-only">Sign up with Facebook</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={cn("bg-gray-100 font-sans", { hidden: !isRedirecting })}>
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

export default Signup;
