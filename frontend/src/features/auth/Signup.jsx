import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router";
const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup(form);
    if (res) {
      navigate("/login");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-10">
      {/* Header */}
      <h1 className="text-3xl font-bold text-slate-800 text-center mb-2">
        Create Account
      </h1>

      <p className="text-gray-500 text-center mb-8">
        Join and find your perfect property
      </p>

      {/* Form */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="John Doe"
            value={form.fullName}
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            placeholder="john@email.com"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Phone (optional)
          </label>
          <input
            type="text"
            name="phone"
            placeholder="+977 98XXXXXXXX"
            value={form.phone}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            placeholder="********"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
        >
          Create Account
        </button>
      </form>

      {/* Footer */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
