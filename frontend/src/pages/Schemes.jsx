import React, { useState, useEffect } from 'react';
import { BookOpen, Search, ShieldCheck, ExternalLink, Award, FileText } from 'lucide-react';

export default function Schemes() {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/schemes')
      .then(res => res.json())
      .then(data => { setSchemes(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  const filteredSchemes = schemes.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.target_group.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 font-sans bg-[#18121e] min-h-screen text-slate-100">
      
      {/* Header Banner */}
      <div className="bg-[#241a2c] border border-[#3d2e49] p-6 rounded-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#79b473] mb-1">
            <BookOpen className="w-4 h-4" />
            <span>CENTRAL & STATE POLICY REPOSITORY</span>
          </div>
          <h1 className="text-xl font-bold text-slate-100">PM-AJAY & Government Schemes Directory</h1>
          <p className="text-xs text-slate-400 mt-1">
            Verified policy guidelines integrated directly into the Project KARMAN RAG Vector Database.
          </p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input 
            type="text"
            placeholder="Search scheme or trade..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#18121e] border border-[#3d2e49] text-xs text-slate-100 rounded-lg pl-9 pr-3 py-2 w-64 focus:outline-none focus:border-[#79b473] font-mono"
          />
        </div>
      </div>

      {/* Schemes Grid */}
      {loading ? (
        <div className="text-center py-12 font-mono text-xs text-slate-400">Loading Policy Directory...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-sans">
          {filteredSchemes.map((scheme) => (
            <div key={scheme.id} className="bg-[#241a2c] border border-[#3d2e49] hover:border-[#79b473] rounded-xl p-5 flex flex-col justify-between transition-all duration-200 group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono text-[#70a37f] border border-[#70a37f]/30 bg-[#70a37f]/10 px-2 py-0.5 rounded">
                    {scheme.grant_range}
                  </span>
                  <FileText className="w-4 h-4 text-slate-500 group-hover:text-[#79b473] transition" />
                </div>

                <h3 className="font-bold text-sm text-slate-100 group-hover:text-[#79b473] transition mb-2">
                  {scheme.name}
                </h3>
                
                <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                  {scheme.summary}
                </p>

                <div className="bg-[#18121e] border border-[#3d2e49] p-3 rounded-lg text-xs space-y-1.5 font-mono mb-4">
                  <div className="text-slate-300">
                    <span className="text-slate-500">Ministry:</span> {scheme.ministry}
                  </div>
                  <div className="text-slate-300">
                    <span className="text-slate-500">Target Group:</span> {scheme.target_group}
                  </div>
                  <div className="text-[#79b473]">
                    <span className="text-slate-500">Policy Doc:</span> {scheme.policy_source}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#3d2e49] flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Vector Indexed</span>
                <span className="text-[#79b473] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Full Policy <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
