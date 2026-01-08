
import { useState } from 'react';
import API from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', formData);

      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);

      toast.success('Login successful');

      if (data.role === 'academy') navigate('/academy');
      else navigate('/student');
    } catch {
      toast.error('Invalid credentials');
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">
    <div className="relative w-full max-w-md">
      
      {/* Glow */}
      <div className="absolute -inset-1 rounded-3xl bg-white/20 blur-2xl"></div>

      {/* Card */}
      <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">

        <h1 className="text-3xl font-extrabold text-white text-center">
          Welcome Back
        </h1>
        <p className="text-sm text-white/70 text-center mt-2">
          Login to continue learning
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          <input
            type="email"
            required
            placeholder="Email address"
            className="w-full h-12 px-4 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            type="password"
            required
            placeholder="Password"
            className="w-full h-12 px-4 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-white text-indigo-700 font-semibold text-lg hover:scale-[1.02] transition-transform"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/80">
          New here?{' '}
          <Link to="/register" className="font-semibold underline">
            Create account
          </Link>
        </p>

      </div>
    </div>
  </div>

  );
};

export default Login;
