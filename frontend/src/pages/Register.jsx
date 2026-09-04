import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Wrench, ShieldCheck, Mail, Phone, Lock, User, MapPin, Sparkles, ArrowRight } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('student'); // 'student', 'worker', 'officer'
  const [name, setName] = useState('Sunita Devi');
  const [identifier, setIdentifier] = useState('sunita@karman.gov.in');
  const [phone, setPhone] = useState('919876543210');
  const [district, setDistrict] = useState('G.B. Nagar');
  const [targetTrade, setTargetTrade] = useState('Tailoring');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_type: userType,
          name: name,
          identifier: identifier,
          phone: phone,
          district: district,
          target_trade: targetTrade,
          password: password
        })
      });
      if (res.ok) {
        const data = await res.json();
        navigate(data.redirect_url);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#18121e] flex items-center justify-center p-6 font-sans text-slate-100 selection:bg-[#79b473] selection:text-[#18121e]">
      <div className="bg-[#241a2c] border border-[#3d2e49] rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-[#79b473]/15 border border-[#79b473]/40 text-[#79b473] mb-1">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">Create Your KARMAN Profile</h1>
          <p className="text-xs text-slate-400">Join India's AI-driven skill recognition & opportunity platform.</p>
        </div>

        {/* User Role Switcher Tabs */}
        <div className="grid grid-cols-3 gap-1.5 bg-[#18121e] p-1.5 rounded-xl border border-[#3d2e49] font-mono text-[11px]">
          <button
            type="button"
            onClick={() => { setUserType('student'); setIdentifier('student@karman.gov.in'); }}
            className={`py-2 rounded-lg font-bold flex flex-col items-center gap-1 transition ${userType === 'student' ? 'bg-[#41658a] text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Student</span>
          </button>

          <button
            type="button"
            onClick={() => { setUserType('worker'); setIdentifier('919876543210'); }}
            className={`py-2 rounded-lg font-bold flex flex-col items-center gap-1 transition ${userType === 'worker' ? 'bg-[#79b473] text-[#18121e] shadow' : 'text-slate-400 hover:text-white'}`}
          >
            <Wrench className="w-4 h-4" />
            <span>Worker</span>
          </button>

          <button
            type="button"
            onClick={() => { setUserType('officer'); setIdentifier('OFFICER-7892'); }}
            className={`py-2 rounded-lg font-bold flex flex-col items-center gap-1 transition ${userType === 'officer' ? 'bg-[#4c3957] text-[#79b473] border border-[#79b473]/30 shadow' : 'text-slate-400 hover:text-white'}`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Officer</span>
          </button>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-3.5 font-mono text-xs">
          
          <div>
            <label className="block text-slate-400 mb-1">Full Name:</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#18121e] border border-[#3d2e49] rounded-xl pl-9 pr-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#79b473]"
                required
              />
            </div>
          </div>

          {userType === 'student' && (
            <>
              <div>
                <label className="block text-slate-400 mb-1">Email Address:</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input 
                    type="email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full bg-[#18121e] border border-[#3d2e49] rounded-xl pl-9 pr-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#41658a]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Target Career Role:</label>
                <select 
                  value={targetTrade}
                  onChange={(e) => setTargetTrade(e.target.value)}
                  className="w-full bg-[#18121e] border border-[#3d2e49] rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#41658a]"
                >
                  <option value="AI / ML Engineer">AI / ML Engineer</option>
                  <option value="Full-Stack Developer">Full-Stack Developer</option>
                  <option value="Data Scientist">Data Scientist</option>
                </select>
              </div>
            </>
          )}

          {userType === 'worker' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Mobile Contact:</label>
                  <input 
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#18121e] border border-[#3d2e49] rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#79b473]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">District:</label>
                  <input 
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-[#18121e] border border-[#3d2e49] rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#79b473]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Primary Skill / Trade:</label>
                <input 
                  type="text"
                  value={targetTrade}
                  onChange={(e) => setTargetTrade(e.target.value)}
                  className="w-full bg-[#18121e] border border-[#3d2e49] rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#79b473]"
                  placeholder="e.g. Tailoring, Automotive Mechanic, Solar"
                  required
                />
              </div>
            </>
          )}

          {userType === 'officer' && (
            <>
              <div>
                <label className="block text-slate-400 mb-1">Department Security ID:</label>
                <input 
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-[#18121e] border border-[#3d2e49] rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#79b473]"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Assigned Command District:</label>
                <input 
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-[#18121e] border border-[#3d2e49] rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#79b473]"
                  required
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-slate-400 mb-1">Password:</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#18121e] border border-[#3d2e49] rounded-xl pl-9 pr-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#79b473]"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className={`w-full font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg text-xs font-mono mt-3 ${userType === 'student' ? 'bg-[#41658a] hover:bg-[#345272] text-white shadow-[#41658a]/20' : 'bg-[#79b473] hover:bg-[#68a062] text-[#18121e] shadow-[#79b473]/20'}`}
          >
            {loading ? (
              <span>Creating Profile...</span>
            ) : (
              <>
                <span>Complete Registration</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

        </form>

        {/* Bottom Login Link */}
        <div className="text-center font-mono text-xs text-slate-400 pt-2 border-t border-[#3d2e49]">
          Already registered?{' '}
          <Link to="/login" className="text-[#79b473] font-bold hover:underline">
            Sign In Here ➔
          </Link>
        </div>

      </div>
    </div>
  );
}
