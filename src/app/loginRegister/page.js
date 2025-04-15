'use client'

import { useState } from "react";
import Image from "next/image";

export default function LoginRegister() {
  const [formType, setFormType] = useState("login");
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (formType === "register") {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      if (users.find(user => user.email === formData.email)) {
        alert("User already exists!");
        return;
      }

      users.push({ email: formData.email, password: formData.password });
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify({ email: formData.email }));
      window.location.href = "/account";

    } else if (formType === "login") {
      const found = users.find(user =>
        user.email === formData.email && user.password === formData.password
      );

      if (!found) {
        alert("Invalid login.");
        setFormData({ email: '', password: '', confirmPassword: '' });
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(found));
      window.location.href = "/account";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4">
      <main className="w-full max-w-md bg-white/90 shadow-xl rounded-2xl p-8">
        <Image
          src="/TInsurance-landing-logo.png"
          alt="Taylor Insurance Logo"
          width={100}
          height={100}
          className="mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome!
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Login or Register an account below
        </p>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Login/Register:
          </label>
          <select
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formType}
            onChange={(e) => setFormType(e.target.value)}
          >
            <option value="login">Login</option>
            <option value="register">Register</option>
          </select>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="***********"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          {formType === "register" && (
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="***********"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full h-[50px] text-lg font-medium text-white bg-gray-900 rounded-md shadow-lg hover:bg-gray-700 transition"
          >
            {formType === "login" ? "Sign In" : "Register"}
          </button>

          {formType === "login" && (
            <p className="text-sm text-gray-600 text-center">
              Forgot your password?{" "}
              <a href="/contact" className="text-blue-500 underline">Contact support</a>
            </p>
          )}
        </form>

        <p className="text-center text-gray-500 text-xs mt-8">
          &copy;2025 Taylor Insurance. All rights reserved.
        </p>
      </main>
    </div>
  );
}
