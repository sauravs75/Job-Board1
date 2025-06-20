import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Jobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [jobType, setJobType] = useState('');
  const [salary, setSalary] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);

  // Read search parameters from URL on component mount
  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    const urlLocation = searchParams.get('location') || '';
    const urlExperience = searchParams.get('experience') || '';
    
    setSearchQuery(urlSearch);
    setLocation(urlLocation);
    setExperience(urlExperience);
  }, [searchParams]);

  // Mock job data with Indian locations
  const mockJobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'TechCorp India',
      location: 'Bangalore, Karnataka',
      type: 'Full-time',
      experience: 'Senior',
      salary: '₹15,00,000 - ₹25,00,000',
      description: 'We are looking for a Senior Software Engineer to join our team...',
      posted: '2 days ago',
      logo: '/src/images/it-manager.png'
    },
    {
      id: 2,
      title: 'Frontend Developer',
      company: 'StartupXYZ',
      location: 'Remote',
      type: 'Full-time',
      experience: 'Mid Level',
      salary: '₹8,00,000 - ₹12,00,000',
      description: 'Join our growing team as a Frontend Developer...',
      posted: '1 day ago',
      logo: '/src/images/XYZ.jpg'
    },
    {
      id: 3,
      title: 'Data Scientist',
      company: 'BigData Corp',
      location: 'Mumbai, Maharashtra',
      type: 'Full-time',
      experience: 'Senior',
      salary: '₹18,00,000 - ₹30,00,000',
      description: 'We are seeking a talented Data Scientist...',
      posted: '3 days ago',
      logo: '/src/images/BigData.jpg'
    },
    {
      id: 4,
      title: 'UX Designer',
      company: 'Design Studio',
      location: 'Delhi, NCR',
      type: 'Contract',
      experience: 'Mid Level',
      salary: '₹6,00,000 - ₹10,00,000',
      description: 'Create amazing user experiences...',
      posted: '5 days ago',
      logo: '/src/images/Dis.jpg' 
    },
    {
      id: 5,
      title: 'Product Manager',
      company: 'Innovation Labs',
      location: 'Hyderabad, Telangana',
      type: 'Full-time',
      experience: 'Senior',
      salary: '₹20,00,000 - ₹35,00,000',
      description: 'Lead product strategy and development...',
      posted: '1 week ago',
      logo: '/src/images/innovation.jpg'
    },
    {
      id: 6,
      title: 'DevOps Engineer',
      company: 'CloudTech',
      location: 'Pune, Maharashtra',
      type: 'Full-time',
      experience: 'Mid Level',
      salary: '₹12,00,000 - ₹18,00,000',
      description: 'Build and maintain our cloud infrastructure...',
      posted: '4 days ago',
      logo: '/src/images/DevOps.png'  
    },
    {
      id: 7,
      title: 'React Developer',
      company: 'WebSolutions',
      location: 'Chennai, Tamil Nadu',
      type: 'Full-time',
      experience: 'Junior',
      salary: '₹5,00,000 - ₹8,00,000',
      description: 'Join our React development team...',
      posted: '2 days ago',
      logo: '/src/images/reactdev.jpg'
    },
    {
      id: 8,
      title: 'Python Developer',
      company: 'AI Innovations',
      location: 'Noida, Uttar Pradesh',
      type: 'Full-time',
      experience: 'Mid Level',
      salary: '₹10,00,000 - ₹16,00,000',
      description: 'Work on cutting-edge AI projects...',
      posted: '6 days ago',
      logo: '/src/images/pythonD.jpg'
    }
  ];

  // Load user jobs from localStorage and merge with mock jobs
  useEffect(() => {
    const userJobs = JSON.parse(localStorage.getItem('userJobs') || '[]');
    setAllJobs([...userJobs, ...mockJobs]);
  }, []);

  // Filter jobs based on search criteria
  useEffect(() => {
    let filtered = allJobs;

    // Filter by search query (job title, company, description)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.experience.toLowerCase().includes(query) ||
        job.type.toLowerCase().includes(query)
      );
    }

    // Filter by location
    if (location) {
      const locationQuery = location.toLowerCase();
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(locationQuery) ||
        job.location.toLowerCase().includes(locationQuery.replace(',', '')) ||
        job.location.toLowerCase().includes(locationQuery.split(',')[0]) // Match city name
      );
    }

    // Filter by experience
    if (experience) {
      const expQuery = experience.toLowerCase();
      filtered = filtered.filter(job => {
        const jobExp = job.experience.toLowerCase();
        // Handle different experience level formats
        if (expQuery === 'entry' || expQuery === 'entry-level') {
          return jobExp.includes('entry') || jobExp.includes('junior') || jobExp.includes('1-3');
        }
        if (expQuery === 'junior') {
          return jobExp.includes('junior') || jobExp.includes('1-3') || jobExp.includes('entry');
        }
        if (expQuery === 'mid' || expQuery === 'mid-level') {
          return jobExp.includes('mid') || jobExp.includes('3-5') || jobExp.includes('intermediate');
        }
        if (expQuery === 'senior') {
          return jobExp.includes('senior') || jobExp.includes('5+') || jobExp.includes('lead');
        }
        if (expQuery === 'lead' || expQuery === 'lead/manager') {
          return jobExp.includes('lead') || jobExp.includes('manager') || jobExp.includes('senior');
        }
        return jobExp.includes(expQuery);
      });
    }

    // Filter by job type
    if (jobType) {
      filtered = filtered.filter(job => 
        job.type.toLowerCase() === jobType.toLowerCase()
      );
    }

    // Filter by salary range
    if (salary) {
      // This is a simplified salary filter - you can make it more sophisticated
      filtered = filtered.filter(job => {
        const jobSalary = job.salary.toLowerCase();
        if (salary === '0-3lakh') return jobSalary.includes('3') || jobSalary.includes('5');
        if (salary === '3-5lakh') return jobSalary.includes('5') || jobSalary.includes('8');
        if (salary === '5-8lakh') return jobSalary.includes('8') || jobSalary.includes('12');
        if (salary === '8-12lakh') return jobSalary.includes('12') || jobSalary.includes('18');
        if (salary === '12-18lakh') return jobSalary.includes('18') || jobSalary.includes('25');
        if (salary === '18-25lakh') return jobSalary.includes('25') || jobSalary.includes('30');
        if (salary === '25lakh+') return jobSalary.includes('25') || jobSalary.includes('30') || jobSalary.includes('35');
        return true;
      });
    }

    setFilteredJobs(filtered);
  }, [searchQuery, location, experience, jobType, salary, allJobs]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Update URL with current search parameters
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (location) params.set('location', location);
    if (experience) params.set('experience', experience);
    if (jobType) params.set('jobType', jobType);
    if (salary) params.set('salary', salary);
    
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setLocation('');
    setExperience('');
    setJobType('');
    setSalary('');
    setSearchParams({});
  };

  // Indian states and major cities
  const indianLocations = [
    { value: '', label: 'All Locations' },
    { value: 'remote', label: 'Remote' },
    { value: 'mumbai', label: 'Mumbai, Maharashtra' },
    { value: 'delhi', label: 'Delhi, NCR' },
    { value: 'bangalore', label: 'Bangalore, Karnataka' },
    { value: 'hyderabad', label: 'Hyderabad, Telangana' },
    { value: 'chennai', label: 'Chennai, Tamil Nadu' },
    { value: 'pune', label: 'Pune, Maharashtra' },
    { value: 'kolkata', label: 'Kolkata, West Bengal' },
    { value: 'ahmedabad', label: 'Ahmedabad, Gujarat' },
    { value: 'noida', label: 'Noida, Uttar Pradesh' },
    { value: 'gurgaon', label: 'Gurgaon, Haryana' },
    { value: 'indore', label: 'Indore, Madhya Pradesh' },
    { value: 'bhopal', label: 'Bhopal, Madhya Pradesh' },
    { value: 'lucknow', label: 'Lucknow, Uttar Pradesh' },
    { value: 'kanpur', label: 'Kanpur, Uttar Pradesh' },
    { value: 'nagpur', label: 'Nagpur, Maharashtra' },
    { value: 'patna', label: 'Patna, Bihar' },
    { value: 'chandigarh', label: 'Chandigarh' },
    { value: 'jaipur', label: 'Jaipur, Rajasthan' },
    { value: 'coimbatore', label: 'Coimbatore, Tamil Nadu' },
    { value: 'vadodara', label: 'Vadodara, Gujarat' },
    { value: 'visakhapatnam', label: 'Visakhapatnam, Andhra Pradesh' },
    { value: 'thane', label: 'Thane, Maharashtra' },
    { value: 'bhubaneswar', label: 'Bhubaneswar, Odisha' },
    { value: 'mysore', label: 'Mysore, Karnataka' },
    { value: 'guwahati', label: 'Guwahati, Assam' },
    { value: 'dehradun', label: 'Dehradun, Uttarakhand' },
    { value: 'ranchi', label: 'Ranchi, Jharkhand' },
    { value: 'jabalpur', label: 'Jabalpur, Madhya Pradesh' },
    { value: 'agra', label: 'Agra, Uttar Pradesh' },
    { value: 'varanasi', label: 'Varanasi, Uttar Pradesh' },
    { value: 'srinagar', label: 'Srinagar, Jammu & Kashmir' },
    { value: 'amritsar', label: 'Amritsar, Punjab' },
    { value: 'ludhiana', label: 'Ludhiana, Punjab' },
    { value: 'kochi', label: 'Kochi, Kerala' },
    { value: 'thiruvananthapuram', label: 'Thiruvananthapuram, Kerala' },
    { value: 'bhubaneswar', label: 'Bhubaneswar, Odisha' },
    { value: 'imphal', label: 'Imphal, Manipur' },
    { value: 'shillong', label: 'Shillong, Meghalaya' },
    { value: 'aizawl', label: 'Aizawl, Mizoram' },
    { value: 'kohima', label: 'Kohima, Nagaland' },
    { value: 'itanagar', label: 'Itanagar, Arunachal Pradesh' },
    { value: 'gangtok', label: 'Gangtok, Sikkim' },
    { value: 'panaji', label: 'Panaji, Goa' },
    { value: 'port-blair', label: 'Port Blair, Andaman & Nicobar' },
    { value: 'kavaratti', label: 'Kavaratti, Lakshadweep' }
  ];

  const experienceLevels = [
    { value: '', label: 'All Experience' },
    { value: 'entry', label: 'Entry Level' },
    { value: 'junior', label: 'Junior (1-3 years)' },
    { value: 'mid', label: 'Mid Level (3-5 years)' },
    { value: 'senior', label: 'Senior (5+ years)' },
    { value: 'lead', label: 'Lead/Manager' },
    { value: 'executive', label: 'Executive' }
  ];

  const jobTypes = [
    { value: '', label: 'All Types' },
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' },
    { value: 'remote', label: 'Remote' }
  ];

  const salaryRanges = [
    { value: '', label: 'All Salaries' },
    { value: '0-3lakh', label: 'Under ₹3 LPA' },
    { value: '3-5lakh', label: '₹3 - ₹5 LPA' },
    { value: '5-8lakh', label: '₹5 - ₹8 LPA' },
    { value: '8-12lakh', label: '₹8 - ₹12 LPA' },
    { value: '12-18lakh', label: '₹12 - ₹18 LPA' },
    { value: '18-25lakh', label: '₹18 - ₹25 LPA' },
    { value: '25lakh+', label: '₹25+ LPA' }
  ];

  const handleJobClick = (jobId) => {
    console.log('Job clicked:', jobId);
    // Navigate to job details page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Your Next Job</h1>
          <p className="mt-2 text-gray-600">Discover thousands of job opportunities across India</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear All
                </button>
              </div>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Job title, keywords..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Location */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {indianLocations.map((loc) => (
                    <option key={loc.value} value={loc.value}>
                      {loc.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Experience Level */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {experienceLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Job Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {jobTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Salary Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                <select
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {salaryRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Apply Filters Button */}
              <button
                onClick={handleSearch}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {filteredJobs.length} Jobs Found
                  </h2>
                  <p className="text-gray-600">
                    {searchQuery || location || experience || jobType || salary 
                      ? `Showing filtered results` 
                      : 'Showing all available positions across India'
                    }
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
                    <option>Most Recent</option>
                    <option>Salary: High to Low</option>
                    <option>Salary: Low to High</option>
                    <option>Experience Level</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => handleJobClick(job.id)}
                    className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={job.logo}
                        alt={`${job.company} logo`}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                              {job.title}
                            </h3>
                            <p className="text-gray-600">{job.company}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">{job.posted}</p>
                          </div>
                        </div>
                        
                        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            {job.location}
                          </span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"/>
                            </svg>
                            {job.type}
                          </span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                            </svg>
                            {job.salary}
                          </span>
                        </div>
                        
                        <p className="mt-3 text-gray-700 line-clamp-2">
                          {job.description}
                        </p>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex space-x-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {job.experience}
                            </span>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              {job.type}
                            </span>
                          </div>
                          <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No jobs found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search criteria or filters.
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={clearFilters}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Clear all filters
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredJobs.length > 0 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md">1</button>
                  <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">2</button>
                  <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">3</button>
                  <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs; 