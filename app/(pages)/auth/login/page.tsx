"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { cn } from "@/lib/utils";

type Inputs = {
  password: string;
  userId: string;
};

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="bg-gray-100 font-sans">
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Log In</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label
                htmlFor="userId"
                className="block text-sm font-bold text-gray-600 mb-2"
              >
                UserId
              </label>

              <Input
                type="text"
                placeholder="userId"
                className={cn("px-4 py-3", {
                  "input-error": errors.userId,
                })}
                {...register("userId", { required: true })}
              />

              {errors.userId && (
                <span className="form-error">userId required</span>
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

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 cursor-pointer"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
