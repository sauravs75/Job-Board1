import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroS = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to jobs page with search parameters
    const searchParams = new URLSearchParams();
    if (searchQuery) searchParams.set('search', searchQuery);
    if (location) searchParams.set('location', location);
    if (experience) searchParams.set('experience', experience);
    
    navigate(`/jobs?${searchParams.toString()}`);
  };

  const experienceLevels = [
    { value: '', label: 'All Experience' },
    { value: 'entry', label: 'Entry Level' },
    { value: 'junior', label: 'Junior (1-3 years)' },
    { value: 'mid', label: 'Mid Level (3-5 years)' },
    { value: 'senior', label: 'Senior (5+ years)' },
    { value: 'lead', label: 'Lead/Manager' },
    { value: 'executive', label: 'Executive' }
  ];

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

        {/* Single Search Section */}
        <div className="mt-12 max-w-4xl mx-auto">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 bg-white rounded-lg shadow-lg p-2">
            {/* Job Title/Keywords */}
            <div className="flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Job title, keywords, or company"
                className="w-full px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Location */}
            <div className="flex-1">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="w-full px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Experience Level */}
            <div className="flex-1">
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              >
                {experienceLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors whitespace-nowrap"
            >
              Search Jobs
            </button>
          </form>

          {/* Quick Filters */}
          <div className="mt-8">
            <p className="text-sm text-gray-600 text-center mb-4">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Software Engineer', 'Data Scientist', 'Product Manager', 'UX Designer', 'Remote', 'Full-time'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSearchQuery(tag);
                    // Auto-search when clicking popular tags
                    const searchParams = new URLSearchParams();
                    searchParams.set('search', tag);
                    navigate(`/jobs?${searchParams.toString()}`);
                  }}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
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