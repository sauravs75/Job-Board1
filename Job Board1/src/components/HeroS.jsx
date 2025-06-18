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
    
    // If search query is provided, use it as the main search term
    if (searchQuery) {
      searchParams.set('search', searchQuery);
    }
    
    // Add location and experience as separate filters
    if (location) {
      searchParams.set('location', location);
    }
    
    if (experience) {
      searchParams.set('experience', experience);
    }
    
    navigate(`/jobs?${searchParams.toString()}`);
  };

  const handleCompanySearch = (companyName) => {
    const searchParams = new URLSearchParams();
    searchParams.set('search', companyName);
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

  const topCompanies = [
    {
      name: 'TechCorp India',
      logo: 'https://via.placeholder.com/60x60/3B82F6/FFFFFF?text=TC',
      jobs: '150+',
      location: 'Bangalore, Mumbai'
    },
    {
      name: 'StartupXYZ',
      logo: 'https://via.placeholder.com/60x60/10B981/FFFFFF?text=SX',
      jobs: '80+',
      location: 'Remote, Delhi'
    },
    {
      name: 'BigData Corp',
      logo: 'https://via.placeholder.com/60x60/8B5CF6/FFFFFF?text=BD',
      jobs: '120+',
      location: 'Mumbai, Hyderabad'
    },
    {
      name: 'Design Studio',
      logo: 'https://via.placeholder.com/60x60/F59E0B/FFFFFF?text=DS',
      jobs: '60+',
      location: 'Delhi, Bangalore'
    },
    {
      name: 'Innovation Labs',
      logo: 'https://via.placeholder.com/60x60/EF4444/FFFFFF?text=IL',
      jobs: '200+',
      location: 'Pune, Chennai'
    },
    {
      name: 'CloudTech',
      logo: 'https://via.placeholder.com/60x60/06B6D4/FFFFFF?text=CT',
      jobs: '90+',
      location: 'Noida, Gurgaon'
    }
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
            {/* Job Title/Keywords/Company */}
            <div className="flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Job title, company, or keywords"
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
        </div>

        {/* Top Companies Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Top Companies Hiring</h2>
            <p className="mt-2 text-gray-600">Explore opportunities at leading companies across India</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {topCompanies.map((company, index) => (
              <div
                key={index}
                onClick={() => handleCompanySearch(company.name)}
                className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer border border-gray-200 group"
              >
                <div className="text-center">
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="w-12 h-12 mx-auto mb-3 rounded-lg"
                  />
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {company.name}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">{company.jobs} jobs</p>
                  <p className="text-xs text-gray-500 mt-1">{company.location}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/jobs')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              View All Companies
              <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
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