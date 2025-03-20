'use client'
import { useState } from "react";

export default function Login() {
  const [formType, setFormType] = useState("login");  // This will toggle between login and register
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
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="flex justify-center items-start pt-16 sm:pt-20 p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center w-[400px]">
        <div className="w-full bg-white shadow-md rounded-md p-6">
          {/* Select Box for toggling between Login and Register */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Login or Register an Account Below:</label>
            <select
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formType}
              onChange={(e) => setFormType(e.target.value)}
            >
              <option value="login">Login</option>
              <option value="register">Register</option>
            </select>
          </div>

          {/* Form content */}
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                placeholder="******************"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {formType === "register" && (
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="******************"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <p className="text-red-500 text-xs italic">Please confirm your password.</p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-[200px] h-[50px] text-lg font-medium text-white bg-gray-900 rounded-md shadow-lg flex items-center justify-center hover:bg-gray-700 transition"
              >
                {formType === "login" ? "Sign In" : "Register"}
              </button>
            </div>
          </form>

          <p className="text-center text-gray-800 text-xs">
            &copy;2025 Your Company. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
}
