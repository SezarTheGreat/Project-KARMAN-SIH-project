import React, { useState, useEffect } from 'react';
import { Map, CheckCircle2, Clock, Rocket, ArrowRight, Layers } from 'lucide-react';

export default function StudentRoadmap() {
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/student/career-roadmap?role=ai_ml_engineer')
      .then(res => res.json())
      .then(data => { setStages(data.roadmap_stages); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 font-sans bg-[#18121e] min-h-screen text-slate-100">
      
      {/* Header */}
      <div className="bg-[#241a2c] border border-[#3d2e49] p-6 rounded-2xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#41658a] mb-1">
            <Map className="w-4 h-4" />
            <span>CAREER ROADMAP & TIMELINE</span>
          </div>
          <h1 className="text-xl font-bold text-white">Your Path to AI/ML Engineering</h1>
          <p className="text-xs text-slate-400 mt-1">
            Visual stage-by-stage guide mapping what to learn, what to build, and what to feature on your resume.
          </p>
        </div>
      </div>

      {/* Roadmap Stages Feed */}
      {loading ? (
        <div className="text-center py-12 font-mono text-xs text-slate-400">Loading Career Timeline...</div>
      ) : (
        <div className="space-y-4 font-mono">
          {stages.map((stg, idx) => (
            <div key={idx} className="bg-[#241a2c] border border-[#3d2e49] p-5 rounded-2xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#41658a] tracking-widest">
                  STAGE 0{idx+1} • {stg.stage}
                </span>

                {stg.status === 'completed' && <span className="bg-[#79b473]/15 text-[#79b473] border border-[#79b473]/30 px-2 py-0.5 rounded text-[10px]">COMPLETED ✓</span>}
                {stg.status === 'in_progress' && <span className="bg-amber-400/15 text-amber-400 border border-amber-400/30 px-2 py-0.5 rounded text-[10px]">IN PROGRESS ⚙</span>}
                {stg.status === 'next' && <span className="bg-[#41658a]/20 text-[#41658a] border border-[#41658a]/30 px-2 py-0.5 rounded text-[10px]">NEXT TARGET 🎯</span>}
                {stg.status === 'upcoming' && <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded text-[10px]">UPCOMING</span>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1 font-sans text-xs">
                {stg.items.map((item, i) => (
                  <div key={i} className="bg-[#18121e] border border-[#3d2e49] p-3 rounded-lg flex items-center gap-2">
                    <span className="text-[#79b473]">✓</span>
                    <span className="text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
