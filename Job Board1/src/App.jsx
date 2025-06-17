import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/jobs" element={<div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold">Jobs Page</h1></div>} />
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