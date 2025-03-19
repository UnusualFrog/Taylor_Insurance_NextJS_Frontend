export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      {/* Centered Container */}
      <div className="flex items-center w-full max-w-6xl px-8 gap-8">

        {/* Logo Section */}
        <div className="flex-shrink-0 w-full sm:w-1/3 flex justify-center">
          <img 
            src="/TInsurance-landing-logo.png" 
            alt="Company Logo" 
            className="w-full max-w-[500px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[800px] h-auto"
          />
        </div>

        {/* Navigation Section */}
        <div className="flex flex-col justify-center items-center space-y-6 w-full sm:w-2/3">
          <div className="text-center text-black text-2xl font-semibold">
            <p>Taylor-Made Protection for You.</p>
            <p>Get A Quote or Login Below to Get Started</p>
          </div>

          <div className="flex items-center justify-center gap-3 w-full">
            <a href="get_quote" className="w-[200px] h-[50px] text-lg font-medium text-white bg-gray-900 rounded-md shadow-lg flex items-center justify-center hover:bg-gray-700 transition">
              Get a Quote
            </a>
            <a href="loginRegister" className="w-[200px] h-[50px] text-lg font-medium text-white bg-gray-900 rounded-md shadow-lg flex items-center justify-center hover:bg-gray-700 transition">
              Login / Register
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
