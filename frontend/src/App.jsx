import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthPage from './pages/AuthPage';
import Home from './pages/Home';
import { VerifyUser } from './utils /VerifyUser';
import Profile from './pages/profile';

const App = () => {
  return (
    <div className="bg-gray-800 min-h-screen w-screen flex items-center justify-center text-white">
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<VerifyUser/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/profile" element={<Profile />} />
 
        </Route>

      </Routes>
    </div>
  );
};

export default App;
