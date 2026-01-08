import { useState } from 'react';
import API from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', role: 'student' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', formData);
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
   
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">
    <div className="relative w-full max-w-md">

      {/* Glow */}
      <div className="absolute -inset-1 rounded-3xl bg-white/20 blur-2xl"></div>

      {/* Card */}
      <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">

        {/* Header */}
        <h1 className="text-3xl font-extrabold text-white text-center">
          Create Account
        </h1>
        <p className="text-sm text-white/70 text-center mt-2">
          Join the learning platform
        </p>

        {/* Role Toggle */}
        <div className="mt-6 flex rounded-xl bg-white/20 p-1">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: 'student' })}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
              formData.role === 'student'
                ? 'bg-white text-indigo-700'
                : 'text-white/80 hover:text-white'
            }`}
          >
            Student
          </button>

          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: 'academy' })}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
              formData.role === 'academy'
                ? 'bg-white text-indigo-700'
                : 'text-white/80 hover:text-white'
            }`}
          >
            Academy
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">

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
            Sign up as {formData.role === 'academy' ? 'Academy' : 'Student'}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-white/80">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  </div>
  );
};

export default Register;
