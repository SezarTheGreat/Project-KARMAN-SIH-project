import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ShieldCheck, GraduationCap, Wrench, Send, Sparkles, LayoutDashboard, FileSearch, Layers, Map, FileBadge, BookOpen, Search, Mic, MessageSquare, Zap, LogIn, UserPlus, Newspaper } from 'lucide-react';

export default function Navbar({ onOpenSimulate }) {
  const location = useLocation();
  const isStudent = location.pathname.startsWith('/student');
  const isWorker = location.pathname.startsWith('/worker');

  return (
    <header className="bg-[#18121e] border-b border-[#3d2e49] px-6 py-3 sticky top-0 z-40">
      
      {/* Top Bar: Brand, Dual Pathway Switcher & Auth */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2.5 border-b border-[#3d2e49]/60">
        
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-[#79b473]/15 border border-[#79b473]/40 p-2 rounded-lg text-[#79b473]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-mono font-bold text-base text-[#79b473] tracking-wider flex items-center gap-2">
              KARMAN <span className="text-[10px] text-slate-300 font-sans border border-[#3d2e49] bg-[#241a2c] px-2 py-0.5 rounded">PM-AJAY AI</span>
            </h1>
            <p className="text-[11px] text-slate-400">Find the next step from where you are.</p>
          </div>
        </Link>

        {/* Major Journey Switcher */}
        <div className="flex items-center gap-2 bg-[#241a2c] p-1 rounded-xl border border-[#3d2e49] font-mono text-xs">
          <NavLink 
            to="/student"
            className={({ isActive }) => `flex items-center gap-2 px-4 py-1.5 rounded-lg transition font-bold ${isActive ? 'bg-[#41658a] text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Career Lab (Student)</span>
          </NavLink>

          <NavLink 
            to="/worker"
            className={({ isActive }) => `flex items-center gap-2 px-4 py-1.5 rounded-lg transition font-bold ${isActive ? 'bg-[#79b473] text-[#18121e] shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            <Wrench className="w-4 h-4" />
            <span>Worker Desk (Skilled Trade)</span>
          </NavLink>
        </div>

        {/* Auth & Telegram Action Group */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <NavLink 
            to="/newsroom"
            className={({ isActive }) => `flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition border border-[#3d2e49] ${isActive ? 'bg-[#79b473]/20 text-[#79b473] border-[#79b473]' : 'text-slate-300 hover:text-white bg-[#241a2c]'}`}
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span>Newsroom</span>
          </NavLink>

          <NavLink 
            to="/login"
            className={({ isActive }) => `flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition border border-[#3d2e49] ${isActive ? 'bg-[#79b473]/20 text-[#79b473] border-[#79b473]' : 'text-slate-300 hover:text-white bg-[#241a2c]'}`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </NavLink>

          <NavLink 
            to="/register"
            className="flex items-center gap-1.5 bg-[#79b473] hover:bg-[#68a062] text-[#18121e] font-bold px-3 py-1.5 rounded-lg transition shadow-sm"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Register</span>
          </NavLink>
        </div>

      </div>

      {/* Sub-Navigation depending on Journey */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        
        {isStudent ? (
          <nav className="flex items-center gap-1">
            <span className="text-[10px] text-[#41658a] uppercase font-bold tracking-wider mr-2 border border-[#41658a]/30 px-2 py-0.5 rounded">STUDENT WORKSPACE</span>
            <NavLink to="/student" end className={({ isActive }) => `px-3 py-1.5 rounded-lg transition ${isActive ? 'bg-[#41658a]/20 text-[#41658a] border border-[#41658a]/40 font-bold' : 'text-slate-300 hover:text-white'}`}>Dashboard</NavLink>
            <NavLink to="/student/resume-analyzer" className={({ isActive }) => `px-3 py-1.5 rounded-lg transition ${isActive ? 'bg-[#41658a]/20 text-[#41658a] border border-[#41658a]/40 font-bold' : 'text-slate-300 hover:text-white'}`}>Resume Analyzer</NavLink>
            <NavLink to="/student/projects" className={({ isActive }) => `px-3 py-1.5 rounded-lg transition ${isActive ? 'bg-[#41658a]/20 text-[#41658a] border border-[#41658a]/40 font-bold' : 'text-slate-300 hover:text-white'}`}>Project Lab</NavLink>
            <NavLink to="/student/roadmap" className={({ isActive }) => `px-3 py-1.5 rounded-lg transition ${isActive ? 'bg-[#41658a]/20 text-[#41658a] border border-[#41658a]/40 font-bold' : 'text-slate-300 hover:text-white'}`}>Career Roadmap</NavLink>
          </nav>
        ) : (
          <nav className="flex items-center gap-1">
            <span className="text-[10px] text-[#79b473] uppercase font-bold tracking-wider mr-2 border border-[#79b473]/30 px-2 py-0.5 rounded">WORKER WORKSPACE</span>
            <NavLink to="/worker" end className={({ isActive }) => `px-3 py-1.5 rounded-lg transition ${isActive ? 'bg-[#79b473]/20 text-[#79b473] border border-[#79b473]/40 font-bold' : 'text-slate-300 hover:text-white'}`}>Worker Desk</NavLink>
            <NavLink to="/worker/newsroom" className={({ isActive }) => `px-3 py-1.5 rounded-lg transition ${isActive ? 'bg-[#79b473]/20 text-[#79b473] border border-[#79b473]/40 font-bold' : 'text-slate-300 hover:text-white'}`}>Scheme Newsroom</NavLink>
            <NavLink to="/worker/skills" className={({ isActive }) => `px-3 py-1.5 rounded-lg transition ${isActive ? 'bg-[#79b473]/20 text-[#79b473] border border-[#79b473]/40 font-bold' : 'text-slate-300 hover:text-white'}`}>Trade Discovery</NavLink>
            <NavLink to="/worker/telegram" className={({ isActive }) => `px-3 py-1.5 rounded-lg transition ${isActive ? 'bg-[#79b473]/20 text-[#79b473] border border-[#79b473]/40 font-bold' : 'text-slate-300 hover:text-white'}`}>Telegram Showcase</NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => `px-3 py-1.5 rounded-lg transition ${isActive ? 'bg-[#79b473]/20 text-[#79b473] border border-[#79b473]/40 font-bold' : 'text-slate-300 hover:text-white'}`}>Field Dashboard</NavLink>
          </nav>
        )}

        <button 
          onClick={onOpenSimulate}
          className="bg-[#79b473] hover:bg-[#68a062] text-[#18121e] font-bold px-3 py-1 rounded-lg transition text-[11px]"
        >
          Simulate RAG Intake
        </button>

      </div>

    </header>
  );
}
