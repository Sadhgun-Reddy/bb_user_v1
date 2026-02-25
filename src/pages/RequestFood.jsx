import React, { useState } from 'react';
import { User, MapPin, AlertCircle, Calendar, Clock, Phone, ChevronRight, ChevronLeft, Check, AlertTriangle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// 1. Wizard Progress Component
const WizardProgress = ({ currentStep }) => {
    const steps = [
        { num: 1, label: 'Submit Details' },
        { num: 2, label: 'Verification' },
        { num: 3, label: 'Delivery' }
    ];

    return (
        <div className="flex items-center justify-between mb-12 relative px-2">
            {/* Background Line */}
            <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-stone-100 rounded-full z-0"></div>

            {/* Active Line Fill */}
            <div
                className="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-[#ef9d2a] rounded-full z-0 transition-all duration-500 ease-in-out"
                style={{ width: `calc(${((currentStep - 1) / (steps.length - 1)) * 100}% - 3rem)` }}
            ></div>

            {/* Step Indicators */}
            {steps.map((step) => (
                <div key={step.num} className="relative z-10 flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base transition-all duration-300 ${currentStep >= step.num
                            ? 'bg-[#ef9d2a] text-white shadow-lg shadow-orange-500/30 ring-4 ring-white'
                            : 'bg-white border-2 border-stone-200 text-stone-400'
                        }`}>
                        {currentStep > step.num ? <Check className="w-6 h-6" strokeWidth={3} /> : step.num}
                    </div>
                    <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider absolute -bottom-7 w-max transition-colors ${currentStep >= step.num ? 'text-[#ef9d2a]' : 'text-stone-400'
                        }`}>
                        {step.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

// 2. Step 1: Details
const Step1Details = ({ formData, setFormData, onNext }) => {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-black text-stone-900 tracking-tight">Food Assistance Request</h2>
                <p className="text-stone-500 mt-2 font-medium text-lg">We connect community kitchens with those in need. Tell us how we can help.</p>
            </div>

            <div className="space-y-2">
                <label className="ml-1 text-sm font-bold text-stone-700">Number of People</label>
                <div className="relative">
                    <input
                        type="number"
                        min="1"
                        value={formData.guestCount}
                        onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                        placeholder="E.g., 50"
                        className="w-full rounded-full border-stone-200 bg-stone-50 px-6 py-4 pl-12 font-bold text-lg text-stone-900 placeholder:text-stone-400 focus:border-[#ef9d2a] focus:ring-[#ef9d2a] outline-none transition-all"
                    />
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="ml-1 text-sm font-bold text-stone-700">Current Address / Location</label>
                <div className="relative">
                    <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Enter full address or landmark"
                        className="w-full rounded-full border-stone-200 bg-stone-50 px-6 py-4 pl-12 font-bold text-lg text-stone-900 placeholder:text-stone-400 focus:border-[#ef9d2a] focus:ring-[#ef9d2a] outline-none transition-all"
                    />
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                </div>
            </div>

            <div className="space-y-3 pt-2">
                <label className="ml-1 text-sm font-bold text-stone-700 flex items-center gap-2">
                    Urgency Level
                    <AlertCircle className="w-4 h-4 text-stone-400" />
                </label>
                <div className="flex bg-stone-50 p-1.5 rounded-full border border-stone-100">
                    {['Standard', 'Urgent', 'Critical'].map((level) => (
                        <button
                            key={level}
                            type="button"
                            onClick={() => setFormData({ ...formData, urgency: level })}
                            className={`flex-1 py-3.5 rounded-full text-sm font-bold transition-all ${formData.urgency === level
                                    ? level === 'Critical'
                                        ? 'bg-red-500 text-white shadow-md'
                                        : 'bg-[#ef9d2a] text-white shadow-md'
                                    : 'text-stone-500 hover:text-stone-700'
                                }`}
                        >
                            {level}
                        </button>
                    ))}
                </div>
                {/* Optional Helper Text for Critical */}
                {formData.urgency === 'Critical' && (
                    <div className="flex items-start gap-2 text-red-600 bg-red-50 p-4 rounded-[1.5rem] text-sm font-medium mt-3 animate-fade-in border border-red-100">
                        <AlertTriangle className="w-5 h-5 shrink-0" />
                        <p>We will try to prioritize this request and notify nearby partners immediately. Expect a faster callback.</p>
                    </div>
                )}
            </div>

            <div className="space-y-2 pt-2">
                <label className="ml-1 text-sm font-bold text-stone-700">Dietary Restrictions or Notes (Optional)</label>
                <textarea
                    rows="4"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Any specific dietary needs, allergies, or instructions for the kitchen..."
                    className="w-full resize-none rounded-3xl border-stone-200 bg-stone-50 px-6 py-5 font-medium text-stone-900 placeholder:text-stone-400 focus:border-[#ef9d2a] focus:ring-[#ef9d2a] outline-none transition-all"
                />
            </div>

            <div className="pt-6">
                <button
                    onClick={onNext}
                    disabled={!formData.guestCount || !formData.location}
                    className="group w-full flex items-center justify-center gap-2 rounded-full bg-[#ef9d2a] px-8 py-5 text-lg font-bold text-white shadow-xl shadow-orange-500/25 transition-all hover:bg-[#d98a1e] active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                    Continue to Verification
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                </button>
            </div>
        </div>
    );
};

// 3. Step 2: Verification
const Step2Verification = ({ formData, setFormData, onNext, onBack }) => {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-black text-stone-900 tracking-tight">Identity Verification</h2>
                <p className="text-stone-500 mt-2 font-medium text-lg">Please provide your contact info so we can coordinate the pickup/delivery.</p>
            </div>

            <div className="space-y-2">
                <label className="ml-1 text-sm font-bold text-stone-700">Full Name</label>
                <div className="relative">
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full rounded-full border-stone-200 bg-stone-50 px-6 py-4 pl-12 font-bold text-lg text-stone-900 placeholder:text-stone-400 focus:border-[#ef9d2a] focus:ring-[#ef9d2a] outline-none transition-all"
                    />
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="ml-1 text-sm font-bold text-stone-700">Phone Number</label>
                <div className="relative">
                    <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Your contact number"
                        className="w-full rounded-full border-stone-200 bg-stone-50 px-6 py-4 pl-12 font-bold text-lg text-stone-900 placeholder:text-stone-400 focus:border-[#ef9d2a] focus:ring-[#ef9d2a] outline-none transition-all"
                    />
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                </div>
            </div>

            <div className="bg-[#ef9d2a]/5 border border-[#ef9d2a]/20 rounded-3xl p-6 mt-4">
                <h4 className="font-bold text-[#b57315] mb-1 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Why do we need this?
                </h4>
                <p className="text-sm font-medium text-[#b57315]/80">
                    Our partner kitchens will use this number to verify the request details and coordinate logistics directly with you.
                </p>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <button
                    onClick={onBack}
                    className="flex-1 flex items-center justify-center gap-2 rounded-full border-2 border-stone-200 bg-transparent px-8 py-4.5 text-lg font-bold text-stone-600 transition-all hover:bg-stone-50 hover:border-stone-300"
                >
                    <ChevronLeft className="w-5 h-5" strokeWidth={3} />
                    Back
                </button>
                <button
                    onClick={onNext}
                    disabled={!formData.name || !formData.phone}
                    className="flex-[2] flex items-center justify-center gap-2 rounded-full bg-[#ef9d2a] px-8 py-4.5 text-lg font-bold text-white shadow-xl shadow-orange-500/25 transition-all hover:bg-[#d98a1e] active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer group"
                >
                    Verify & Continue
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                </button>
            </div>
        </div>
    );
};

// 4. Step 3: Delivery
const Step3Delivery = ({ formData, setFormData, onSubmit, onBack }) => {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-black text-stone-900 tracking-tight">Delivery Scheduling</h2>
                <p className="text-stone-500 mt-2 font-medium text-lg">When exactly do you need the assistance?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="ml-1 text-sm font-bold text-stone-700">Required Date</label>
                    <div className="relative">
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full appearance-none rounded-full border-stone-200 bg-stone-50 px-6 py-4 pl-12 font-bold text-lg text-stone-900 focus:border-[#ef9d2a] focus:ring-[#ef9d2a] outline-none transition-all"
                        />
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 pointer-events-none" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="ml-1 text-sm font-bold text-stone-700">Required Time</label>
                    <div className="relative">
                        <input
                            type="time"
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            className="w-full appearance-none rounded-full border-stone-200 bg-stone-50 px-6 py-4 pl-12 font-bold text-lg text-stone-900 focus:border-[#ef9d2a] focus:ring-[#ef9d2a] outline-none transition-all"
                        />
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Request Summary */}
            <div className="bg-stone-50 rounded-[1.5rem] p-6 border border-stone-200 mt-8">
                <h4 className="font-bold text-stone-900 mb-3 flex items-center gap-2">
                    <Check className="w-5 h-5 text-[#ef9d2a]" />
                    Request Summary
                </h4>
                <ul className="space-y-3 text-sm text-stone-600 font-medium">
                    <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ef9d2a] mt-1.5 shrink-0"></span>
                        <span><strong className="text-stone-900">For:</strong> {formData.guestCount || '0'} People ({formData.urgency} Urgency)</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ef9d2a] mt-1.5 shrink-0"></span>
                        <span><strong className="text-stone-900">To:</strong> {formData.location || 'Not provided'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ef9d2a] mt-1.5 shrink-0"></span>
                        <span><strong className="text-stone-900">By:</strong> {formData.name || 'Not provided'} ({formData.phone || 'N/A'})</span>
                    </li>
                </ul>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <button
                    onClick={onBack}
                    className="flex-1 flex items-center justify-center gap-2 rounded-full border-2 border-stone-200 bg-transparent px-8 py-4.5 text-lg font-bold text-stone-600 transition-all hover:bg-stone-50 hover:border-stone-300"
                >
                    <ChevronLeft className="w-5 h-5" strokeWidth={3} />
                    Back
                </button>
                <button
                    onClick={onSubmit}
                    disabled={!formData.date || !formData.time}
                    className="flex-[2] flex items-center justify-center gap-2 rounded-full bg-[#ef9d2a] px-8 py-4.5 text-lg font-bold text-white shadow-xl shadow-orange-500/25 transition-all hover:bg-[#d98a1e] active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                    <Check className="w-5 h-5" strokeWidth={3} />
                    Submit Request
                </button>
            </div>
        </div>
    );
};

// 5. Main Component
export default function RequestFoodPage() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        guestCount: '',
        location: '',
        urgency: 'Standard',
        notes: '',
        name: '',
        phone: '',
        date: '',
        time: ''
    });

    const handleNext = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setCurrentStep(prev => Math.min(prev + 1, 3));
    };

    const handleBack = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = () => {
        // Here you would typically dispatch to an API
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsSubmitted(true);
    };

    // --- Success State UI ---
    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-[#fcfaf8] flex flex-col items-center justify-center p-4 font-['Plus_Jakarta_Sans',sans-serif] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-400/5 rounded-full blur-3xl rounded-bl-full pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#ef9d2a]/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="max-w-md w-full bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-stone-200/50 border border-stone-100 text-center animate-fade-in-up relative z-10">
                    <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-emerald-100/50">
                        <Check className="w-12 h-12" strokeWidth={3} />
                    </div>
                    <h2 className="text-3xl font-black text-stone-900 mb-4 tracking-tight">Request Sent!</h2>
                    <p className="text-stone-500 font-medium mb-10 leading-relaxed text-lg">
                        Your food assistance request has been routed to our NGO partners in the network. You will receive a verification call shortly.
                    </p>
                    <Link
                        to="/"
                        className="inline-flex w-full items-center justify-center rounded-full bg-stone-900 px-8 py-5 text-lg font-bold text-white transition-all hover:bg-stone-800 shadow-lg shadow-stone-900/20 active:translate-y-0.5"
                    >
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fcfaf8] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#ef9d2a]/30 relative overflow-x-hidden flex flex-col">

            {/* Background Aesthetic Blobs (Blurred Orange Variant) */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#ef9d2a]/[0.03] rounded-full blur-3xl -translate-x-1/4 -translate-y-1/4 pointer-events-none z-0"></div>
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#ef9d2a]/[0.02] rounded-full blur-3xl translate-x-1/4 pointer-events-none z-0"></div>

            {/* Simple Navbar (Returning to home) */}
            <header className="absolute top-0 w-full p-6 sm:p-8 z-20">
                <Link to="/" className="inline-flex items-center gap-3 font-black text-xl text-stone-900 tracking-tight hover:opacity-80 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-[#ef9d2a] text-white flex items-center justify-center shadow-md">
                        <User className="w-5 h-5" strokeWidth={2.5} />
                    </div>
                    Book Bawarchi
                </Link>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 relative z-10 mt-20 sm:mt-0 py-12">

                {/* Wizard Card Container */}
                <div className="w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl shadow-stone-200/50 border border-stone-100 p-6 sm:p-10 md:p-14 animate-fade-in-up">

                    {/* Progress Indicator */}
                    <WizardProgress currentStep={currentStep} />

                    {/* Dynamic Step Rendering */}
                    <div className="mt-8 relative">
                        {currentStep === 1 && (
                            <Step1Details formData={formData} setFormData={setFormData} onNext={handleNext} />
                        )}
                        {currentStep === 2 && (
                            <Step2Verification formData={formData} setFormData={setFormData} onNext={handleNext} onBack={handleBack} />
                        )}
                        {currentStep === 3 && (
                            <Step3Delivery formData={formData} setFormData={setFormData} onSubmit={handleSubmit} onBack={handleBack} />
                        )}
                    </div>
                </div>

                {/* Footer Disclaimer */}
                <p className="text-center text-stone-400 text-sm font-medium mt-8 max-w-md mx-auto">
                    Requests are fulfilled based on the availability of donated excess food in your area.
                </p>

            </main>
        </div>
    );
}
