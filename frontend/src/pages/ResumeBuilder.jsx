import React, { useState } from 'react';
import { FileBadge, Download, CheckCircle2, Sparkles, User, Wrench, MapPin } from 'lucide-react';

export default function ResumeBuilder() {
  const [formData, setFormData] = useState({
    name: 'Sunita Devi',
    phone: '919876543210',
    district: 'G.B. Nagar, Uttar Pradesh',
    trade: 'Tailoring & Sewing Machine Operator',
    years_experience: '5 Years (Informal Trade)',
    tools_owned: 'Motorized Sewing Kit, Scissors, Fabric Cutter'
  });

  const [loading, setLoading] = useState(false);
  const [generatedResult, setGeneratedResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/generate-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const data = await res.json();
        setGeneratedResult(data);
      }
    } catch (err) {
      console.error("Resume generation error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 bg-[#18121e] min-h-screen text-slate-100 font-sans">
      
      {/* Header Banner */}
      <div className="bg-[#241a2c] border border-[#3d2e49] p-6 rounded-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#79b473] mb-1">
            <FileBadge className="w-4 h-4" />
            <span>NATIONAL SKILL QUALIFICATION PASS</span>
          </div>
          <h1 className="text-xl font-bold text-slate-100">Artisan Skill Pass & Resume Generator</h1>
          <p className="text-xs text-slate-400 mt-1">
            Instantly convert informal work experience into an official Government-Standard Skill Pass PDF.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Form Input Section */}
        <div className="bg-[#241a2c] border border-[#3d2e49] p-6 rounded-xl space-y-4">
          <h2 className="font-mono font-semibold text-sm text-[#79b473] flex items-center gap-2">
            <User className="w-4 h-4" /> BENEFICIARY TRADE PROFILE
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3 font-mono text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Full Name:</label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#18121e] border border-[#3d2e49] rounded p-2 text-slate-100 focus:outline-none focus:border-[#79b473]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">Mobile Contact:</label>
                <input 
                  type="text" 
                  value={formData.phone} 
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#18121e] border border-[#3d2e49] rounded p-2 text-slate-100 focus:outline-none focus:border-[#79b473]"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">District / State:</label>
                <input 
                  type="text" 
                  value={formData.district} 
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full bg-[#18121e] border border-[#3d2e49] rounded p-2 text-slate-100 focus:outline-none focus:border-[#79b473]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Practical Trade / Skill:</label>
              <input 
                type="text" 
                value={formData.trade} 
                onChange={(e) => setFormData({ ...formData, trade: e.target.value })}
                className="w-full bg-[#18121e] border border-[#3d2e49] rounded p-2 text-slate-100 focus:outline-none focus:border-[#79b473]"
                required
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Informal Work Experience:</label>
              <input 
                type="text" 
                value={formData.years_experience} 
                onChange={(e) => setFormData({ ...formData, years_experience: e.target.value })}
                className="w-full bg-[#18121e] border border-[#3d2e49] rounded p-2 text-slate-100 focus:outline-none focus:border-[#79b473]"
                required
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Tools / Equipment Owned:</label>
              <input 
                type="text" 
                value={formData.tools_owned} 
                onChange={(e) => setFormData({ ...formData, tools_owned: e.target.value })}
                className="w-full bg-[#18121e] border border-[#3d2e49] rounded p-2 text-slate-100 focus:outline-none focus:border-[#79b473]"
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#79b473] hover:bg-[#68a062] text-[#18121e] font-bold py-2.5 rounded-lg transition flex items-center justify-center gap-2 mt-4 shadow-lg shadow-[#79b473]/20"
            >
              {loading ? (
                <span>Compiling Skill Pass PDF...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Official Skill Pass PDF</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Live Output Preview */}
        <div className="bg-[#241a2c] border border-[#3d2e49] p-6 rounded-xl flex flex-col justify-between">
          <div>
            <h2 className="font-mono font-semibold text-sm text-[#79b473] flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-4 h-4" /> SKILL PASS VERIFICATION PREVIEW
            </h2>

            {generatedResult ? (
              <div className="space-y-4 font-mono text-xs">
                <div className="bg-[#18121e] border border-[#3d2e49] p-4 rounded-lg space-y-2">
                  <div><span className="text-slate-400">Candidate:</span> <strong className="text-white">{generatedResult.name}</strong></div>
                  <div><span className="text-slate-400">NSQF Mapped:</span> <strong className="text-[#70a37f]">{generatedResult.nsqf_level}</strong></div>
                  <div><span className="text-slate-400">QP Code:</span> <span className="text-slate-200">{generatedResult.qp_code}</span></div>
                  <div><span className="text-slate-400">PM-AJAY Grant:</span> <strong className="text-[#79b473]">{generatedResult.grant_type} ({generatedResult.grant_amount})</strong></div>
                </div>

                <div className="bg-[#18121e] border border-[#79b473]/40 p-3 rounded text-slate-300 text-[11px]">
                  ✓ ReportLab Skill Pass PDF Generated and Signed by Project KARMAN Verification Engine.
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-slate-500 font-mono text-xs border border-dashed border-[#3d2e49] rounded-lg">
                Fill out the candidate profile and click "Generate" to compile an official Skill Pass PDF.
              </div>
            )}
          </div>

          {generatedResult && (
            <a 
              href={generatedResult.pdf_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-[#79b473] hover:bg-[#68a062] text-[#18121e] font-bold py-2.5 rounded-lg transition flex items-center justify-center gap-2 font-mono text-xs shadow-lg shadow-[#79b473]/20 mt-4"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Skill Pass PDF</span>
            </a>
          )}
        </div>

      </div>

    </div>
  );
}
