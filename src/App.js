// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StreamList from './components/StreamList';
import Navbar from './components/Navbar';
import Movies from './components/Movies'; // Assuming Movies component is defined
import Cart from './components/Cart'; // Assuming Cart component is defined
import About from './components/About'; // Assuming About component is defined

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<StreamList />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
