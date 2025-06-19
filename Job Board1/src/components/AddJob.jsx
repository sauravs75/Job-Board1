import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddJob = () => {
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    experience: '',
    type: '',
    salary: '',
    description: '',
    logo: '',
  });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save job to localStorage
    const userJobs = JSON.parse(localStorage.getItem('userJobs') || '[]');
    const newJob = {
      ...form,
      id: Date.now(),
      posted: 'Just now',
    };
    userJobs.unshift(newJob);
    localStorage.setItem('userJobs', JSON.stringify(userJobs));
    setSuccess(true);
    setForm({
      title: '',
      company: '',
      location: '',
      experience: '',
      type: '',
      salary: '',
      description: '',
      logo: '',
    });
    // Optionally, redirect to jobs page after a short delay
    // setTimeout(() => navigate('/jobs'), 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Add a New Job</h2>
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">Job added successfully! (Demo only)</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Title</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Company</label>
            <input type="text" name="company" value={form.company} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input type="text" name="location" value={form.location} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Experience Level</label>
            <select name="experience" value={form.experience} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option value="">Select</option>
              <option value="Entry Level">Entry Level</option>
              <option value="Junior">Junior (1-3 years)</option>
              <option value="Mid Level">Mid Level (3-5 years)</option>
              <option value="Senior">Senior (5+ years)</option>
              <option value="Lead/Manager">Lead/Manager</option>
              <option value="Executive">Executive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Type</label>
            <select name="type" value={form.type} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option value="">Select</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Salary</label>
            <input type="text" name="salary" value={form.salary} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="e.g. ₹5,00,000 - ₹8,00,000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" rows={3} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Logo URL</label>
            <input type="text" name="logo" value={form.logo} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="https://..." />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors font-medium">Add Job</button>
        </form>
      </div>
    </div>
  );
};

export default AddJob; 