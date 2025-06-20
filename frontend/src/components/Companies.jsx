import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Copy of mock jobs from Jobs.jsx
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
    logo: '/public/it-manager.png'
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
    logo: '/public/XYZ.jpg'
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
    logo: '/public/BigData.jpg'
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
    logo: '/public/Dis.jpg'
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
    logo: '/public/innovation.jpg'
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
    logo: '/public/DevOps.png'
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
    logo: '/public/DevOps.png'
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
    logo: '/public/DevOps.png'
  }
];

function extractCompaniesFromJobs(jobs) {
  const companyMap = {};
  jobs.forEach(job => {
    if (!companyMap[job.company]) {
      companyMap[job.company] = {
        id: 'job-' + job.company,
        name: job.company,
        logo: job.logo || '',
        location: job.location || '',
        description: '',
      };
    }
  });
  return Object.values(companyMap);
}

const Companies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // User-added companies
    const userCompanies = JSON.parse(localStorage.getItem('userCompanies') || '[]');
    // All jobs (mock + user)
    const userJobs = JSON.parse(localStorage.getItem('userJobs') || '[]');
    const allJobs = [...userJobs, ...mockJobs];
    // Extract companies from jobs
    const jobCompanies = extractCompaniesFromJobs(allJobs);
    // Merge userCompanies and jobCompanies (avoid duplicates by name)
    const merged = [...userCompanies];
    jobCompanies.forEach(jobCo => {
      if (!merged.some(c => c.name === jobCo.name)) {
        merged.push(jobCo);
      }
    });
    setCompanies(merged);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Companies</h1>
          <Link to="/add-company" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium">Add Company</Link>
        </div>
        {companies.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <h3 className="mt-2 text-sm font-medium text-gray-900">No companies found</h3>
            <p className="mt-1 text-sm text-gray-500">Be the first to add a company!</p>
            <Link to="/add-company" className="inline-flex items-center mt-4 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">Add Company</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {companies.map((company) => (
              <div key={company.id} className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center border border-gray-200">
                <img src={company.logo} alt={company.name + ' logo'} className="w-16 h-16 rounded-lg mb-3 object-cover" />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{company.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{company.location}</p>
                <p className="text-xs text-gray-500 text-center">{company.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Companies; 