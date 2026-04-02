import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full bg-zinc-950 border border-zinc-900 rounded-2xl p-8 relative z-10 shadow-2xl">
        <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Sign In</h2>
        <p className="text-zinc-400 mb-8 text-sm">Enter your credentials to access your dashboard</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Email</label>
            <input 
              type="email" 
              required 
              className="w-full px-4 py-3 rounded-lg bg-black border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Password</label>
            <input 
              type="password" 
              required 
              className="w-full px-4 py-3 rounded-lg bg-black border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
              placeholder="••••••••"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-zinc-400">
              <input type="checkbox" className="mr-2 rounded border-zinc-800 bg-black text-white focus:ring-zinc-500" /> Remember me
            </label>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">Forgot password?</a>
          </div>
          <button 
            type="submit" 
            className="w-full py-3 px-4 bg-white hover:bg-zinc-200 text-black font-semibold rounded-lg transition-colors focus:outline-none"
          >
            Sign In
          </button>
        </form>
        <p className="mt-8 text-center text-xs text-zinc-500">
          Not a member? <a href="#" className="text-white hover:underline font-medium">Create an account</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
