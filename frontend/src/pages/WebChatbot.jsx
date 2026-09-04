import React, { useState } from 'react';
import { MessageSquare, Send, Mic, Download, ShieldCheck, Search, Sparkles, Bot, User } from 'lucide-react';

export default function WebChatbot() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Namaste! I am KARMAN AI. Tell me about your skill or inquiry (e.g., "Mujhe silai aati hai, machine ke liye loan chahiye") in text or voice.',
      result: null
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = async (queryText) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    const userMsg = { sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/simulate-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: '919876543210',
          name: 'Web Beneficiary',
          district: 'Web Command Hub',
          user_query: textToSend
        })
      });

      if (res.ok) {
        const data = await res.json();
        const botReply = {
          sender: 'bot',
          text: `Namaste! I analyzed your inquiry for "${data.extracted_skill}". You qualify for ${data.pm_ajay_eligibility.grant_type} under ${data.nsqf_mapping.level}.`,
          result: data
        };
        setMessages(prev => [...prev, botReply]);
      }
    } catch (err) {
      console.error("Chat error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMicClick = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setInput('Mujhe silai aati hai, machine ke liye loan chahiye.');
    }, 1500);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 bg-[#18121e] min-h-screen text-slate-100 font-sans">
      
      {/* Header */}
      <div className="bg-[#241a2c] border border-[#3d2e49] p-5 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#79b473]/15 border border-[#79b473]/30 p-2.5 rounded-lg text-[#79b473]">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-mono font-bold text-base text-[#79b473]">PROJECT KARMAN • WEB AI ASSISTANT</h1>
            <p className="text-xs text-slate-400">Interactive RAG Voice/Text Agent for Beneficiaries & Field Officers</p>
          </div>
        </div>
      </div>

      {/* Chat Window */}
      <div className="bg-[#241a2c] border border-[#3d2e49] rounded-xl p-5 flex flex-col h-[520px] justify-between">
        
        {/* Messages Feed */}
        <div className="overflow-y-auto space-y-4 pr-2 font-sans text-xs">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              
              {msg.sender === 'bot' && (
                <div className="w-7 h-7 rounded-lg bg-[#79b473]/20 border border-[#79b473]/40 text-[#79b473] flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-xl rounded-xl p-4 ${msg.sender === 'user' ? 'bg-[#79b473] text-[#18121e] font-semibold' : 'bg-[#18121e] border border-[#3d2e49] text-slate-200 space-y-3'}`}>
                <p className="leading-relaxed">{msg.text}</p>

                {/* Inline RAG Result Card if Bot Reply */}
                {msg.result && (
                  <div className="bg-[#241a2c] border border-[#79b473]/30 rounded-lg p-3 space-y-2 font-mono text-[11px]">
                    <div className="flex justify-between items-center border-b border-[#3d2e49] pb-1.5">
                      <span className="text-[#79b473] font-semibold flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        RAG Evidence Trace
                      </span>
                      <span className="bg-[#79b473]/20 text-[#79b473] px-1.5 py-0.5 rounded text-[10px]">
                        Score: {msg.result.pm_ajay_eligibility.similarity_score}
                      </span>
                    </div>

                    <div className="text-slate-300">
                      <strong>Policy:</strong> {msg.result.pm_ajay_eligibility.source_document} (Page {msg.result.pm_ajay_eligibility.source_page})
                    </div>
                    
                    <div className="text-slate-400 italic bg-[#18121e] p-2 rounded border border-[#3d2e49]">
                      "{msg.result.pm_ajay_eligibility.rule_snippet}"
                    </div>

                    <a 
                      href={msg.result.generated_pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[#79b473] hover:underline pt-1"
                    >
                      <Download className="w-3.5 h-3.5" /> Download Generated PDF Roadmap
                    </a>
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-[#414073] border border-[#79b473]/40 text-[#79b473] flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}

            </div>
          ))}

          {loading && (
            <div className="text-[#79b473] font-mono text-xs animate-pulse pl-10">
              KARMAN AI is performing RAG vector search & generating PDF roadmap...
            </div>
          )}
        </div>

        {/* Input Controls */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="pt-4 border-t border-[#3d2e49] flex items-center gap-2">
          
          <button 
            type="button"
            onClick={handleMicClick}
            className={`p-2.5 rounded-lg border transition ${isRecording ? 'bg-rose-500/20 text-rose-400 border-rose-500 animate-pulse' : 'bg-[#18121e] text-slate-300 border-[#3d2e49] hover:text-white'}`}
            title="Simulate Voice Input"
          >
            <Mic className="w-4 h-4" />
          </button>

          <input 
            type="text"
            placeholder="Ask KARMAN AI about your skill or PM-AJAY rules..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-[#18121e] border border-[#3d2e49] rounded-lg px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-[#79b473] font-sans"
          />

          <button 
            type="submit"
            disabled={loading}
            className="bg-[#79b473] hover:bg-[#68a062] text-[#18121e] font-bold px-4 py-2.5 rounded-lg transition text-xs font-mono flex items-center gap-1.5 shadow-lg shadow-[#79b473]/20"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>

        </form>

      </div>

    </div>
  );
}
