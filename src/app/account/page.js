'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Account() {
  const [selectedSection, setSelectedSection] = useState("Account Info");
  const [dataType, setDataType] = useState("auto");
  const [viewMode, setViewMode] = useState("policies");
  const [policies, setPolicies] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const router = useRouter();

  const menuOptions = [
    { label: "Account Info", key: "Account Info" },
    { label: "Auto", key: "Auto" },
    { label: "Home", key: "Home" },
    { label: "Password Change", key: "Password Change" },
  ];
  

  const handleFetch = async () => {
    const dummyPolicies = [
      { id: 1, type: dataType, expiry: "2025-06-10" }
    ];
    const dummyQuotes = [
      { id: 1, type: dataType, expiresAt: new Date(Date.now() + 86400000).toISOString() }
    ];
    setPolicies(dummyPolicies);
    setQuotes(dummyQuotes);
  };

  const renderTimer = (expiresAt) => {
    const diff = new Date(expiresAt) - new Date();
    const seconds = Math.floor(diff / 1000);
    if (seconds <= 0) return "Expired";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hrs}h ${mins}m`;
  };

  const within2Months = (expiry) => {
    const expiryDate = new Date(expiry);
    const twoMonthsFromNow = new Date();
    twoMonthsFromNow.setMonth(twoMonthsFromNow.getMonth() + 2);
    return expiryDate <= twoMonthsFromNow;
  };

  useEffect(() => {
    if (selectedSection === "Auto" || selectedSection === "Home") {
      setDataType(selectedSection.toLowerCase());
      setViewMode("policies");
      handleFetch();
    }
  }, [selectedSection]);

  return (
    <div className="flex justify-center items-start min-h-screen p-6">
      <div className="w-[900px] bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Account</h1>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-[200px] pr-4 border-r border-gray-300">
            <ul className="space-y-4">
              {menuOptions.map((option) => (
                <li
                  key={option.key}
                  className={`p-3 cursor-pointer rounded-md text-center transition-colors duration-200 ${
                    selectedSection === option.key
                      ? "bg-gray-300 font-bold text-gray-900"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedSection(option.key)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Main Panel */}
          <div className="w-full pl-6">
            {selectedSection === "Account Info" && (
              <form className="space-y-4">
                <div>
                  <label className="block font-semibold text-sm">Full Name:</label>
                  <input type="text" className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block font-semibold text-sm">Username:</label>
                  <input type="text" className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block font-semibold text-sm">Birthday:</label>
                  <input type="date" className="w-full border rounded px-3 py-2" />
                </div>
                <fieldset className="border rounded p-4">
                  <legend className="text-sm font-semibold">Address</legend>
                  <div className="space-y-2">
                    <input type="text" placeholder="Street" className="w-full border rounded px-3 py-2" />
                    <input type="text" placeholder="City" className="w-full border rounded px-3 py-2" />
                    <input type="text" placeholder="Province" className="w-full border rounded px-3 py-2" />
                    <input type="text" placeholder="Postal Code" className="w-full border rounded px-3 py-2" />
                  </div>
                </fieldset>
              </form>
            )}

            {selectedSection === "Password Change" && (
              <form className="space-y-4">
                <div>
                  <label className="block font-semibold text-sm">Current Password:</label>
                  <input type="password" className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block font-semibold text-sm">New Password:</label>
                  <input type="password" className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block font-semibold text-sm">Confirm New Password:</label>
                  <input type="password" className="w-full border rounded px-3 py-2" />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Update Password</button>
              </form>
            )}

            {(selectedSection === "Auto" || selectedSection === "Home") && (
              <>
                <div className="flex space-x-4 mb-4">
                  <button onClick={() => setViewMode("policies")} className={`px-4 py-2 rounded ${viewMode === "policies" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>Policies</button>
                  <button onClick={() => setViewMode("quotes")} className={`px-4 py-2 rounded ${viewMode === "quotes" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>Quotes</button>
                </div>

                {viewMode === "policies" ? (
                  <>
                    <h2 className="font-bold text-lg mb-2">Policies</h2>
                    {policies.length === 0 ? (
                      <button onClick={() => router.push('/policy')} className="text-blue-600 underline">Create Policy</button>
                    ) : (
                      <table className="w-full border mb-6">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border px-4 py-2">ID</th>
                            <th className="border px-4 py-2">Type</th>
                            <th className="border px-4 py-2">Expiry</th>
                            <th className="border px-4 py-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {policies.map((p) => (
                            <tr key={p.id}>
                              <td className="border px-4 py-2">{p.id}</td>
                              <td className="border px-4 py-2">{p.type}</td>
                              <td className="border px-4 py-2">{p.expiry}</td>
                              <td className="border px-4 py-2">
                                {within2Months(p.expiry) && (
                                  <button className="text-green-600 underline">Renew</button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </>
                ) : (
                  <>
                    <h2 className="font-bold text-lg mb-2">Quotes</h2>
                    <table className="w-full border">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border px-4 py-2">ID</th>
                          <th className="border px-4 py-2">Type</th>
                          <th className="border px-4 py-2">Expires In</th>
                        </tr>
                      </thead>
                      <tbody>
                        {quotes.map((q) => (
                          <tr key={q.id}>
                            <td className="border px-4 py-2">{q.id}</td>
                            <td className="border px-4 py-2">{q.type}</td>
                            <td className="border px-4 py-2">{renderTimer(q.expiresAt)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
