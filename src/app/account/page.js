'use client'

import { useState } from "react";
import { PencilIcon, EyeIcon } from "@heroicons/react/24/outline";

export default function Account() {
  const [selectedSection, setSelectedSection] = useState("Account Info");

  const menuOptions = [
    "Account Info",
    "Active Quotes",
    "Active Policies",
    "Password Change",
  ];

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center">
        <div className="w-[500px] bg-white border rounded-md shadow-sm mb-3">
          <h1 className="text-2xl font-bold text-gray-800 py-4 text-center">Account</h1>
        </div>

        {/* Customer Name Section */}
        <div className="w-[500px] bg-white border rounded-md shadow-sm text-center p-4">
          <h2 className="text-xl font-semibold text-gray-700">John Doe</h2>
        </div>

        {/* Flex container for sidebar menu and content display */}
        <div className="flex gap-10 w-full justify-center mt-10">
          {/* Sidebar menu */}
          <div className="w-[200px]  border-gray-300 pr-4">
            <ul className="space-y-4">
              {menuOptions.map((option) => (
                <li
                  key={option}
                  className={`p-3 cursor-pointer rounded-md text-center transition-colors duration-200 ${
                    selectedSection === option ? "bg-gray-300 font-bold text-gray-900" : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedSection(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>

          {/* Content Display */}
          <div className="w-[400px] p-6 bg-white border rounded-md shadow-sm">
          {selectedSection === "Account Info" && (
              <div className="space-y-2">
              <div>
                <label className="text-sm font-semibold block mb-1">ID:</label>
                <div className="border p-2 rounded-md">123456</div>
              </div>
              
              <div>
                <label className="text-sm font-semibold block mb-1">Primary Phone:</label>
                <div className="flex items-center gap-2">
                  <input className="flex-1 border p-2 rounded-md" value="(123) 456-7890" readOnly />
                  <PencilIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-semibold block mb-1">Email:</label>
                <div className="flex items-center gap-2">
                  <input className="flex-1 border p-2 rounded-md" value="user@example.com" readOnly />
                  <PencilIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-semibold block mb-1">Primary Address:</label>
                <div className="flex items-center gap-2">
                  <input className="flex-1 border p-2 rounded-md" value="123 Main St, City, State" readOnly />
                  <PencilIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
                </div>
              </div>
            </div>
            )}
            {selectedSection === "Active Quotes" && (
              <ul className="space-y-2">
                <li className="flex justify-between items-center border p-2 rounded-md">
                  <span>Quote #12345</span>
                  <a href="quote">
                    <EyeIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
                  </a>
                </li>
                <li className="flex justify-between items-center border p-2 rounded-md">
                  <span>Quote #67890</span>
                  <a href="quote">
                    <EyeIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
                  </a>
                </li>
              </ul>
            )}
            {selectedSection === "Active Policies" && (
              <ul className="space-y-2">
                <li className="flex justify-between items-center border p-2 rounded-md">
                  <span>Policy #54321</span>
                  <a href="policy">
                    <EyeIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
                  </a>
                </li>
                <li className="flex justify-between items-center border p-2 rounded-md">
                  <span>Policy #09876</span>
                  <a href="policy">
                    <EyeIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
                  </a>
                </li>
              </ul>
            )}
            {selectedSection === "Password Change" && (
              <form className="flex flex-col gap-4">
                <label className="text-sm font-semibold">Current Password:</label>
                <input
                  type="password"
                  className="border p-2 rounded-md"
                />
                <label className="text-sm font-semibold">New Password:</label>
                <input
                  type="password"
                  className="border p-2 rounded-md"
                />
                <label className="text-sm font-semibold">Confirm New Password:</label>
                <input
                  type="password"
                  className="border p-2 rounded-md"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                  Change Password
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
