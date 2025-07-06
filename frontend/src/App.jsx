import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AuthPage from './components/AuthPage';

const App = () => {
  return (
    <div className="bg-gray-800 min-h-screen w-screen flex items-center justify-center text-white">
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
