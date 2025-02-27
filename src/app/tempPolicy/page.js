'use client'

export default function tempPolicy() {
    const printPage = () => {
        window.print();
      };
    
      return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center">
        <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Example Policy</h1>
          <p><strong>Policy ID:</strong> P67890</p>
          <p><strong>Customer:</strong> John Doe</p>
          <p><strong>Start Date:</strong> 03/01/2025</p>
          <p><strong>End Date:</strong> 03/01/2028</p>
          <p><strong>Coverage:</strong> Full Coverage Plan</p>
    
          <div className="flex justify-between mt-6">
            <button 
              onClick={printPage} 
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Print Policy
            </button>
          </div>
        </div>
        </main>
        </div>
      );
    }
    