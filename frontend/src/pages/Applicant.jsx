import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, ShieldCheck, CheckCircle2, FileText } from 'lucide-react';

export default function Applicant() {
  const { id } = useParams();
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/applicants/${id}`)
      .then(res => res.json())
      .then(data => { setApplicant(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, [id]);

  if (loading) return <div className="p-8 text-center font-mono text-slate-400">Loading Applicant Data...</div>;
  if (!applicant) return <div className="p-8 text-center font-mono text-slate-400">Applicant not found.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Link to="/" className="inline-flex items-center gap-2 text-xs font-mono text-[#00e5ff] hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Command Center
      </Link>

      <div className="bg-[#0b0f19] border border-[#1f293d] p-6 rounded-xl space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold text-white">{applicant.name}</h1>
            <p className="text-xs font-mono text-slate-400">Phone: {applicant.phone} • District: {applicant.district}</p>
          </div>
          <span className="bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/30 font-mono text-xs px-3 py-1 rounded-md">
            {applicant.pm_ajay_eligibility?.status}
          </span>
        </div>

        <div className="bg-[#111827] p-4 rounded-lg text-xs space-y-2 border border-slate-800">
          <p className="text-slate-400"><strong>Original Intent:</strong> "{applicant.original_audio_intent}"</p>
          <p className="text-slate-400"><strong>Extracted Skill:</strong> <span className="text-[#00e5ff] font-semibold">{applicant.extracted_skill}</span></p>
        </div>

        <a 
          href={applicant.generated_pdf_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#00ff66] text-slate-950 font-bold text-xs px-4 py-2 rounded-lg"
        >
          <Download className="w-4 h-4" /> Download PDF Roadmap
        </a>
      </div>
    </div>
  );
}
