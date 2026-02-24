import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import CatererLayout from './layouts/CatererLayout';
import CatererDashboard from './pages/CatererDashboard';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<Dashboard />} />
                </Route>
                <Route path="/caterer" element={<CatererLayout />}>
                    <Route index element={<CatererDashboard />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
