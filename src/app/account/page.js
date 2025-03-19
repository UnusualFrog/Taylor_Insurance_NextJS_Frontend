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
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="w-[700px] bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Account</h1>
        
        {/* Flex container for sidebar menu and content display */}
        <div className="flex">
          {/* Sidebar menu */}
          <div className="w-[200px] pr-4 border-r border-gray-300">
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
          <div className="w-[400px] pl-6">
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
              </div>
            )}
            {selectedSection === "Active Quotes" && (
              <ul className="space-y-2">
                <li className="flex justify-between items-center border p-2 rounded-md">
                  <span>Quote #12345</span>
                  <a href="tempQuote">
                    <EyeIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
                  </a>
                </li>
              </ul>
            )}
            {selectedSection === "Active Policies" && (
              <ul className="space-y-2">
              <li className="flex justify-between items-center border p-2 rounded-md">
                <span>Policy #6789</span>
                <a href="tempPolicy">
                  <EyeIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
                </a>
              </li>
            </ul>
            )}
            {selectedSection === "Password Change" && (
              <form className="flex flex-col gap-4">
                <label className="text-sm font-semibold">Current Password:</label>
                <input type="password" className="border p-2 rounded-md" />
                <label className="text-sm font-semibold">New Password:</label>
                <input type="password" className="border p-2 rounded-md" />
                <button type="submit" className="bg-gray-900 text-white p-2 rounded-md">Change Password</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
