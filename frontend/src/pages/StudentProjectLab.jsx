import React, { useState } from 'react';
import { Layers, Rocket, CheckCircle2, ArrowRight, Code, Clock, ShieldCheck, FileBadge } from 'lucide-react';

export default function StudentProjectLab() {
  const [completedProjects, setCompletedProjects] = useState([]);

  const projects = [
    {
      id: "proj-1",
      title: "🤖 RAG Document Assistant API",
      reason: "Your profile demonstrates Python and ML, but lacks practical experience with LLM applications or retrieval systems.",
      skills_gained: ["RAG", "LLMs", "Vector DB", "FastAPI", "LangChain"],
      difficulty: "Intermediate",
      time: "2 Weeks",
      steps: ["Planning ✓", "Development ✓", "Testing ✓", "Deployment ○"]
    },
    {
      id: "proj-2",
      title: "🚀 Deploy an ML Model Microservice",
      reason: "Closes your deployment gap by containerizing a PyTorch model behind a FastAPI REST endpoint in Docker.",
      skills_gained: ["Docker", "FastAPI", "REST API", "Render/Cloud"],
      difficulty: "Intermediate",
      time: "1 Week",
      steps: ["Planning ✓", "Development ✓", "Testing ○", "Deployment ○"]
    }
  ];

  const handleComplete = (id) => {
    if (!completedProjects.includes(id)) {
      setCompletedProjects(prev => [...prev, id]);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 font-sans bg-[#18121e] min-h-screen text-slate-100">
      
      {/* Header */}
      <div className="bg-[#241a2c] border border-[#3d2e49] p-6 rounded-2xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#41658a] mb-1">
            <Layers className="w-4 h-4" />
            <span>PROJECT LAB & SKILL BUILDER</span>
          </div>
          <h1 className="text-xl font-bold text-white">Don't just learn the skill. Build it.</h1>
          <p className="text-xs text-slate-400 mt-1">
            KARMAN recommends hands-on projects designed to close your specific career skill gaps.
          </p>
        </div>
      </div>

      {/* Projects Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj) => {
          const isDone = completedProjects.includes(proj.id);

          return (
            <div key={proj.id} className="bg-[#241a2c] border border-[#3d2e49] hover:border-[#41658a] rounded-2xl p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-mono text-[#41658a] bg-[#41658a]/15 border border-[#41658a]/30 px-2.5 py-0.5 rounded-full font-bold">
                    {proj.difficulty} • {proj.time}
                  </span>

                  {isDone && (
                    <span className="text-[10px] font-mono text-[#79b473] bg-[#79b473]/15 border border-[#79b473]/40 px-2 py-0.5 rounded font-bold">
                      COMPLETED ✓
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white">{proj.title}</h3>

                <div className="bg-[#18121e] border border-[#3d2e49] p-3 rounded-lg text-xs text-slate-300 space-y-1">
                  <strong className="text-amber-400 font-mono block text-[11px]">Why you're seeing this:</strong>
                  <p>{proj.reason}</p>
                </div>

                {/* Skills Gained */}
                <div className="space-y-1 font-mono text-xs">
                  <span className="text-slate-400 text-[11px]">Skills Covered:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.skills_gained.map((sk, idx) => (
                      <span key={idx} className="bg-[#41658a]/20 text-[#41658a] border border-[#41658a]/30 px-2 py-0.5 rounded text-[10px]">
                        + {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="bg-[#18121e] border border-[#3d2e49] p-3 rounded-lg font-mono text-[11px] space-y-1">
                  <span className="text-slate-400">Development Milestones:</span>
                  <div className="flex justify-between text-slate-300 pt-1">
                    {proj.steps.map((st, idx) => (
                      <span key={idx} className={st.includes('✓') ? 'text-[#79b473]' : 'text-slate-500'}>{st}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                {isDone ? (
                  <button 
                    disabled
                    className="w-full bg-[#79b473]/20 border border-[#79b473]/40 text-[#79b473] font-bold py-2.5 rounded-xl font-mono text-xs flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Project Added to Resume & Profile</span>
                  </button>
                ) : (
                  <button 
                    onClick={() => handleComplete(proj.id)}
                    className="w-full bg-[#41658a] hover:bg-[#345272] text-white font-bold py-2.5 rounded-xl transition font-mono text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#41658a]/20"
                  >
                    <Rocket className="w-4 h-4" />
                    <span>Mark Completed & Add to Resume</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
