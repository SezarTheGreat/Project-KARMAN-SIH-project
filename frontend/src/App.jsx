import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Applicant from './pages/Applicant';

export default function App() {
  const [isSimulateOpen, setIsSimulateOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-[#00e5ff] selection:text-slate-950">
        <Navbar onOpenSimulate={() => setIsSimulateOpen(true)} />
        <Routes>
          <Route path="/" element={<Dashboard isSimulateOpen={isSimulateOpen} setIsSimulateOpen={setIsSimulateOpen} />} />
          <Route path="/applicant/:id" element={<Applicant />} />
        </Routes>
      </div>
    </Router>
  );
}
