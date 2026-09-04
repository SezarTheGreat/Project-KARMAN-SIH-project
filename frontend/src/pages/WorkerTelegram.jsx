import React from 'react';
import { Send, Mic, CheckCircle2, ShieldCheck, ArrowRight, MessageSquare } from 'lucide-react';

export default function WorkerTelegram() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 font-sans bg-[#18121e] min-h-screen text-slate-100">
      
      {/* Header */}
      <div className="bg-[#241a2c] border border-[#3d2e49] p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#41658a] mb-1">
            <Send className="w-4 h-4 text-[#41658a]" />
            <span>TELEGRAM NATIVE BOT SHOWCASE</span>
          </div>
          <h1 className="text-2xl font-black text-white">KARMAN is already on Telegram.</h1>
          <p className="text-xs text-slate-400 mt-1">
            You don't have to learn a new platform. Just send KARMAN a message or voice note on Telegram.
          </p>
        </div>

        <a 
          href="https://t.me/projectkarmancareerguidancebot" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#41658a] hover:bg-[#345272] text-white font-bold text-xs px-5 py-3 rounded-xl font-mono inline-flex items-center gap-2 shadow-lg shadow-[#41658a]/20"
        >
          <Send className="w-4 h-4" />
          <span>Launch @projectkarmancareerguidancebot</span>
        </a>
      </div>

      {/* Telegram Mobile UI Mockup */}
      <div className="bg-[#241a2c] border border-[#3d2e49] rounded-2xl p-6 max-w-md mx-auto space-y-4 shadow-2xl">
        <div className="flex items-center gap-3 border-b border-[#3d2e49] pb-3">
          <div className="w-10 h-10 rounded-full bg-[#41658a] text-white flex items-center justify-center font-bold text-sm">
            K
          </div>
          <div>
            <div className="font-bold text-sm text-white flex items-center gap-1.5">
              KARMAN AI Bot <CheckCircle2 className="w-4 h-4 text-[#79b473]" />
            </div>
            <div className="text-[11px] text-[#79b473] font-mono">bot • online</div>
          </div>
        </div>

        {/* Telegram Chat Bubbles */}
        <div className="space-y-3 font-sans text-xs">
          
          {/* Incoming Voice Note */}
          <div className="flex justify-end">
            <div className="bg-[#41658a] text-white rounded-2xl p-3 max-w-[80%] space-y-1">
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4" />
                <span className="font-mono text-[11px]">Voice Note (0:14)</span>
              </div>
              <p className="text-[11px] text-slate-200 italic">"Mujhe silai aati hai aur machine kharidne ke liye madad chahiye."</p>
            </div>
          </div>

          {/* Bot Reply */}
          <div className="flex justify-start">
            <div className="bg-[#18121e] border border-[#3d2e49] text-slate-100 rounded-2xl p-4 max-w-[90%] space-y-2 font-mono text-[11px]">
              <p className="text-slate-200">
                Namaste! I understood that you work in <strong>tailoring</strong>.
              </p>
              <p className="text-[#70a37f]">
                Matched NSQF Trade: <strong>Sewing Machine Operator (AMH/Q0301)</strong>
              </p>
              <p className="text-[#79b473]">
                Scheme Clearance: <strong>PM-AJAY Equipment Grant ₹50,000</strong>
              </p>
              
              <div className="bg-[#241a2c] p-2 rounded border border-[#3d2e49] text-[10px] text-slate-400">
                Source: PM-AJAY Guidelines.pdf (Page 38)
              </div>

              <div className="pt-2 flex flex-col gap-1.5 font-bold">
                <button className="bg-[#79b473] text-[#18121e] py-1.5 rounded text-center">
                  [ Check Eligibility ]
                </button>
                <button className="bg-[#41658a] text-white py-1.5 rounded text-center">
                  [ See Certification Options ]
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Why Telegram Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        <div className="bg-[#241a2c] border border-[#3d2e49] p-4 rounded-xl space-y-1">
          <div className="font-bold text-[#79b473] text-sm">🎙️ Voice-First Interaction</div>
          <p className="text-slate-400 text-[11px] font-sans">No typing or searching needed. Simply press hold-to-talk in your native regional language.</p>
        </div>

        <div className="bg-[#241a2c] border border-[#3d2e49] p-4 rounded-xl space-y-1">
          <div className="font-bold text-[#70a37f] text-sm">📄 Source-Backed Answers</div>
          <p className="text-slate-400 text-[11px] font-sans">Every response provides verifiable official government document citations & page numbers.</p>
        </div>

        <div className="bg-[#241a2c] border border-[#3d2e49] p-4 rounded-xl space-y-1">
          <div className="font-bold text-[#41658a] text-sm">👥 Community Access</div>
          <p className="text-slate-400 text-[11px] font-sans">Can be used inside community messaging groups and Panchayat centers.</p>
        </div>
      </div>

    </div>
  );
}
