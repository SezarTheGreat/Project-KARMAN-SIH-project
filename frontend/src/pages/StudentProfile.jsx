import React, { useState } from 'react';
import { User, GraduationCap, Save, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function StudentProfile() {
  const { user } = useAuth();

  const [profile, setProfile] = useState({
    name: user?.name || 'Aarav Sharma',
    email: user?.identifier || 'aarav.sharma@college.edu',
    college: 'Delhi Technological University',
    degree: 'B.Tech',
    branch: 'Computer Science & Engineering',
    year: '3rd Year (Semester 6)',
    targetRole: 'ai_ml_engineer'
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 font-sans bg-[#18121e] min-h-screen text-slate-100">
      
      {/* Header */}
      <div className="bg-[#241a2c] border border-[#3d2e49] p-6 rounded-2xl flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#41658a] mb-1">
            <User className="w-4 h-4" />
            <span>STUDENT PROFILE & ACADEMIC SETTINGS</span>
          </div>
          <h1 className="text-xl font-bold text-white">Manage your career profile</h1>
          <p className="text-xs text-slate-400 mt-1">
            Update your academic details and target career role to customize recommendations.
          </p>
        </div>
      </div>

      {saved && (
        <div className="bg-[#79b473]/15 border border-[#79b473]/40 text-[#79b473] p-4 rounded-xl font-mono text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Student profile updated successfully!</span>
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSave} className="bg-[#241a2c] border border-[#3d2e49] p-6 rounded-2xl space-y-4 font-mono text-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-400 mb-1">Full Name:</label>
            <input 
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full bg-[#18121e] border border-[#3d2e49] rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#41658a]"
              required
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Email Address:</label>
            <input 
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full bg-[#18121e] border border-[#3d2e49] rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#41658a]"
              required
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">College / University:</label>
            <input 
              type="text"
              value={profile.college}
              onChange={(e) => setProfile({ ...profile, college: e.target.value })}
              className="w-full bg-[#18121e] border border-[#3d2e49] rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#41658a]"
              required
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Degree & Specialization:</label>
            <input 
              type="text"
              value={profile.branch}
              onChange={(e) => setProfile({ ...profile, branch: e.target.value })}
              className="w-full bg-[#18121e] border border-[#3d2e49] rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#41658a]"
              required
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Academic Year / Semester:</label>
            <input 
              type="text"
              value={profile.year}
              onChange={(e) => setProfile({ ...profile, year: e.target.value })}
              className="w-full bg-[#18121e] border border-[#3d2e49] rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-[#41658a]"
              required
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Target Career Role:</label>
            <select 
              value={profile.targetRole}
              onChange={(e) => setProfile({ ...profile, targetRole: e.target.value })}
              className="w-full bg-[#18121e] border border-[#41658a] text-[#41658a] font-bold rounded-xl px-3 py-2.5 focus:outline-none"
            >
              <option value="ai_ml_engineer">AI / ML Engineer</option>
              <option value="full_stack_developer">Full-Stack Developer</option>
              <option value="data_scientist">Data Scientist</option>
            </select>
          </div>
        </div>

        <button 
          type="submit"
          className="bg-[#41658a] hover:bg-[#345272] text-white font-bold px-6 py-2.5 rounded-xl transition font-mono flex items-center gap-2 shadow"
        >
          <Save className="w-4 h-4" />
          <span>Save Profile Settings</span>
        </button>
      </form>

    </div>
  );
}
