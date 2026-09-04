import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, GraduationCap, LayoutDashboard, FileSearch, Layers, Map, FileBadge, User, LogOut, Settings, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function StudentNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-[#18121e] border-b border-[#3d2e49] px-6 py-3 sticky top-0 z-40 font-sans">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2.5 border-b border-[#3d2e49]/60">
        
        <Link to="/student/dashboard" className="flex items-center gap-3">
          <div className="bg-[#41658a]/20 border border-[#41658a]/40 p-2 rounded-xl text-white">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-mono font-bold text-base text-white tracking-wider flex items-center gap-2">
              KARMAN <span className="text-[10px] text-[#41658a] font-sans border border-[#41658a]/30 bg-[#241a2c] px-2 py-0.5 rounded font-bold">CAREER LAB</span>
            </h1>
            <p className="text-[11px] text-slate-400">Student Livelihood & Career Preparation Platform</p>
          </div>
        </Link>

        {/* User Profile & Logout */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-slate-300 bg-[#241a2c] border border-[#3d2e49] px-3 py-1 rounded-lg">
            🎓 {user?.name || 'Student Account'}
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

      {/* Student Sub-Navigation Links */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
        <nav className="flex flex-wrap items-center gap-1">
          <NavLink to="/student/dashboard" end className={({ isActive }) => `px-3 py-1.5 rounded-lg transition ${isActive ? 'bg-[#41658a] text-white font-bold shadow' : 'text-slate-300 hover:text-white'}`}>Overview</NavLink>
          <NavLink to="/student/resume-analyzer" className={({ isActive }) => `px-3 py-1.5 rounded-lg transition ${isActive ? 'bg-[#41658a] text-white font-bold shadow' : 'text-slate-300 hover:text-white'}`}>Resume Analyzer</NavLink>
          <NavLink to="/student/skill-gaps" className={({ isActive }) => `px-3 py-1.5 rounded-lg transition ${isActive ? 'bg-[#41658a] text-white font-bold shadow' : 'text-slate-300 hover:text-white'}`}>Skill Gaps</NavLink>
          <NavLink to="/student/projects" className={({ isActive }) => `px-3 py-1.5 rounded-lg transition ${isActive ? 'bg-[#41658a] text-white font-bold shadow' : 'text-slate-300 hover:text-white'}`}>Project Lab</NavLink>
          <NavLink to="/student/roadmap" className={({ isActive }) => `px-3 py-1.5 rounded-lg transition ${isActive ? 'bg-[#41658a] text-white font-bold shadow' : 'text-slate-300 hover:text-white'}`}>Career Roadmap</NavLink>
          <NavLink to="/student/resume-builder" className={({ isActive }) => `px-3 py-1.5 rounded-lg transition ${isActive ? 'bg-[#41658a] text-white font-bold shadow' : 'text-slate-300 hover:text-white'}`}>Resume Builder</NavLink>
          <NavLink to="/student/profile" className={({ isActive }) => `px-3 py-1.5 rounded-lg transition ${isActive ? 'bg-[#41658a] text-white font-bold shadow' : 'text-slate-300 hover:text-white'}`}>Profile</NavLink>
        </nav>
      </div>

    </header>
  );
}
