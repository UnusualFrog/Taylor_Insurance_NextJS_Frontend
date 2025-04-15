'use client'

export default function Contact() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-16 sm:px-12">
      <div className="w-full max-w-2xl bg-white bg-opacity-90 border rounded-xl shadow-md p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Contact Us</h1>
        <p className="text-gray-600 text-md">
          We’re here to help! Reach out to us by phone, email, or leave a message below.
        </p>
      </div>

      <div className="w-full max-w-2xl bg-white bg-opacity-90 border rounded-xl shadow-md p-8 mt-8 space-y-4">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-gray-700 w-24">📞 Phone:</span>
          <span className="text-gray-800 text-md">(709) 555-1234</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-semibold text-gray-700 w-24">📧 Email:</span>
          <span className="text-gray-800 text-md">josh@taylorinsurance.com</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-semibold text-gray-700 w-24">📍 Office:</span>
          <span className="text-gray-800 text-md">123 Main St, St. John's, NL</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-semibold text-gray-700 w-24">🕓 Hours:</span>
          <span className="text-gray-800 text-md">Mon–Fri: 9am – 5pm</span>
        </div>
      </div>

      <div className="w-full max-w-2xl bg-white bg-opacity-90 border rounded-xl shadow-md p-8 mt-8">
        <form className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Your Name</label>
            <input type="text" placeholder="John Doe" className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Email</label>
            <input type="email" placeholder="you@example.com" className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Message</label>
            <textarea placeholder="How can we help you?" rows={4} className="w-full border rounded px-3 py-2" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700">
            Send Message
          </button>
        </form>
      </div>

      <footer className="text-sm text-gray-100 mt-12">
        © {new Date().getFullYear()} Taylor Insurance. All rights reserved.
      </footer>
    </div>
  );
}
