import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Pages/Login/Login';
import Register from './components/Pages/Register/Register';
import SearchBooks from './components/Pages/SearchBooks/SearchBooks';
import Navbar from './components/Pages/NavBar/NavBar';
import Footer from './components/Pages/Footer/Footer';
import Home from './components/Pages/Home/Home';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchBooks />} />
        </Routes>
        <Footer />  {/* Add Footer at the bottom */}
      </div>
    </Router>
  );
};

export default App;