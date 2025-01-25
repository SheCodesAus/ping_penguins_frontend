import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WorkshopPage from './pages/WorkshopPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/workshop" element={<WorkshopPage />} />
        {/* ... other routes */}
      </Routes>
    </Router>
  );
}

export default App; 