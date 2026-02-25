import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import DishEditor from './pages/DishEditor';
import CatererLayout from './layouts/CatererLayout';
import CatererDashboard from './pages/CatererDashboard';
import LoginPage from './pages/Login';
import SignUpPage from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import EmailVerificationPage from './pages/EmailVerification';
import RecipesListing from './pages/RecipesListing';
import RecipeDetailPage from './pages/RecipeDetail';
import RequestFoodPage from './pages/RequestFood';
import FoodRequestsPage from './pages/FoodRequests';
import FoodRequestDetailPage from './pages/FoodRequestDetail';
import DonateFoodPage from './pages/DonateFood';
import OffersManagementPage from './pages/OffersManagement';
import MenuManagement from './pages/MenuManagement';
import FindCaterersPage from './pages/FindCaterers';
import CatererProfilePage from './pages/CatererProfile';
import SavedCaterersPage from './pages/SavedCaterers';
import MyEnquiriesPage from './pages/MyEnquiries';
import EnquiryDetailPage from './pages/EnquiryDetail';
import MyProfilePage from './pages/MyProfile';
import CatererInboxPage from './pages/CatererEnquiries';
import CatererSettingsPage from './pages/CatererSettings';
import ContactSupportPage from './pages/ContactSupport';
import SupportTicketsPage from './pages/SupportTickets';
import TicketDetailPage from './pages/TicketDetail';
import HowItWorksPage from './pages/HowItWorks';
import GalleryManagementPage from './pages/GalleryManagement';
import ReviewsManagementPage from './pages/ReviewsManagement';
import ContentManagementPage from './pages/ContentManagement';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/verify-email" element={<EmailVerificationPage />} />
                <Route path="/recipes" element={<RecipesListing />} />
                <Route path="/recipes/:id" element={<RecipeDetailPage />} />
                <Route path="/request-food" element={<RequestFoodPage />} />
                <Route path="/donate-food" element={<DonateFoodPage />} />
                <Route path="/caterers" element={<FindCaterersPage />} />
                <Route path="/caterers/:id" element={<CatererProfilePage />} />
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="saved" element={<SavedCaterersPage />} />
                    <Route path="enquiries" element={<MyEnquiriesPage />} />
                    <Route path="enquiries/:id" element={<EnquiryDetailPage />} />
                    <Route path="profile" element={<MyProfilePage />} />
                    <Route path="support" element={<ContactSupportPage />} />
                    <Route path="tickets" element={<SupportTicketsPage />} />
                    <Route path="tickets/:id" element={<TicketDetailPage />} />
                </Route>
                <Route path="/caterer" element={<CatererLayout />}>
                    <Route index element={<CatererDashboard />} />
                    <Route path="requests" element={<FoodRequestsPage />} />
                    <Route path="requests/:id" element={<FoodRequestDetailPage />} />
                    <Route path="menus" element={<MenuManagement />} />
                    <Route path="menus/dish/new" element={<DishEditor />} />
                    <Route path="offers" element={<OffersManagementPage />} />
                    <Route path="enquiries" element={<CatererInboxPage />} />
                    <Route path="settings" element={<CatererSettingsPage />} />
                    <Route path="gallery" element={<GalleryManagementPage />} />
                    <Route path="reviews" element={<ReviewsManagementPage />} />
                    <Route path="content" element={<ContentManagementPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;

