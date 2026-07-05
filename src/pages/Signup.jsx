import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup as signupApi } from '../services/authService';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const data = await signupApi(form.name, form.email, form.password);
      login(data);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-[#1E406D] via-[#A395AC] to-[#FFDBD0]">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-md border border-white/40 rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-2">Create account</h1>
        <p className="text-white/70 mb-8 text-sm">Start your Dev Interview journey</p>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-400/20 border border-red-300/50 text-red-100 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="John Doe"
              className="w-full px-4 py-2.5 rounded-lg bg-white/20 border border-white/40 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
          <div>
            <label className="block text-white/80 text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-lg bg-white/20 border border-white/40 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
          <div>
            <label className="block text-white/80 text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Min. 6 characters"
              className="w-full px-4 py-2.5 rounded-lg bg-white/20 border border-white/40 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 mt-2 rounded-lg bg-[#1F3E6A] text-white font-semibold hover:bg-[#2a5490] transition disabled:opacity-60"
          >
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-white/70 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-white font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
