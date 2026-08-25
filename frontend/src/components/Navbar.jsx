import React from 'react';
import { Activity, PlusCircle, ShieldCheck } from 'lucide-react';

export default function Navbar({ onOpenSimulate }) {
  return (
    <header className="bg-[#0b0f19] border-b border-[#1f293d] px-6 py-4 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="bg-[#00e5ff]/10 border border-[#00e5ff]/30 p-2 rounded-lg text-[#00e5ff]">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-mono font-bold text-lg text-[#00e5ff] tracking-wider">
            PROJECT KARMAN <span className="text-xs text-slate-400 font-sans border border-slate-700 px-2 py-0.5 rounded ml-2">PM-AJAY RAG HUB</span>
          </h1>
          <p className="text-xs text-slate-400">Field Officer Command Center • Rural WhatsApp Voice Stream</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-[#111827] border border-[#1f293d] px-3 py-1.5 rounded-full text-xs font-mono text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00ff66] animate-pulse pulse-active"></span>
          <span>Twilio Webhook: <strong className="text-[#00ff66]">ACTIVE</strong></span>
        </div>

        <button 
          onClick={onOpenSimulate}
          className="flex items-center gap-2 bg-[#00e5ff] hover:bg-[#00c4dc] text-slate-950 font-bold text-xs px-4 py-2 rounded-lg transition shadow-lg shadow-[#00e5ff]/20"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Simulate WhatsApp Intake</span>
        </button>
      </div>
    </header>
  );
}
