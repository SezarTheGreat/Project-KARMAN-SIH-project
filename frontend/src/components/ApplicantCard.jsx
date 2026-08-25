import React from 'react';
import { Mic, FileText, ArrowRight, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';

export default function ApplicantCard({ applicant, onSelectTrace }) {
  const status = applicant.pm_ajay_eligibility?.status || 'GIA Linked';
  
  const getBadgeStyle = (st) => {
    if (st === 'GIA Linked') {
      return 'bg-[#00ff66]/10 text-[#00ff66] border-[#00ff66]/30';
    } else if (st === 'RPL Track') {
      return 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/30';
    }
    return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
  };

  return (
    <div 
      onClick={() => onSelectTrace(applicant)}
      className="bg-[#0b0f19] border border-[#1f293d] hover:border-[#00e5ff] rounded-xl p-5 flex flex-col justify-between cursor-pointer transition-all duration-200 card-glow group"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-base text-slate-100 group-hover:text-[#00e5ff] transition">
              {applicant.name || 'Beneficiary'}
            </span>
            <span className="text-xs font-mono text-slate-400 border border-slate-700 px-1.5 py-0.5 rounded">
              #{applicant.applicant_id.slice(-4)}
            </span>
          </div>
          
          <div className="flex items-center gap-1 text-xs font-mono text-[#00e5ff]">
            <MapPin className="w-3.5 h-3.5" />
            <span>{applicant.district || 'G.B. Nagar'}</span>
          </div>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-lg p-3 text-xs text-slate-300 italic mb-4 flex items-start gap-2">
          <Mic className="w-4 h-4 text-[#00e5ff] shrink-0 mt-0.5" />
          <p>"{applicant.original_audio_intent}"</p>
        </div>

        <div className="space-y-1.5 text-xs text-slate-300 font-mono mb-4">
          <div className="flex justify-between border-b border-slate-800/80 pb-1">
            <span className="text-slate-400">Extracted Skill:</span>
            <span className="font-semibold text-slate-100">{applicant.extracted_skill}</span>
          </div>
          <div className="flex justify-between border-b border-slate-800/80 pb-1">
            <span className="text-slate-400">NSQF Role:</span>
            <span className="text-[#f59e0b] truncate max-w-[200px]">{applicant.nsqf_mapping?.role}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">PM-AJAY Grant:</span>
            <span className="text-[#00ff66] font-semibold">{applicant.pm_ajay_eligibility?.eligible_amount}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-[#1f293d] mt-2">
        <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md border ${getBadgeStyle(status)}`}>
          {status}
        </span>

        <button className="flex items-center gap-1.5 text-xs font-mono text-[#00e5ff] group-hover:translate-x-1 transition-transform">
          <span>RAG Trace</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
