import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center font-sans relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-4xl px-6 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 mb-6 tracking-tighter">
          Finance Dashboard
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
          The ultimate control center for your wealth. Premium insights, seamless tracking, and profound clarity over your financial future.
        </p>
        <div className="flex justify-center space-x-4">
          <Link 
            to="/login" 
            className="px-8 py-3 text-sm font-medium text-black bg-white hover:bg-zinc-200 rounded-full transition-all duration-300"
          >
            Get Started
          </Link>
          <a href="#features" className="px-8 py-3 text-sm font-medium text-white border border-zinc-800 hover:bg-zinc-900 rounded-full transition-all duration-300">
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}

export default Landing;
