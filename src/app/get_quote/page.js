'use client'
import { useState } from "react";
import Image from "next/image";

export default function GetQuote() {
  const [insuranceType, setInsuranceType] = useState("home");
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Quote submitted successfully!");
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
          Request a Quote
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Choose your insurance type and fill out the form to receive your quote.
        </p>

        {/* Insurance Type Selector */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Select Insurance Type:</label>
          <select
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={insuranceType}
            onChange={(e) => setInsuranceType(e.target.value)}
          >
            <option value="home">Home Insurance</option>
            <option value="auto">Auto Insurance</option>
          </select>
        </div>

        {/* Dynamic Quote Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {insuranceType === "home" ? (
            <>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">Home Value</label>
                <input
                  type="number"
                  name="homeValue"
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">Dwelling Type</label>
                <input
                  type="text"
                  name="dwellingType"
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">Heating Type</label>
                <select
                  name="heatingType"
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                >
                  <option value="">Select Heating Type</option>
                  <option value="OIL">OIL</option>
                  <option value="ELECTRIC">ELECTRIC</option>
                  <option value="WOOD">WOOD</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">Make</label>
                <input
                  type="text"
                  name="make"
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">Model</label>
                <input
                  type="text"
                  name="model"
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">Year</label>
                <input
                  type="number"
                  name="year"
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          >
            Get Quote
          </button>
        </form>

        <p className="text-center text-gray-500 text-xs mt-6">
          ©2025 Taylor Insurance. All rights reserved.
        </p>
      </main>
    </div>
  );
}
