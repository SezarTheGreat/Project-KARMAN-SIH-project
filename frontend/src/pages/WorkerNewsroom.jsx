import React, { useState, useEffect } from 'react';
import { BookOpen, ExternalLink, FileText, Filter, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function WorkerNewsroom() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'New Schemes', 'Skill Training', 'Certification', 'Financial Support'];

  useEffect(() => {
    fetch('/api/worker/newsroom')
      .then(res => res.json())
      .then(data => { setNews(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  const filteredNews = news.filter(item => 
    activeCategory === 'All' || item.category.toLowerCase() === activeCategory.toLowerCase()
  );

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 font-sans bg-[#18121e] min-h-screen text-slate-100">
      
      {/* Header Banner */}
      <div className="bg-[#241a2c] border border-[#3d2e49] p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-rose-500 font-bold mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
            <span>LIVE SCHEME NEWSROOM & POLICY FEED</span>
          </div>
          <h1 className="text-2xl font-black text-white">Government Schemes & Policy Newsroom</h1>
          <p className="text-xs text-slate-400 mt-1">
            Official government scheme updates, skill training programs, and grant allocations — collected and verified in one place.
          </p>
        </div>

        <div className="bg-[#18121e] border border-[#3d2e49] p-3 rounded-xl font-mono text-xs text-right">
          <div className="text-[#79b473] font-bold">3 NEW UPDATES</div>
          <div className="text-[10px] text-slate-400">Last checked today</div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
        <span className="text-slate-400 mr-2 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Category:
        </span>
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg border transition ${activeCategory === cat ? 'bg-[#79b473] text-[#18121e] font-bold border-[#79b473]' : 'bg-[#241a2c] text-slate-300 border-[#3d2e49] hover:border-[#79b473]'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* News Cards */}
      {loading ? (
        <div className="text-center py-16 font-mono text-xs text-slate-400">Loading Scheme Newsroom Feed...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredNews.map((item) => (
            <div key={item.id} className="bg-[#241a2c] border border-[#3d2e49] hover:border-[#79b473] rounded-2xl p-6 flex flex-col justify-between space-y-4 transition">
              <div className="space-y-3">
                <div className="flex justify-between items-center font-mono text-xs">
                  <span className="bg-[#79b473]/15 text-[#79b473] border border-[#79b473]/30 px-2.5 py-0.5 rounded-full font-bold">
                    {item.badge}
                  </span>
                  <span className="text-slate-400">{item.category}</span>
                </div>

                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{item.summary}</p>
                
                <div className="text-xs font-mono text-slate-400">
                  <strong>Relevant to:</strong> {item.relevant_to}
                </div>
              </div>

              {/* Official Source Layer */}
              <div className="bg-[#18121e] border border-[#79b473]/40 p-3.5 rounded-xl font-mono text-xs space-y-1.5">
                <div className="text-[#79b473] font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Official Policy Citation Layer:
                </div>
                <div className="text-slate-300">
                  <span className="text-slate-500">Document:</span> {item.source_document} (Page {item.source_page})
                </div>
                <div className="text-slate-400 text-[11px]">
                  <span className="text-slate-500">Updated:</span> {item.last_updated}
                </div>
                <a 
                  href={item.official_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#79b473] hover:underline flex items-center gap-1 pt-1 font-bold"
                >
                  <span>Visit Official Government Source</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
