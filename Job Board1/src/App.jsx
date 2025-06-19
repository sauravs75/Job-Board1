import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HeroS from './components/HeroS';
import Footer from './components/Footer';
import Login from './components/Login';
import Jobs from './components/Jobs';
import AddJob from './components/AddJob';
import Companies from './components/Companies';
import AddCompany from './components/AddCompany';
import About from './components/About';

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
            <Route path="/companies" element={<Companies />} />
            <Route path="/add-company" element={<AddCompany />} />
            <Route path="/about" element={<About />} />
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