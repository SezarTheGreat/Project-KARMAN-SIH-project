import React, { useState } from 'react';
import { Search, Award, ShieldCheck, CheckCircle2, ArrowRight, BookOpen, FileText } from 'lucide-react';

export default function WorkerSkillDiscovery() {
  const [query, setQuery] = useState('silai');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/worker/skill-discovery?query=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        setResult(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 font-sans bg-[#18121e] min-h-screen text-slate-100">
      
      {/* Header */}
      <div className="bg-[#241a2c] border border-[#3d2e49] p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#79b473] mb-1">
            <Search className="w-4 h-4" />
            <span>INFORMAL TRADE & NSQF QUALIFICATION SEARCH</span>
          </div>
          <h1 className="text-xl font-bold text-white">Skill & Trade Discovery Engine</h1>
          <p className="text-xs text-slate-400 mt-1">
            Type your informal skill in Hindi, Bhojpuri, or English to discover your mapped NSQF Qualification Pack & Grant Pathways.
          </p>
        </div>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="flex gap-3 font-mono text-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input 
            type="text"
            placeholder="Type informal trade (e.g., 'silai', 'motorcycle repair', 'solar wiring')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#241a2c] border border-[#3d2e49] text-slate-100 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#79b473]"
            required
          />
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="bg-[#79b473] hover:bg-[#68a062] text-[#18121e] font-bold px-6 py-2.5 rounded-xl transition shadow-lg shadow-[#79b473]/20"
        >
          {loading ? 'Searching NSQF DB...' : 'Discover Pathways'}
        </button>
      </form>

      {/* Search Results */}
      {result && (
        <div className="space-y-6 font-sans">
          
          {/* Mapped NSQF Role Card */}
          <div className="bg-[#241a2c] border-2 border-[#79b473] p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center font-mono text-xs border-b border-[#3d2e49] pb-3">
              <span className="text-[#79b473] font-bold flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                MAPPED NSQF QUALIFICATION PACK
              </span>
              <span className="bg-[#79b473]/20 text-[#79b473] px-2 py-0.5 rounded border border-[#79b473]/30">
                {result.nsqf_mapping.level}
              </span>
            </div>

            <h3 className="text-xl font-extrabold text-white">{result.nsqf_mapping.role}</h3>
            
            <p className="text-xs text-slate-300">
              Extracted Skill Category: <strong>{result.extracted_skill}</strong>
            </p>
          </div>

          {/* 4 Connected Pathways Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
            
            <div className="bg-[#241a2c] border border-[#3d2e49] p-4 rounded-xl space-y-2">
              <div className="text-slate-400 text-[10px]">🪪 CERTIFICATION</div>
              <div className="font-bold text-white">Recognition of Prior Learning (RPL)</div>
              <p className="text-[10px] text-slate-400 font-sans">Fast-track 3 to 5 day trade assessment for uncertified workers.</p>
            </div>

            <div className="bg-[#241a2c] border border-[#3d2e49] p-4 rounded-xl space-y-2">
              <div className="text-slate-400 text-[10px]">💰 FINANCIAL AID</div>
              <div className="font-bold text-[#79b473]">{result.pm_ajay_eligibility.grant_type}</div>
              <p className="text-[10px] text-slate-400 font-sans">{result.pm_ajay_eligibility.eligible_amount} equipment voucher.</p>
            </div>

            <div className="bg-[#241a2c] border border-[#3d2e49] p-4 rounded-xl space-y-2">
              <div className="text-slate-400 text-[10px]">📚 SKILL TRAINING</div>
              <div className="font-bold text-[#70a37f]">PMKK & ITI Labs</div>
              <p className="text-[10px] text-slate-400 font-sans">Stipend-backed advanced equipment operation training.</p>
            </div>

            <div className="bg-[#241a2c] border border-[#3d2e49] p-4 rounded-xl space-y-2">
              <div className="text-slate-400 text-[10px]">📈 PROGRESSION</div>
              <div className="font-bold text-[#41658a]">Level 5 Supervisor</div>
              <p className="text-[10px] text-slate-400 font-sans">Career advancement to master craftsman & micro-unit owner.</p>
            </div>

          </div>

          {/* Official Document Citation Box */}
          <div className="bg-[#18121e] border border-[#3d2e49] p-4 rounded-xl font-mono text-xs space-y-2">
            <div className="text-[#79b473] font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              Verified Policy Citation:
            </div>
            <div className="text-slate-300">
              Source: {result.pm_ajay_eligibility.source_document} (Page {result.pm_ajay_eligibility.source_page})
            </div>
            <div className="text-slate-400 italic bg-[#241a2c] p-3 rounded border border-[#3d2e49] font-sans">
              "{result.pm_ajay_eligibility.rule_snippet}"
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
