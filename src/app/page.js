

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center">
        <div className="w-[500px] bg-white border rounded-md shadow-sm mt-40">
          <h1 className="text-2xl font-bold text-gray-800 py-4 text-center">Home</h1>
        </div>

        <div className="p-4 flex flex-col items-center gap-2">
          <button className="w-[150px] h-[50px] text-lg font-medium text-gray-700 bg-white border rounded-md shadow-sm hover:bg-gray-50 focus:relative">
            <a href="get_quote">Get a Quote</a>
          </button>

          <div className="flex gap-2">
            <button className="w-[150px] h-[50px] text-lg font-medium text-gray-700 bg-white border rounded-md shadow-sm hover:bg-gray-50 focus:relative">
              <a href="contact">Contact</a>
            </button>

            <button className="w-[150px] h-[50px] text-lg font-medium text-gray-700 bg-white border rounded-md shadow-sm hover:bg-gray-50 focus:relative">
              <a href="account">Account</a>
            </button>
          </div>

          <div className="flex gap-2">
            <button className="w-[150px] h-[50px] text-lg font-medium text-gray-700 bg-white border rounded-md shadow-sm hover:bg-gray-50 focus:relative">
              <a href="login">Login</a>
            </button>

            <button className="w-[150px] h-[50px] text-lg font-medium text-gray-700 bg-white border rounded-md shadow-sm hover:bg-gray-50 focus:relative">
              <a href="register">Register</a>
            </button>
          </div>
        </div>


      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
