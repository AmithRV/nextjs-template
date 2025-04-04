"use client";
import React from "react";
import { Input } from "@/components/ui/input";

function Login() {
  const handleLogin = () => {};
  return (
    <div className="bg-gray-100 font-sans">
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Log In</h1>
          </div>

          <form>
            <div className="mb-6">
              <label
                htmlFor="userId"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                UserId
              </label>

              <Input type="text" placeholder="userId" className="px-4 py-3" />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Password
              </label>

              <Input
                type="password"
                placeholder="password"
                className="px-4 py-3"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
              }}
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
