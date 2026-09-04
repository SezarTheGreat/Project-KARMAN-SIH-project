import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileSearch, Sparkles, CheckCircle2, AlertCircle, ArrowRight, Upload, Layers, Code, Zap } from 'lucide-react';

export default function StudentResumeAnalyzer() {
  const [resumeText, setResumeText] = useState('Proficient in Python, SQL, Git, NumPy, Pandas, and Scikit-Learn. Built a churn prediction model using Logistic Regression. Completed B.Tech in Computer Science.');
  const [targetRole, setTargetRole] = useState('ai_ml_engineer');
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/student/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resume_text: resumeText + " " + jobDescription,
          target_role: targetRole
        })
      });
      if (res.ok) {
        const data = await res.json();
        setAnalysis(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 font-sans bg-[#18121e] min-h-screen text-slate-100">
      
      {/* Header */}
      <div className="bg-[#241a2c] border border-[#3d2e49] p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#41658a] mb-1">
            <FileSearch className="w-4 h-4" />
            <span>AI RESUME SCANNER & SKILL GAP FINDER</span>
          </div>
          <h1 className="text-xl font-bold text-white">Let's see what you've already got.</h1>
          <p className="text-xs text-slate-400 mt-1">
            Upload or paste your resume. KARMAN identifies your skills, projects, and exact areas needing improvement.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <select 
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="bg-[#18121e] border border-[#41658a] text-[#41658a] font-bold rounded-lg px-3 py-2 focus:outline-none"
          >
            <option value="ai_ml_engineer">Target: AI / ML Engineer</option>
            <option value="full_stack_developer">Target: Full-Stack Developer</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Input Panel */}
        <div className="bg-[#241a2c] border border-[#3d2e49] p-6 rounded-2xl space-y-4">
          <h2 className="font-mono font-semibold text-sm text-[#41658a] flex items-center gap-2">
            <Upload className="w-4 h-4" /> UPLOAD OR PASTE RESUME TEXT
          </h2>

          <form onSubmit={handleAnalyze} className="space-y-4 font-mono text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Paste Resume Content:</label>
              <textarea 
                rows="6"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="w-full bg-[#18121e] border border-[#3d2e49] rounded-lg p-3 text-slate-100 font-sans text-xs focus:outline-none focus:border-[#41658a]"
                placeholder="Paste your education, skills, projects, and work experience..."
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Compare Against Real Job Description (Optional):</label>
              <textarea 
                rows="3"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full bg-[#18121e] border border-[#3d2e49] rounded-lg p-2.5 text-slate-100 font-sans text-xs focus:outline-none focus:border-[#41658a]"
                placeholder="Paste job description text to find exact application gaps..."
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#41658a] hover:bg-[#345272] text-white font-bold py-2.5 rounded-lg transition flex items-center justify-center gap-2 shadow-lg shadow-[#41658a]/20"
            >
              {loading ? (
                <span>Scanning Resume & Calculating Gaps...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze Resume & Find Skill Gaps</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Analysis Panel */}
        <div className="bg-[#241a2c] border border-[#3d2e49] p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <h2 className="font-mono font-semibold text-sm text-[#79b473] flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-4 h-4" /> RESUME BREAKDOWN & SKILL GAP DIAGNOSTICS
            </h2>

            {analysis ? (
              <div className="space-y-4 font-mono text-xs">
                
                {/* Category Cards */}
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-[#18121e] border border-[#3d2e49] p-2.5 rounded-lg">
                    <span className="text-slate-400">Education:</span> <span className="text-[#79b473] font-bold">✓ Strong</span>
                  </div>
                  <div className="bg-[#18121e] border border-[#3d2e49] p-2.5 rounded-lg">
                    <span className="text-slate-400">Technical Skills:</span> <span className="text-[#79b473] font-bold">✓ Good</span>
                  </div>
                  <div className="bg-[#18121e] border border-[#3d2e49] p-2.5 rounded-lg">
                    <span className="text-slate-400">Projects:</span> <span className="text-amber-400 font-bold">⚠ Needs Improvement</span>
                  </div>
                  <div className="bg-[#18121e] border border-[#3d2e49] p-2.5 rounded-lg">
                    <span className="text-slate-400">Deployment:</span> <span className="text-rose-400 font-bold">🔴 Limited</span>
                  </div>
                </div>

                {/* Skills Found */}
                <div>
                  <div className="text-slate-400 text-[11px] mb-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#79b473]" />
                    Demonstrated Skills (Green):
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.matched_skills.map((s, i) => (
                      <span key={i} className="bg-[#79b473]/15 text-[#79b473] border border-[#79b473]/30 px-2 py-0.5 rounded text-[10px]">
                        🟢 {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Skills Lacking */}
                <div>
                  <div className="text-slate-400 text-[11px] mb-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                    Skills Needed for Target Role ({analysis.target_role}):
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.missing_skills.map((s, i) => (
                      <span key={i} className="bg-amber-400/15 text-amber-400 border border-amber-400/30 px-2 py-0.5 rounded text-[10px]">
                        🟡 {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Solution Box */}
                <div className="bg-[#18121e] border border-[#41658a] p-3 rounded-lg space-y-1 font-sans text-[11px]">
                  <strong className="text-[#41658a] font-mono block mb-1">Recommended Solution:</strong>
                  <p className="text-slate-300">
                    To close your deployment & LLM gaps, complete the <strong>{analysis.next_step_recommendation.title}</strong> project in the Project Lab.
                  </p>
                </div>

              </div>
            ) : (
              <div className="text-center py-20 text-slate-500 font-mono text-xs border border-dashed border-[#3d2e49] rounded-lg">
                Paste your resume text and click "Analyze" to generate a skill breakdown.
              </div>
            )}
          </div>

          {analysis && (
            <Link 
              to="/student/projects"
              className="bg-[#79b473] hover:bg-[#68a062] text-[#18121e] font-bold py-2.5 rounded-lg transition flex items-center justify-center gap-2 font-mono text-xs shadow-lg shadow-[#79b473]/20 mt-4"
            >
              <span>Explore Projects to Close Gaps</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

      </div>

    </div>
  );
}
