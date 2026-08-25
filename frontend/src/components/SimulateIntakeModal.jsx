import React, { useState } from 'react';
import { X, Send, Mic, Sparkles } from 'lucide-react';

export default function SimulateIntakeModal({ onClose, onIntakeCreated }) {
  const [name, setName] = useState('Meena Devi');
  const [phone, setPhone] = useState('919876543999');
  const [district, setDistrict] = useState('Gorakhpur');
  const [query, setQuery] = useState('Mujhe silai aati hai, machine ke liye loan chahiye.');
  const [loading, setLoading] = useState(false);

  const presets = [
    { label: "Tailoring & Sewing Machine", text: "Mujhe silai aati hai, machine ke liye loan chahiye.", name: "Meena Devi", dist: "Gorakhpur" },
    { label: "Two-Wheeler Mechanic RPL", text: "Informal motorcycle mechanic for 4 years, need trade certificate and toolkit grant.", name: "Suresh Yadav", dist: "Varanasi" },
    { label: "Solar Installation Skill", text: "Solar panel wiring seekhna hai aur equipment setup micro grant chahiye.", name: "Rajesh Singh", dist: "Lucknow" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/simulate-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phone,
          name: name,
          district: district,
          user_query: query
        })
      });
      if (res.ok) {
        const data = await res.json();
        onIntakeCreated(data);
        onClose();
      }
    } catch (err) {
      console.error("Simulation error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-[#0b0f19] border border-[#00e5ff] rounded-xl max-w-lg w-full p-6 relative font-sans text-slate-100 shadow-2xl">
        
        <div className="flex items-center justify-between border-b border-[#1f293d] pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#00e5ff]" />
            <h3 className="font-mono font-bold text-sm text-[#00e5ff]">SIMULATE WHATSAPP VOICE INTAKE</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-400 mb-4">
          Select a pre-filled beneficiary query scenario or type custom audio text to trigger live RAG vector search & PDF roadmap generation.
        </p>

        {/* Presets */}
        <div className="space-y-2 mb-4">
          <label className="text-[11px] font-mono text-slate-300">Quick Demo Scenarios:</label>
          <div className="grid grid-cols-1 gap-2">
            {presets.map((p, idx) => (
              <button 
                key={idx}
                type="button"
                onClick={() => { setQuery(p.text); setName(p.name); setDistrict(p.dist); }}
                className="text-left bg-[#111827] hover:bg-slate-800 border border-slate-800 p-2.5 rounded text-xs text-slate-200 transition"
              >
                <div className="font-semibold text-[#00e5ff]">{p.label}</div>
                <div className="text-[11px] text-slate-400 italic">"{p.text}"</div>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 font-mono text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">Beneficiary Name:</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#030712] border border-slate-700 rounded p-2 text-slate-100"
                required
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">District:</label>
              <input 
                type="text" 
                value={district} 
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-[#030712] border border-slate-700 rounded p-2 text-slate-100"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Beneficiary Audio Text Inquiry:</label>
            <textarea 
              rows="3" 
              value={query} 
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-[#030712] border border-slate-700 rounded p-2 text-slate-100 font-sans"
              required
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#00e5ff] hover:bg-[#00c4dc] text-slate-950 font-bold py-2.5 rounded-lg transition flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <span>Running RAG Pipeline & Generating PDF...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Process WhatsApp Intake & Generate PDF</span>
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
