import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCompany = () => {
  const [form, setForm] = useState({
    name: '',
    logo: '',
    location: '',
    description: '',
  });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userCompanies = JSON.parse(localStorage.getItem('userCompanies') || '[]');
    const newCompany = {
      ...form,
      id: Date.now(),
    };
    userCompanies.unshift(newCompany);
    localStorage.setItem('userCompanies', JSON.stringify(userCompanies));
    setSuccess(true);
    setForm({ name: '', logo: '', location: '', description: '' });
    setTimeout(() => navigate('/companies'), 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Add a New Company</h2>
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">Company added successfully!</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Company Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Logo URL</label>
            <input type="text" name="logo" value={form.logo} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="https://..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input type="text" name="location" value={form.location} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" rows={3} />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors font-medium">Add Company</button>
        </form>
      </div>
    </div>
  );
};

export default AddCompany; 