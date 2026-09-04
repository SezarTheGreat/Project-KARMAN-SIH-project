import React, { useState } from 'react';
import { Mic, Volume2, CheckCircle2, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

export default function WorkerVoice() {
  const [recordingState, setRecordingState] = useState('idle'); // 'idle', 'listening', 'transcribing', 'done'
  const [result, setResult] = useState(null);

  const startVoiceSimulation = () => {
    setRecordingState('listening');
    setTimeout(() => {
      setRecordingState('transcribing');
      setTimeout(() => {
        setRecordingState('done');
        setResult({
          transcript: "Mujhe silai aati hai aur machine kharidne ke liye madad chahiye.",
          skill: "Tailoring & Sewing",
          qp_code: "AMH/Q0301 (Apparel Sector)",
          scheme: "PM-AJAY Equipment Support Grant (₹50,000)",
          document: "PM-AJAY_Guidelines_2024_25.pdf (Page 38)"
        });
      }, 1500);
    }, 2000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 font-sans bg-[#18121e] min-h-screen text-slate-100">
      
      {/* Header */}
      <div className="bg-[#241a2c] border border-[#3d2e49] p-6 rounded-2xl text-center space-y-2">
        <span className="text-xs font-mono font-bold text-[#79b473] uppercase bg-[#79b473]/15 border border-[#79b473]/30 px-3 py-1 rounded-full">
          NATIVE VOICE ASSISTANT ENGINE
        </span>
        <h1 className="text-2xl font-black text-white">Just tell KARMAN what you need.</h1>
        <p className="text-xs text-slate-300 max-w-md mx-auto">
          No complicated forms. No need to know the official name of your skill. Press record and speak in your regional language.
        </p>
      </div>

      {/* Large Microphone Touch Area */}
      <div className="bg-[#241a2c] border border-[#3d2e49] rounded-2xl p-8 text-center space-y-6 shadow-2xl">
        
        <div className="flex justify-center">
          <button
            onClick={startVoiceSimulation}
            className={`w-32 h-32 rounded-full flex items-center justify-center transition-all transform duration-300 ${recordingState === 'listening' ? 'bg-rose-500 scale-110 shadow-2xl shadow-rose-500/50 animate-pulse' : 'bg-[#79b473] hover:scale-105 text-[#18121e] shadow-xl shadow-[#79b473]/30'}`}
          >
            <Mic className="w-14 h-14" />
          </button>
        </div>

        <div className="font-mono text-xs text-slate-300">
          {recordingState === 'idle' && 'Click the microphone button and start speaking...'}
          {recordingState === 'listening' && <span className="text-rose-400 font-bold animate-pulse">🔴 Listening to your voice... Speak now!</span>}
          {recordingState === 'transcribing' && <span className="text-amber-400 font-bold">⚙ Transcribing speech & matching NSQF DB...</span>}
          {recordingState === 'done' && <span className="text-[#79b473] font-bold">✓ Audio query processed successfully!</span>}
        </div>

      </div>

      {/* Visual Pipeline Architecture Display */}
      <div className="bg-[#241a2c] border border-[#3d2e49] p-6 rounded-2xl space-y-3 font-mono text-xs">
        <div className="text-[#79b473] font-bold flex items-center gap-1.5 border-b border-[#3d2e49] pb-2">
          <Cpu className="w-4 h-4" /> VOICE RAG PROCESSING PIPELINE ARCHITECTURE:
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-center text-[10px]">
          <div className="bg-[#18121e] border border-[#3d2e49] p-2.5 rounded-lg text-slate-300">1. Voice Audio</div>
          <div className="bg-[#18121e] border border-[#3d2e49] p-2.5 rounded-lg text-slate-300">2. Speech to Text</div>
          <div className="bg-[#18121e] border border-[#3d2e49] p-2.5 rounded-lg text-slate-300">3. Skill ID</div>
          <div className="bg-[#18121e] border border-[#3d2e49] p-2.5 rounded-lg text-slate-300">4. RAG Retrieval</div>
          <div className="bg-[#18121e] border border-[#3d2e49] p-2.5 rounded-lg text-slate-300">5. Rule Check</div>
          <div className="bg-[#18121e] border border-[#79b473] p-2.5 rounded-lg text-[#79b473] font-bold">6. Answer</div>
        </div>
      </div>

      {/* Processed Results */}
      {result && (
        <div className="bg-[#241a2c] border-2 border-[#79b473] p-6 rounded-2xl space-y-4 font-sans">
          <div className="font-mono text-xs text-[#79b473] font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> RECOGNIZED AUDIO TRANSCRIPT & MATCHED POLICY
          </div>

          <div className="bg-[#18121e] p-3 rounded-xl border border-[#3d2e49] italic text-xs text-slate-200 font-mono">
            "{result.transcript}"
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
            <div className="bg-[#18121e] p-3 rounded-lg border border-[#3d2e49]">
              <span className="text-slate-400 text-[10px]">Extracted Skill:</span>
              <div className="font-bold text-white mt-0.5">{result.skill}</div>
            </div>

            <div className="bg-[#18121e] p-3 rounded-lg border border-[#3d2e49]">
              <span className="text-slate-400 text-[10px]">NSQF QP Code:</span>
              <div className="font-bold text-[#79b473] mt-0.5">{result.qp_code}</div>
            </div>

            <div className="bg-[#18121e] p-3 rounded-lg border border-[#3d2e49]">
              <span className="text-slate-400 text-[10px]">Eligible Grant:</span>
              <div className="font-bold text-amber-400 mt-0.5">{result.scheme}</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
