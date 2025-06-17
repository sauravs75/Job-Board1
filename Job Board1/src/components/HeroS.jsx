import { useState } from 'react';

const HeroS = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality here
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="relative bg-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGMwIDIuMjA5LTEuNzkxIDQtNCA0cy00LTEuNzkxLTQtNCAxLjc5MS00IDQtNCA0IDEuNzkxIDQgNHoiIGZpbGw9IiMwMDAiLz48L2c+PC9zdmc+')]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Find Your Dream Job
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Discover thousands of job opportunities with all the information you need. Your future career starts here.
          </p>
        </div>

        {/* Search Section */}
        <div className="mt-12 max-w-xl mx-auto">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Job title, keywords, or company"
                className="w-full px-4 py-3 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Search Jobs
            </button>
          </form>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="bg-gray-50 rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-gray-900">10K+</div>
            <div className="mt-2 text-gray-600">Active Jobs</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-gray-900">5K+</div>
            <div className="mt-2 text-gray-600">Companies</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-gray-900">50K+</div>
            <div className="mt-2 text-gray-600">Job Seekers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroS; 