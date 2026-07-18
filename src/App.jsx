import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/header';
import Footer from './components/footer';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import Contact from './components/Contact';
import NotFound from './components/NotFound';

function Layout({ theme, toggleTheme }) {
  return (
    <div className="app-container">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Header name="Tirth" branch="Artificial Intelligence & Machine Learning" />
      <main className="content-container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout theme={theme} toggleTheme={toggleTheme} />}>
          <Route index element={<Projects />} />
          <Route path="about" element={<AboutMe />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

