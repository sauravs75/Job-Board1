import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HeroS from './components/HeroS';
import Footer from './components/Footer';
import Login from './components/Login';
import Jobs from './components/Jobs';
import AddJob from './components/AddJob';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HeroS />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/add-job" element={<AddJob />} />
            <Route path="/companies" element={<div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold">Companies Page</h1></div>} />
            <Route path="/about" element={<div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold">About Page</h1></div>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;