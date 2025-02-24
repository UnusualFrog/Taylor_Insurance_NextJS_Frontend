export default function Contact() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center">
        <div className="w-[500px] bg-white border rounded-md shadow-sm p-4">
          <h1 className="text-2xl font-bold text-gray-800 py-4 text-center">Contact</h1>
          <p className="text-gray-700 text-lg font-medium py-1">Phone: XXX-XXX-XXXX</p>
          <p className="text-gray-700 text-lg font-medium py-1">Email: josh@taylorinsurance.com</p>
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
