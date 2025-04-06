"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import toast, { Toaster } from "react-hot-toast";
import { userLogin } from "@/lib/api-collections/auth";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

function Login() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = (userDetails: any) => {
    setIsLoading(true);
    userLogin(userDetails)
      .then(() => {
        toast.success("Successfully logged in.");
        reset();
      })
      .catch((error) => {
        const msg = error.response.data.error;

        if (msg) {
          toast.error(msg);
        } else {
          toast.error("Something went wrong");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const userDetails = { email: data?.email, password: data?.password };

    handleLogin(userDetails);
  };

  return (
    <>
      <div className="bg-gray-100 font-sans">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Log In</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-gray-600 mb-2"
                >
                  Email
                </label>

                <Input
                  type="text"
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

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-bold text-gray-600 mb-2"
                >
                  Password
                </label>

                <Input
                  type="password"
                  placeholder="password"
                  className={cn("px-4 py-3", {
                    "input-error": errors.password,
                  })}
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="form-error">password required</span>
                )}
              </div>

              <div className="flex justify-end mb-6">
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className={cn(
                  "cursor-pointer w-full text-white font-medium py-3 rounded-md focus:outline-none focus:ring-2",
                  { "bg-red-500": isLoading },
                  { "bg-blue-600": !isLoading }
                )}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Log In"}
              </button>

              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  Don&rsquo;t have an account?{" "}
                  <Link
                    href="/auth/signup"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default Login;
