import React, { useState } from 'react';
import { Send, Mic, Sparkles, CheckCircle2, ShieldCheck, ExternalLink, FileText } from 'lucide-react';

export default function WorkerChat() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Namaste! Main KARMAN hun. Aap bataiye aapko kis kaam me madad chahiye?',
      sources: null
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`/api/worker/skill-discovery?query=${encodeURIComponent(userMsg)}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [
          ...prev,
          {
            sender: 'bot',
            text: `I found a matching recognised trade for your skill: ${data.nsqf_mapping.role} (${data.nsqf_mapping.level}).`,
            sources: data
          }
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 font-sans bg-[#18121e] min-h-screen text-slate-100">
      
      {/* Header */}
      <div className="bg-[#241a2c] border border-[#3d2e49] p-6 rounded-2xl flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#79b473] mb-1">
            <Sparkles className="w-4 h-4" />
            <span>ASK KARMAN AI CHATBOT</span>
          </div>
          <h1 className="text-xl font-bold text-white">Ask KARMAN Anything</h1>
          <p className="text-xs text-slate-400 mt-1">
            Tell us what you do, what you need, or what you're looking for.
          </p>
        </div>
      </div>

      {/* Chat Messages Box */}
      <div className="bg-[#241a2c] border border-[#3d2e49] rounded-2xl p-6 min-h-[400px] flex flex-col justify-between space-y-4">
        
        <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2 font-sans text-xs">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-4 rounded-2xl max-w-[85%] space-y-2 ${m.sender === 'user' ? 'bg-[#79b473] text-[#18121e] font-bold font-mono' : 'bg-[#18121e] border border-[#3d2e49] text-slate-100'}`}>
                <p>{m.text}</p>

                {m.sources && (
                  <div className="bg-[#241a2c] border border-[#79b473]/40 p-3 rounded-xl space-y-2 font-mono text-[11px] text-slate-300">
                    <div className="text-[#79b473] font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Matched Scheme & Policy Rules:
                    </div>
                    <div>Scheme: {m.sources.pm_ajay_eligibility.grant_type}</div>
                    <div>Support: {m.sources.pm_ajay_eligibility.eligible_amount} Equipment Voucher</div>
                    <div className="text-[10px] text-slate-400 pt-1 border-t border-[#3d2e49]">
                      Source Document: {m.sources.pm_ajay_eligibility.source_document} (Page {m.sources.pm_ajay_eligibility.source_page})
                    </div>

                    <div className="flex gap-2 pt-1 font-bold">
                      <a href={m.sources.pm_ajay_eligibility.official_url} target="_blank" rel="noopener noreferrer" className="bg-[#79b473] text-[#18121e] px-2.5 py-1 rounded text-[10px]">
                        Check Eligibility ➔
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-slate-400 font-mono text-xs animate-pulse">KARMAN is finding relevant policy documents...</div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="flex gap-2 font-mono text-xs border-t border-[#3d2e49] pt-4">
          <input 
            type="text"
            placeholder="Type your message in Hindi or English (e.g. 'Mujhe silai aati hai')..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-[#18121e] border border-[#3d2e49] text-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:border-[#79b473]"
          />
          <button 
            type="submit"
            className="bg-[#79b473] hover:bg-[#68a062] text-[#18121e] font-bold px-6 py-3 rounded-xl transition flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </form>

      </div>

    </div>
  );
}
