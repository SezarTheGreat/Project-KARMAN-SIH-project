import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Wrench, ShieldCheck, Lock, Mail, Phone, Key, ArrowRight, Sparkles } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('student'); // 'student', 'worker', 'officer'
  const [identifier, setIdentifier] = useState('student@karman.gov.in');
  const [password, setPassword] = useState('password123');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_type: userType,
          identifier: identifier,
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

  const handleSendOtp = () => {
    setOtpSent(true);
  };

  return (
    <div className="min-h-screen bg-[#18121e] flex items-center justify-center p-6 font-sans text-slate-100 selection:bg-[#79b473] selection:text-[#18121e]">
      <div className="bg-[#241a2c] border border-[#3d2e49] rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-[#79b473]/15 border border-[#79b473]/40 text-[#79b473] mb-1">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">Welcome Back to KARMAN</h1>
          <p className="text-xs text-slate-400">Select your account type to access your tailored workspace.</p>
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

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 font-mono text-xs">
          
          {userType === 'student' && (
            <>
              <div>
                <label className="block text-slate-400 mb-1">Student Email:</label>
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
                <label className="block text-slate-400 mb-1">Password:</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#18121e] border border-[#3d2e49] rounded-xl pl-9 pr-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#41658a]"
                    required
                  />
                </div>
              </div>
            </>
          )}

          {userType === 'worker' && (
            <>
              <div>
                <label className="block text-slate-400 mb-1">Mobile Phone Number:</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input 
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full bg-[#18121e] border border-[#3d2e49] rounded-xl pl-9 pr-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#79b473]"
                    required
                  />
                </div>
              </div>

              {otpSent ? (
                <div>
                  <label className="block text-slate-400 mb-1">Enter 6-Digit OTP:</label>
                  <input 
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full bg-[#18121e] border border-[#79b473] rounded-xl px-3 py-2.5 text-slate-100 text-center tracking-widest font-bold focus:outline-none"
                    required
                  />
                </div>
              ) : (
                <button 
                  type="button" 
                  onClick={handleSendOtp}
                  className="w-full bg-[#18121e] hover:bg-[#3d2e49] border border-[#79b473]/40 text-[#79b473] font-bold py-2 rounded-xl text-center"
                >
                  Send OTP to Mobile
                </button>
              )}
            </>
          )}

          {userType === 'officer' && (
            <>
              <div>
                <label className="block text-slate-400 mb-1">Field Officer Security ID:</label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input 
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full bg-[#18121e] border border-[#3d2e49] rounded-xl pl-9 pr-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#79b473]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Security Access Key:</label>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#18121e] border border-[#3d2e49] rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#79b473]"
                  required
                />
              </div>
            </>
          )}

          <button 
            type="submit"
            disabled={loading}
            className={`w-full font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg text-xs font-mono mt-2 ${userType === 'student' ? 'bg-[#41658a] hover:bg-[#345272] text-white shadow-[#41658a]/20' : 'bg-[#79b473] hover:bg-[#68a062] text-[#18121e] shadow-[#79b473]/20'}`}
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

        </form>

        {/* Bottom Signup Link */}
        <div className="text-center font-mono text-xs text-slate-400 pt-2 border-t border-[#3d2e49]">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-[#79b473] font-bold hover:underline">
            Register Here ➔
          </Link>
        </div>

      </div>
    </div>
  );
}
