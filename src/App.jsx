import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Header from './components/header';
import AboutMe from './components/AboutMe';
import Footer from './components/footer';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Header name="Tirth" branch="Artificial Intelligence & Machine Learning" />
        <AboutMe />
      </main>
      <Footer />
    </>
  );
}

export default App;
