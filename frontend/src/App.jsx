import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrototypeViewer from './pages/PrototypeViewer';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<PrototypeViewer />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
