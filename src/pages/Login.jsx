import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as loginApi } from '../services/authService';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await loginApi(form.email, form.password);
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
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
        <p className="text-white/70 mb-8 text-sm">Sign in to your Dev Interview Assistant</p>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-400/20 border border-red-300/50 text-red-100 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-lg bg-white/20 border border-white/40 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 mt-2 rounded-lg bg-[#1F3E6A] text-white font-semibold hover:bg-[#2a5490] transition disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-white/70 text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-white font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
