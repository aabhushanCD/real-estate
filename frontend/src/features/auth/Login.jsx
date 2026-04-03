import React, { useState } from "react";

import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router";
const Login = () => {
  const { login, errors } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login({ email, password });
    if (success) {
      navigate("/"); // ✅ actually navigates
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-10">
      {/* Header */}
      <h1 className="text-3xl font-bold text-slate-800 mb-2 text-center">
        Welcome Back
      </h1>
      <p className="text-gray-500 text-center mb-8">
        Login to your EstateHub account
      </p>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
        >
          Login
        </button>
      </form>
      {errors && <div className="text-red-500">{errors}</div>}
      {/* Footer Links */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
        <p className="mt-2">
          <a href="/forgot-password" className="text-blue-600 hover:underline">
            Forgot password?
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
