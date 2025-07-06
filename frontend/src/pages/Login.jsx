import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axiosInstance'; 



const Login = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();

  const [inputData, setInputData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    const { id, value } = e.target;
    setInputData((prev) => ({ ...prev, [id]: value }));

    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!inputData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(inputData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!inputData.password) {
      newErrors.password = 'Password is required';
    } else if (inputData.password.length < 3) {
      newErrors.password = 'Password must be at least 3 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await axiosInstance.post('/auth/login', inputData);

      const data = res.data;
  

      if (data.success === false) {
        setLoading(false);
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      localStorage.setItem('chatapp', JSON.stringify(data));
      setAuthUser(data);
      navigate('/');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center max-w-md w-full mx-auto">
        <div className="w-full p-8 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-lg border border-white/20">
          <h1 className="text-4xl font-bold text-center text-white mb-8">
            Login <span className="text-purple-300">Chatters</span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-2">Email</label>
              <input
                id="email"
                type="email"
                value={inputData.email}
                onChange={handleInput}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 rounded-lg bg-white/20 border ${
                  errors.email ? 'border-red-400' : 'border-white/30'
                } text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all`}
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Password</label>
              <input
                id="password"
                type="password"
                value={inputData.password}
                onChange={handleInput}
                placeholder="Enter your password"
                className={`w-full px-4 py-3 rounded-lg bg-white/20 border ${
                  errors.password ? 'border-red-400' : 'border-white/30'
                } text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all`}
              />
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Login'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="text-purple-300 font-semibold hover:text-purple-200 underline transition-colors">
                Register Now!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
