"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import toast, { Toaster } from "react-hot-toast";
import { userLogin } from "@/lib/api-collections/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { saveToLocalStorage } from "@/util/localstorageActions";

type Inputs = {
  email: string;
  password: string;
};

function Login() {
  const router = useRouter();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  const handleLogin = (userDetails: any) => {
    setIsLoading(true);
    userLogin(userDetails)
      .then((response) => {
        const data = response.data;

        saveToLocalStorage("userDetails", data);

        toast.success("Successfully logged in.");
        reset();
        setIsRedirecting(true);
        router.push("/");
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
      <div className={cn("bg-gray-100 font-sans", { hidden: isRedirecting })}>
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
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "invalid email format",
                    },
                  })}
                />

                {errors.email && (
                  <span className="form-error">{errors.email.message}</span>
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
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
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

            <p className="text-gray-600 mb-2">redirecting.</p>
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

export default Login;
