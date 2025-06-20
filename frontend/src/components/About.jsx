import { useState, useEffect } from 'react';

const About = () => {
  const [form, setForm] = useState({ name: '', email: '', feedback: '' });
  const [feedbackList, setFeedbackList] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('userFeedback') || '[]');
    setFeedbackList(stored);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFeedback = { ...form, date: new Date().toLocaleString() };
    const updated = [newFeedback, ...feedbackList];
    localStorage.setItem('userFeedback', JSON.stringify(updated));
    setFeedbackList(updated);
    setForm({ name: '', email: '', feedback: '' });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">About & Feedback</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">We value your feedback!</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Your Feedback</label>
              <textarea name="feedback" value={form.feedback} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" rows={3} />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors font-medium">Submit</button>
          </form>
          {success && <div className="mt-4 p-3 bg-green-100 text-green-700 rounded">Thank you for your feedback!</div>}
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">User Comments & Feedback</h2>
          {feedbackList.length === 0 ? (
            <p className="text-gray-500">No feedback yet. Be the first to share your thoughts!</p>
          ) : (
            <ul className="space-y-4">
              {feedbackList.map((fb, idx) => (
                <li key={idx} className="border-b pb-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-800">{fb.name}</span>
                    <span className="text-xs text-gray-400">{fb.date}</span>
                  </div>
                  <div className="text-sm text-gray-700 mt-1">{fb.feedback}</div>
                  <div className="text-xs text-gray-500 mt-1">{fb.email}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default About; 