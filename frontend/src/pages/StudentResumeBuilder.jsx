import React, { useState } from 'react';
import { FileBadge, Sparkles, CheckCircle2, FileText, Download, Eye, Edit3 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function StudentResumeBuilder() {
  const { user } = useAuth();
  
  const [personalInfo, setPersonalInfo] = useState({
    name: user?.name || 'Aarav Sharma',
    email: 'aarav.sharma@college.edu',
    degree: 'B.Tech in Computer Science',
    college: 'Delhi Technological University'
  });

  const [skills, setSkills] = useState('Python, SQL, Git, Machine Learning, NumPy, Pandas, FastAPI');
  const [projectText, setProjectText] = useState('Made a chatbot using Python.');
  const [improvement, setImprovement] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleImprove = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/student/improve-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ original_text: projectText })
      });
      if (res.ok) {
        const data = await res.json();
        setImprovement(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPdf = async () => {
    try {
      const res = await fetch('/api/generate-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: personalInfo.name,
          phone: personalInfo.email,
          district: personalInfo.college,
          trade: personalInfo.degree,
          years_experience: "Student / Developer",
          tools_owned: skills
        })
      });
      if (res.ok) {
        const data = await res.json();
        setPdfUrl(data.pdf_url);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 font-sans bg-[#18121e] min-h-screen text-slate-100">
      
      {/* Header */}
      <div className="bg-[#241a2c] border border-[#3d2e49] p-6 rounded-2xl flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#41658a] mb-1">
            <FileBadge className="w-4 h-4" />
            <span>AI RESUME BUILDER</span>
          </div>
          <h1 className="text-xl font-bold text-white">Build your ATS-optimized student resume</h1>
          <p className="text-xs text-slate-400 mt-1">
            Auto-populated from your target career profile and completed projects. Improve phrasing with KARMAN AI.
          </p>
        </div>

        <div className="flex gap-2 font-mono text-xs">
          <button 
            onClick={handleExportPdf}
            className="bg-[#79b473] hover:bg-[#68a062] text-[#18121e] font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow-lg"
          >
            <Download className="w-4 h-4" />
            <span>Export PDF Resume</span>
          </button>
        </div>
      </div>

      {pdfUrl && (
        <div className="bg-[#241a2c] border border-[#79b473] p-4 rounded-xl flex items-center justify-between font-mono text-xs">
          <span className="text-[#79b473] font-bold">✓ PDF Resume Generated Successfully!</span>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="bg-[#79b473] text-[#18121e] font-bold px-4 py-2 rounded-lg">
            Download PDF Now ➔
          </a>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
        
        {/* Form Inputs */}
        <div className="bg-[#241a2c] border border-[#3d2e49] p-6 rounded-2xl space-y-4">
          <h3 className="font-bold text-sm text-[#41658a]">PERSONAL & ACADEMIC INFO</h3>

          <div>
            <label className="block text-slate-400 mb-1">Full Name:</label>
            <input 
              type="text"
              value={personalInfo.name}
              onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
              className="w-full bg-[#18121e] border border-[#3d2e49] rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-[#41658a]"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Degree & Specialization:</label>
            <input 
              type="text"
              value={personalInfo.degree}
              onChange={(e) => setPersonalInfo({ ...personalInfo, degree: e.target.value })}
              className="w-full bg-[#18121e] border border-[#3d2e49] rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-[#41658a]"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">College / University:</label>
            <input 
              type="text"
              value={personalInfo.college}
              onChange={(e) => setPersonalInfo({ ...personalInfo, college: e.target.value })}
              className="w-full bg-[#18121e] border border-[#3d2e49] rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-[#41658a]"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Technical Skills:</label>
            <textarea 
              rows="3"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full bg-[#18121e] border border-[#3d2e49] rounded-xl p-3 text-slate-100 focus:outline-none focus:border-[#41658a]"
            ></textarea>
          </div>
        </div>

        {/* Project Description & KARMAN Improver */}
        <div className="bg-[#241a2c] border border-[#3d2e49] p-6 rounded-2xl space-y-4">
          <h3 className="font-bold text-sm text-[#79b473] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> IMPROVE WITH KARMAN AI
          </h3>

          <div>
            <label className="block text-slate-400 mb-1">Project Description Bullet:</label>
            <textarea 
              rows="3"
              value={projectText}
              onChange={(e) => setProjectText(e.target.value)}
              className="w-full bg-[#18121e] border border-[#3d2e49] rounded-xl p-3 text-slate-100 focus:outline-none focus:border-[#79b473]"
            ></textarea>
          </div>

          <button 
            onClick={handleImprove}
            disabled={loading}
            className="w-full bg-[#41658a] hover:bg-[#345272] text-white font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow"
          >
            {loading ? 'Analyzing Wording...' : 'Improve Phrasing with KARMAN'}
          </button>

          {/* KARMAN Wording Suggestion Box */}
          {improvement && (
            <div className="bg-[#18121e] border border-[#79b473] p-4 rounded-xl space-y-3 font-sans text-xs">
              <div className="font-mono text-[11px] text-[#79b473] font-bold">
                KARMAN SUGGESTED REFINEMENT:
              </div>
              <p className="text-slate-200 bg-[#241a2c] p-3 rounded-lg border border-[#3d2e49] leading-relaxed">
                "{improvement.suggested}"
              </p>

              <div className="flex gap-2 font-mono text-[11px]">
                <button 
                  onClick={() => setProjectText(improvement.suggested)}
                  className="bg-[#79b473] text-[#18121e] font-bold px-3 py-1.5 rounded-lg"
                >
                  Accept Suggestion
                </button>
                <button 
                  onClick={() => setImprovement(null)}
                  className="bg-[#3d2e49] text-slate-300 font-bold px-3 py-1.5 rounded-lg"
                >
                  Keep Original
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
