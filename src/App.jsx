import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import CatererLayout from './layouts/CatererLayout';
import CatererDashboard from './pages/CatererDashboard';
import LoginPage from './pages/Login';
import SignUpPage from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import EmailVerificationPage from './pages/EmailVerification';
import RecipesListing from './pages/RecipesListing';
import RecipeDetailPage from './pages/RecipeDetail';
import MenuManagement from './pages/MenuManagement';
import DishEditor from './pages/DishEditor';
import RequestFoodPage from './pages/RequestFood';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/verify-email" element={<EmailVerificationPage />} />
                <Route path="/recipes" element={<RecipesListing />} />
                <Route path="/recipes/:id" element={<RecipeDetailPage />} />
                <Route path="/request-food" element={<RequestFoodPage />} />
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<Dashboard />} />
                </Route>
                <Route path="/caterer" element={<CatererLayout />}>
                    <Route index element={<CatererDashboard />} />
                    <Route path="menus" element={<MenuManagement />} />
                    <Route path="menus/dish/new" element={<DishEditor />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;

