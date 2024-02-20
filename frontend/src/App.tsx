import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Charities from './pages/Charities';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import CharityProfile from './pages/CharityProfile';
import Contact from './pages/Contact';
import About from './pages/About';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Charities />} />
          <Route path="/account" element={<Account />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/charity/:charityId" element={<CharityProfile />} />
          <Route path="/sponsor/:sponsorId" element={<CharityProfile />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
