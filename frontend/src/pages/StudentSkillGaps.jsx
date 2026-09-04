import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, CheckCircle2, AlertCircle, ArrowRight, BookOpen, Rocket } from 'lucide-react';

export default function StudentSkillGaps() {
  const strongSkills = ["Python", "SQL", "Git", "Machine Learning"];
  const strengthenSkills = ["Data Structures", "APIs", "Model Evaluation"];
  const buildSkills = [
    {
      skill: "Docker",
      why: "Deployment experience is commonly expected in applied AI roles.",
      learn: "Containers → Dockerfiles → Images → Deployment",
      project: "Deploy a Machine Learning API"
    },
    {
      skill: "RAG / LLMs",
      why: "Retrieval-augmented generation is fundamental for enterprise context AI.",
      learn: "Embeddings → Vector DB → Retrieval → Prompting → RAG",
      project: "RAG Document Assistant API"
    },
    {
      skill: "Cloud Deployment",
      why: "Serving production inference endpoints requires cloud infrastructure knowledge.",
      learn: "Virtual Machines → Serverless → Cloud APIs → CI/CD",
      project: "Deploy FastAPI App on Cloud"
    }
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 font-sans bg-[#18121e] min-h-screen text-slate-100">
      
      {/* Header */}
      <div className="bg-[#241a2c] border border-[#3d2e49] p-6 rounded-2xl flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#41658a] mb-1">
            <Layers className="w-4 h-4" />
            <span>SKILL GAP DIAGNOSTICS</span>
          </div>
          <h1 className="text-xl font-bold text-white">What's standing between you and your target role?</h1>
          <p className="text-xs text-slate-400 mt-1">
            Categorized analysis showing what you've mastered, what needs strengthening, and what to build next.
          </p>
        </div>
      </div>

      {/* Already Strong & Strengthen Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
        
        {/* Already Strong */}
        <div className="bg-[#241a2c] border border-[#3d2e49] p-5 rounded-2xl space-y-3">
          <h3 className="font-bold text-sm text-[#79b473] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> ALREADY STRONG
          </h3>
          <div className="flex flex-wrap gap-2">
            {strongSkills.map((s, i) => (
              <span key={i} className="bg-[#79b473]/15 text-[#79b473] border border-[#79b473]/30 px-3 py-1 rounded-lg">
                ✓ {s}
              </span>
            ))}
          </div>
        </div>

        {/* Strengthen */}
        <div className="bg-[#241a2c] border border-[#3d2e49] p-5 rounded-2xl space-y-3">
          <h3 className="font-bold text-sm text-amber-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> STRENGTHEN
          </h3>
          <div className="flex flex-wrap gap-2">
            {strengthenSkills.map((s, i) => (
              <span key={i} className="bg-amber-400/15 text-amber-400 border border-amber-400/30 px-3 py-1 rounded-lg">
                ⚠ {s}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Need to Build Section */}
      <div className="space-y-4 font-sans">
        <h3 className="font-mono font-bold text-sm text-rose-400 flex items-center gap-2">
          ✕ NEED TO BUILD (CRITICAL GAPS)
        </h3>

        <div className="space-y-4">
          {buildSkills.map((item, idx) => (
            <div key={idx} className="bg-[#241a2c] border border-[#3d2e49] hover:border-[#41658a] p-6 rounded-2xl space-y-3 transition">
              <div className="flex justify-between items-center font-mono">
                <span className="text-lg font-bold text-white">{item.skill}</span>
                <span className="text-xs bg-rose-500/15 text-rose-400 border border-rose-500/30 px-2.5 py-0.5 rounded font-bold">
                  HIGH PRIORITY GAP
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-[#18121e] border border-[#3d2e49] p-3 rounded-xl space-y-1">
                  <strong className="text-[#41658a] font-mono block text-[11px]">Why it matters:</strong>
                  <p className="text-slate-300">{item.why}</p>
                </div>

                <div className="bg-[#18121e] border border-[#3d2e49] p-3 rounded-xl space-y-1 font-mono">
                  <strong className="text-[#79b473] block text-[11px]">What to learn:</strong>
                  <p className="text-slate-300 text-[11px]">{item.learn}</p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 font-mono text-xs border-t border-[#3d2e49]">
                <span className="text-slate-400">Recommended Project: <strong>{item.project}</strong></span>
                <Link 
                  to="/student/projects"
                  className="bg-[#41658a] hover:bg-[#345272] text-white font-bold px-4 py-2 rounded-lg transition inline-flex items-center gap-1.5 shadow"
                >
                  <span>Start Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
