import React from 'react';
import { Users, Award, CheckCircle2, AlertCircle } from 'lucide-react';

export default function KPICards({ applicants = [] }) {
  const total = applicants.length;
  const giaCount = applicants.filter(a => a.pm_ajay_eligibility?.status === 'GIA Linked').length;
  const rplCount = applicants.filter(a => a.nsqf_mapping?.rpl_recommended).length;
  const pendingCount = applicants.filter(a => a.pm_ajay_eligibility?.status === 'Clarification Needed').length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 pt-6 font-mono">
      <div className="bg-[#241a2c] border border-[#3d2e49] rounded-lg p-4 flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-400 font-sans">TOTAL INQUIRIES</div>
          <div className="text-2xl font-bold text-[#79b473] mt-1">{total}</div>
        </div>
        <Users className="w-8 h-8 text-[#79b473]/40" />
      </div>

      <div className="bg-[#241a2c] border border-[#3d2e49] rounded-lg p-4 flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-400 font-sans">NSQF MAPPED</div>
          <div className="text-2xl font-bold text-[#70a37f] mt-1">{rplCount}</div>
        </div>
        <Award className="w-8 h-8 text-[#70a37f]/40" />
      </div>

      <div className="bg-[#241a2c] border border-[#3d2e49] rounded-lg p-4 flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-400 font-sans">GIA LINKED</div>
          <div className="text-2xl font-bold text-[#79b473] mt-1">{giaCount}</div>
        </div>
        <CheckCircle2 className="w-8 h-8 text-[#79b473]/40" />
      </div>

      <div className="bg-[#241a2c] border border-[#3d2e49] rounded-lg p-4 flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-400 font-sans">PENDING REVIEW</div>
          <div className="text-2xl font-bold text-rose-400 mt-1">{pendingCount}</div>
        </div>
        <AlertCircle className="w-8 h-8 text-rose-400/40" />
      </div>
    </div>
  );
}
