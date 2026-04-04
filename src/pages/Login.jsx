import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStoredUser, saveUser } from "../utils/storage";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const existingUser = getStoredUser();
    if (existingUser) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    saveUser(formData);
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full bg-zinc-950 border border-zinc-900 rounded-2xl p-8 relative z-10 shadow-2xl">
        <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
          Sign In
        </h2>
        <p className="text-zinc-400 mb-8 text-sm">
          Enter your name and email to access your dashboard
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-black border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-black border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-white hover:bg-zinc-200 text-black font-semibold rounded-lg transition-colors focus:outline-none"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
