import React, { useState, useEffect } from 'react';
import KPICards from '../components/KPICards';
import ApplicantCard from '../components/ApplicantCard';
import RAGTraceModal from '../components/RAGTraceModal';
import SimulateIntakeModal from '../components/SimulateIntakeModal';
import { Search, Filter, RefreshCw } from 'lucide-react';

export default function Dashboard({ isSimulateOpen, setIsSimulateOpen }) {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const fetchApplicants = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/applicants');
      if (res.ok) {
        const data = await res.json();
        setApplicants(data);
      }
    } catch (err) {
      console.error("Failed to fetch applicants:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleIntakeCreated = (newApplicant) => {
    fetchApplicants();
    setSelectedApplicant(newApplicant);
  };

  const filteredApplicants = applicants.filter(app => {
    const matchesSearch = 
      app.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.extracted_skill?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.district?.toLowerCase().includes(searchQuery.toLowerCase());
      
    if (statusFilter === 'ALL') return matchesSearch;
    return matchesSearch && app.pm_ajay_eligibility?.status === statusFilter;
  });

  return (
    <div className="min-h-screen bg-[#18121e] text-slate-100 pb-12 font-sans">
      {/* KPI Section */}
      <KPICards applicants={applicants} />

      {/* Main Command Center Grid */}
      <main className="px-6 mt-6">
        
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-[#241a2c] border border-[#3d2e49] p-4 rounded-xl mb-6">
          <div>
            <h2 className="font-mono font-bold text-sm text-[#79b473] flex items-center gap-2">
              DISTRICT COMMAND CENTER • LIVE INTAKE STREAM
            </h2>
            <p className="text-xs text-slate-400">Real-time NSQF Skill Mapping & PM-AJAY Grant Verification</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input 
                type="text"
                placeholder="Search applicant or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#18121e] border border-[#3d2e49] text-xs text-slate-100 rounded-lg pl-9 pr-3 py-2 w-56 focus:outline-none focus:border-[#79b473]"
              />
            </div>

            {/* Filter Dropdown */}
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#18121e] border border-[#3d2e49] text-xs text-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#79b473] font-mono"
            >
              <option value="ALL">All Statuses</option>
              <option value="GIA Linked">GIA Linked</option>
              <option value="RPL Track">RPL Track</option>
              <option value="Clarification Needed">Clarification Needed</option>
            </select>

            {/* Refresh Button */}
            <button 
              onClick={fetchApplicants}
              className="p-2 bg-[#18121e] hover:bg-[#3d2e49] border border-[#3d2e49] text-slate-300 rounded-lg transition"
              title="Refresh Stream"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Applicant Cards Masonry Grid */}
        {loading ? (
          <div className="text-center py-16 font-mono text-sm text-slate-400">
            Loading Live Beneficiary Stream...
          </div>
        ) : filteredApplicants.length === 0 ? (
          <div className="text-center py-16 bg-[#241a2c] border border-[#3d2e49] rounded-xl font-mono text-xs text-slate-400">
            No applicants found matching filter criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredApplicants.map((applicant) => (
              <ApplicantCard 
                key={applicant.applicant_id}
                applicant={applicant}
                onSelectTrace={(app) => setSelectedApplicant(app)}
              />
            ))}
          </div>
        )}

      </main>

      {/* RAG Trace Zero-Hallucination Modal */}
      {selectedApplicant && (
        <RAGTraceModal 
          applicant={selectedApplicant}
          onClose={() => setSelectedApplicant(null)}
        />
      )}

      {/* Simulate Intake Modal */}
      {isSimulateOpen && (
        <SimulateIntakeModal 
          onClose={() => setIsSimulateOpen(false)}
          onIntakeCreated={handleIntakeCreated}
        />
      )}
    </div>
  );
}
