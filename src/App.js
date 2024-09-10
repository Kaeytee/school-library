import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Pages/Login/Login';
import Register from './components/Pages/Register/Register';
import SearchBooks from './components/Pages/SearchBooks/SearchBooks';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchBooks />} />
      </Routes>
    </Router>
  );
};

export default App;
