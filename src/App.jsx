import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import WorkshopPage from './pages/WorkshopPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ErrorPage from './pages/ErrorPage';

console.log('App rendered');
console.log('PrivacyPolicyPage component:', PrivacyPolicyPage);

function App() {
  console.log('App rendering, PrivacyPolicyPage component:', PrivacyPolicyPage);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/workshop/:boardId" element={<WorkshopPage />} />
          <Route 
            path="/privacy" 
            element={
              PrivacyPolicyPage ? (
                <PrivacyPolicyPage />
              ) : (
                <>
                  {console.error('PrivacyPolicyPage component is undefined')}
                  <Navigate to="/error" replace />
                </>
              )
            } 
          />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 