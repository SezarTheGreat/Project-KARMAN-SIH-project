import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Wrench, Send, Mic, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, Award } from 'lucide-react';

export default function Landing() {
  return (
    <div className="bg-[#18121e] text-slate-100 min-h-screen font-sans selection:bg-[#79b473] selection:text-[#18121e]">
      
      {/* Top Banner */}
      <div className="gradient-banner text-slate-100 text-xs font-semibold py-2.5 px-4 text-center tracking-wide border-b border-[#3d2e49]">
        🚀 Smart India Hackathon Prototype: Multi-Journey Opportunity Platform • Student Career Lab & Worker RAG Hub
      </div>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono font-bold text-[#79b473] uppercase tracking-widest bg-[#79b473]/15 border border-[#79b473]/30 px-3.5 py-1 rounded-full">
            ONE PLATFORM • TWO TAILORED JOURNEYS
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Find the next step from where you are.
          </h1>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            KARMAN helps students build the skills they need for their target careers and helps skilled workers discover recognition, government schemes, and opportunities available to them.
          </p>
        </div>
      </section>

      {/* Main Dual-Pathway Choice Cards */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold font-mono text-[#70a37f]">How can KARMAN help you today?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: College Student Journey */}
          <div className="bg-[#241a2c] border-2 border-[#41658a] hover:border-[#79b473] rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 shadow-xl group hover:-translate-y-1">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#41658a]/30 text-[#41658a] border border-[#41658a]/40 flex items-center justify-center mb-6">
                <GraduationCap className="w-8 h-8" />
              </div>

              <span className="text-xs font-mono font-bold text-[#41658a] uppercase tracking-wider bg-[#41658a]/15 border border-[#41658a]/30 px-3 py-1 rounded-full">
                FOR COLLEGE STUDENTS
              </span>

              <h3 className="text-2xl font-black text-white mt-4 mb-3">
                Build skills. Build projects. Build your career.
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Analyze your resume, discover skill gaps vs industry target roles, find hands-on projects to close your gaps, and create a structured roadmap towards your dream career.
              </p>

              <ul className="space-y-2 text-xs font-mono text-slate-300 mb-8 border-t border-[#3d2e49] pt-4">
                <li className="flex items-center gap-2 text-[#41658a]">✓ AI Resume Analyzer & Gap Finder</li>
                <li className="flex items-center gap-2 text-[#41658a]">✓ Hands-on Project Lab & Progress Tracker</li>
                <li className="flex items-center gap-2 text-[#41658a]">✓ Target Career Roadmap & Resume Builder</li>
              </ul>
            </div>

            <Link 
              to="/student"
              className="bg-[#41658a] hover:bg-[#345272] text-white font-bold py-3.5 px-6 rounded-xl transition flex items-center justify-center gap-2 font-mono text-xs shadow-lg shadow-[#41658a]/20 group-hover:scale-[1.02] transform"
            >
              <span>Enter Career Lab</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2: Skilled Worker Journey */}
          <div className="bg-[#241a2c] border-2 border-[#79b473] hover:border-white rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 shadow-xl group hover:-translate-y-1">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#79b473]/30 text-[#79b473] border border-[#79b473]/40 flex items-center justify-center mb-6">
                <Wrench className="w-8 h-8" />
              </div>

              <span className="text-xs font-mono font-bold text-[#79b473] uppercase tracking-wider bg-[#79b473]/15 border border-[#79b473]/30 px-3 py-1 rounded-full">
                FOR SKILLED WORKERS & ARTISANS
              </span>

              <h3 className="text-2xl font-black text-white mt-4 mb-3">
                Your skills already have value. Let's find where they can take you.
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Discover relevant government schemes (PM-AJAY, PM-Vishwakarma), NSQF trade certifications, skill pathways, and tool grants through a simple dashboard or by talking to KARMAN.
              </p>

              <ul className="space-y-2 text-xs font-mono text-slate-300 mb-8 border-t border-[#3d2e49] pt-4">
                <li className="flex items-center gap-2 text-[#79b473]">✓ Scheme Newsroom with Official Policy Citations</li>
                <li className="flex items-center gap-2 text-[#79b473]">✓ Informal Skill ➔ NSQF QP Code Mapping</li>
                <li className="flex items-center gap-2 text-[#79b473]">✓ Recognition of Prior Learning (RPL) Fast-Track</li>
              </ul>
            </div>

            <Link 
              to="/worker"
              className="bg-[#79b473] hover:bg-[#68a062] text-[#18121e] font-bold py-3.5 px-6 rounded-xl transition flex items-center justify-center gap-2 font-mono text-xs shadow-lg shadow-[#79b473]/20 group-hover:scale-[1.02] transform"
            >
              <span>Enter Worker Desk</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* Voice & Telegram Section */}
      <section className="bg-[#241a2c] border-t border-[#3d2e49] py-12 px-6">
        <div className="max-w-4xl mx-auto bg-[#18121e] border border-[#3d2e49] rounded-2xl p-8 flex flex-wrap items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-lg">
            <span className="text-xs font-mono text-[#79b473] font-bold flex items-center gap-1.5">
              <Mic className="w-4 h-4" /> DON'T WANT TO TYPE?
            </span>
            <h3 className="text-xl font-bold text-white">Talk to KARMAN through voice.</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              For artisans who prefer speaking over typing, our voice-native bot processes audio queries, retrieves official scheme rules, and replies on Telegram or WhatsApp.
            </p>
          </div>

          <div className="flex flex-col gap-3 font-mono text-xs w-full sm:w-auto">
            <a 
              href="https://t.me/projectkarmancareerguidancebot"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#41658a] hover:bg-[#345272] text-white font-bold px-6 py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg"
            >
              <Send className="w-4 h-4" />
              <span>Available through Telegram ➔</span>
            </a>
            <Link 
              to="/worker/telegram"
              className="text-center text-[#79b473] hover:underline text-xs"
            >
              View Telegram Integration Demo
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
