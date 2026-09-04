import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Wrench, Home, Newspaper, Search, MessageSquare, Mic, Send, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function WorkerNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-[#18121e] border-b border-[#3d2e49] px-6 py-3.5 sticky top-0 z-40 font-sans">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2.5 border-b border-[#3d2e49]/60">
        
        <Link to="/worker/dashboard" className="flex items-center gap-3">
          <img src="/images/karman_icon.png" alt="KARMAN Logo" className="w-8 h-8 object-contain" />
          <div>
            <h1 className="font-mono font-bold text-base text-[#79b473] tracking-wider flex items-center gap-2">
              KARMAN <span className="text-[10px] text-slate-300 font-sans border border-[#3d2e49] bg-[#241a2c] px-2 py-0.5 rounded">WORKER DESK</span>
            </h1>
            <p className="text-[11px] text-slate-400">Skilled Trade Opportunities & Scheme Access</p>
          </div>
        </Link>

        {/* User Profile & Logout */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-slate-300 bg-[#241a2c] border border-[#3d2e49] px-3 py-1 rounded-lg">
            🧑🔧 {user?.name || 'Skilled Worker'}
          </span>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-1.5 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-rose-400 font-bold px-3 py-1.5 rounded-lg transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>

      </div>

      {/* Worker Sub-Navigation Links */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
        <nav className="flex flex-wrap items-center gap-1">
          <NavLink to="/worker/dashboard" end className={({ isActive }) => `px-3.5 py-1.5 rounded-lg transition ${isActive ? 'bg-[#79b473] text-[#18121e] font-bold shadow' : 'text-slate-300 hover:text-white'}`}>Home</NavLink>
          <NavLink to="/worker/newsroom" className={({ isActive }) => `px-3.5 py-1.5 rounded-lg transition ${isActive ? 'bg-[#79b473] text-[#18121e] font-bold shadow' : 'text-slate-300 hover:text-white'}`}>Scheme Newsroom</NavLink>
          <NavLink to="/worker/schemes" className={({ isActive }) => `px-3.5 py-1.5 rounded-lg transition ${isActive ? 'bg-[#79b473] text-[#18121e] font-bold shadow' : 'text-slate-300 hover:text-white'}`}>Find a Scheme</NavLink>
          <NavLink to="/worker/chat" className={({ isActive }) => `px-3.5 py-1.5 rounded-lg transition ${isActive ? 'bg-[#79b473] text-[#18121e] font-bold shadow' : 'text-slate-300 hover:text-white'}`}>Ask KARMAN</NavLink>
          <NavLink to="/worker/voice" className={({ isActive }) => `px-3.5 py-1.5 rounded-lg transition ${isActive ? 'bg-[#79b473] text-[#18121e] font-bold shadow' : 'text-slate-300 hover:text-white'}`}>Voice Assistant</NavLink>
          <NavLink to="/worker/telegram" className={({ isActive }) => `px-3.5 py-1.5 rounded-lg transition ${isActive ? 'bg-[#79b473] text-[#18121e] font-bold shadow' : 'text-slate-300 hover:text-white'}`}>Telegram</NavLink>
          <NavLink to="/worker/profile" className={({ isActive }) => `px-3.5 py-1.5 rounded-lg transition ${isActive ? 'bg-[#79b473] text-[#18121e] font-bold shadow' : 'text-slate-300 hover:text-white'}`}>Skill Profile</NavLink>
        </nav>
      </div>

    </header>
  );
}
