import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import StudentResumeAnalyzer from './pages/StudentResumeAnalyzer';
import StudentProjectLab from './pages/StudentProjectLab';
import StudentRoadmap from './pages/StudentRoadmap';
import StudentResumeBuilder from './pages/StudentResumeBuilder';
import WorkerDashboard from './pages/WorkerDashboard';
import WorkerSkillDiscovery from './pages/WorkerSkillDiscovery';
import WorkerVoice from './pages/WorkerVoice';
import WorkerTelegram from './pages/WorkerTelegram';
import WorkerNewsroom from './pages/WorkerNewsroom';
import ATSChecker from './pages/ATSChecker';
import ResumeBuilder from './pages/ResumeBuilder';
import Schemes from './pages/Schemes';
import Newsroom from './pages/Newsroom';
import PrototypeViewer from './pages/PrototypeViewer';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Main Landing & Authentication */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Student Hub Routes */}
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/analyzer" element={<StudentResumeAnalyzer />} />
          <Route path="/student/projects" element={<StudentProjectLab />} />
          <Route path="/student/roadmap" element={<StudentRoadmap />} />
          <Route path="/student/builder" element={<StudentResumeBuilder />} />

          {/* Worker Studio Routes */}
          <Route path="/worker" element={<WorkerDashboard />} />
          <Route path="/worker/dashboard" element={<WorkerDashboard />} />
          <Route path="/worker/discovery" element={<WorkerSkillDiscovery />} />
          <Route path="/worker/voice" element={<WorkerVoice />} />
          <Route path="/worker/telegram" element={<WorkerTelegram />} />
          <Route path="/worker/newsroom" element={<WorkerNewsroom />} />

          {/* Direct Feature Routes */}
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/ats-checker" element={<ATSChecker />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/newsroom" element={<Newsroom />} />

          {/* Prototype Preview (accessible via /prototype) */}
          <Route path="/prototype" element={<PrototypeViewer />} />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
