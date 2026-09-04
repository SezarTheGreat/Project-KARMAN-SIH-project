import React, { useState } from 'react';
import { ShieldCheck, Sparkles, CheckCircle2, AlertCircle, FileText, Download, ArrowRight, Zap, RefreshCw } from 'lucide-react';

export default function ATSChecker() {
  const [resumeText, setResumeText] = useState('Experienced tailor with 5 years informal practice. Skilled in single needle lockstitch, fabric measurement, pattern drafting, and quality inspection of garments.');
  const [targetTrade, setTargetTrade] = useState('Tailoring & Sewing');
  const [loading, setLoading] = useState(false);
  const [atsResult, setAtsResult] = useState(null);

  const presets = [
    { label: "Tailor / Sewing Operator", text: "Experienced tailor with 5 years informal practice. Skilled in single needle lockstitch, fabric measurement, pattern drafting, and quality inspection.", trade: "Tailoring & Sewing" },
    { label: "Automotive Repair Technician", text: "Informal mechanic for 4 years. Hands-on experience in engine overhaul, brake servicing, oil filter replacement, and electrical diagnostic.", trade: "Automotive Repair" },
    { label: "Solar Installation Technician", text: "Electrician with knowledge of solar panel mounting, inverter connection, charge controller setup, and roof array assembly.", trade: "Solar Installation" }
  ];

  const handleCheckATS = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/ats-checker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resume_text: resumeText,
          target_trade: targetTrade
        })
      });
      if (res.ok) {
        const data = await res.json();
        setAtsResult(data);
      }
    } catch (err) {
      console.error("ATS Checker error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 bg-[#18121e] min-h-screen text-slate-100 font-sans">
      
      {/* Header */}
      <div className="bg-[#241a2c] border border-[#3d2e49] p-6 rounded-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#79b473] mb-1">
            <Sparkles className="w-4 h-4" />
            <span>AI-POWERED NSQF ATS SCANNER</span>
          </div>
          <h1 className="text-xl font-bold text-slate-100">ATS Resume Checker & Skill Score Optimizer</h1>
          <p className="text-xs text-slate-400 mt-1">
            Evaluate artisan resumes against official Sector Skill Council Qualification Pack (QP) standards.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Form Panel */}
        <div className="bg-[#241a2c] border border-[#3d2e49] p-6 rounded-xl space-y-4">
          
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300">Quick Test Preset Profiles:</label>
            <div className="grid grid-cols-1 gap-2">
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => { setResumeText(p.text); setTargetTrade(p.trade); }}
                  className="text-left bg-[#18121e] hover:bg-[#3d2e49] border border-[#3d2e49] p-2.5 rounded text-xs transition"
                >
                  <div className="font-semibold text-[#79b473] font-mono">{p.label}</div>
                  <div className="text-[11px] text-slate-400 italic truncate">"{p.text}"</div>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleCheckATS} className="space-y-4 font-mono text-xs pt-2">
            <div>
              <label className="block text-slate-400 mb-1">Target NSQF Trade Sector:</label>
              <select 
                value={targetTrade}
                onChange={(e) => setTargetTrade(e.target.value)}
                className="w-full bg-[#18121e] border border-[#3d2e49] rounded p-2 text-slate-100 focus:outline-none focus:border-[#79b473]"
              >
                <option value="Tailoring & Sewing">Tailoring & Sewing Operator (AMH/Q0301)</option>
                <option value="Automotive Repair">Two Wheeler Service Technician (ASC/Q1401)</option>
                <option value="Solar Installation">Solar PV Installation Technician (SGJ/Q0101)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Paste Candidate Resume / Work Background:</label>
              <textarea 
                rows="6"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="w-full bg-[#18121e] border border-[#3d2e49] rounded p-2.5 text-slate-100 font-sans text-xs focus:outline-none focus:border-[#79b473]"
                placeholder="Paste candidate work experience and technical skills..."
                required
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#79b473] hover:bg-[#68a062] text-[#18121e] font-bold py-2.5 rounded-lg transition flex items-center justify-center gap-2 shadow-lg shadow-[#79b473]/20"
            >
              {loading ? (
                <span>Scanning Resume against NSQF Database...</span>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Scan Resume & Calculate ATS Score</span>
                </>
              )}
            </button>
          </form>

        </div>

        {/* Right Output Results Panel */}
        <div className="bg-[#241a2c] border border-[#3d2e49] p-6 rounded-xl flex flex-col justify-between">
          <div>
            <h2 className="font-mono font-semibold text-sm text-[#79b473] flex items-center gap-2 mb-4">
              <ShieldCheck className="w-4 h-4" /> ATS MATCH SCORE & OPTIMIZATION DIAGNOSTICS
            </h2>

            {atsResult ? (
              <div className="space-y-4 font-mono text-xs">
                
                {/* Score Gauge */}
                <div className="bg-[#18121e] border border-[#3d2e49] p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="text-slate-400 text-[11px]">NSQF MATCH SCORE</div>
                    <div className="text-3xl font-black text-[#79b473] mt-1">{atsResult.ats_score}%</div>
                    <div className="text-[11px] text-[#70a37f] font-sans mt-0.5">ATS Optimized for Industry Standards</div>
                  </div>

                  <div className="text-right">
                    <div className="text-[11px] text-slate-400">Target Role</div>
                    <div className="text-xs text-slate-200 font-semibold mt-1">{atsResult.nsqf_role}</div>
                    <div className="text-[10px] text-[#70a37f] mt-0.5">{atsResult.nsqf_level}</div>
                  </div>
                </div>

                {/* Matching Keywords */}
                <div>
                  <div className="text-slate-400 text-[11px] mb-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#79b473]" />
                    Matching Industry Keywords:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {atsResult.matching_keywords.map((kw, i) => (
                      <span key={i} className="bg-[#79b473]/15 text-[#79b473] border border-[#79b473]/30 px-2 py-0.5 rounded text-[10px]">
                        ✓ {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Keywords */}
                <div>
                  <div className="text-slate-400 text-[11px] mb-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                    Missing High-Impact Terms:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {atsResult.missing_keywords.map((kw, i) => (
                      <span key={i} className="bg-rose-500/15 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded text-[10px]">
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-[#18121e] border border-[#3d2e49] p-3 rounded-lg space-y-1 text-[11px] text-slate-300 font-sans">
                  <strong className="text-[#70a37f] font-mono block mb-1">AI Optimization Suggestions:</strong>
                  {atsResult.recommendations.map((rec, idx) => (
                    <div key={idx}>• {rec}</div>
                  ))}
                </div>

              </div>
            ) : (
              <div className="text-center py-20 text-slate-500 font-mono text-xs border border-dashed border-[#3d2e49] rounded-lg">
                Click "Scan Resume" to run AI keyword analysis against official NSQF QP standards.
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
