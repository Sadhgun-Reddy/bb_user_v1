import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChefHat,
    Menu,
    MailOpen,
    ArrowRight,
    Lock,
    ShieldCheck
} from 'lucide-react';

const AuthNavbar = () => {
    return (
        <header className="w-full px-6 py-4 flex items-center justify-between border-b border-stone-100 bg-white/80 backdrop-blur-md relative z-20">
            <div className="flex items-center gap-2">
                <ChefHat className="w-8 h-8 text-[#ef9d2a]" />
                <span className="text-stone-900 text-lg font-bold tracking-tight">Book Bawarchi</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
                <a href="/" className="text-sm font-medium text-stone-600 hover:text-[#ef9d2a] transition-colors">Home</a>
                <a href="#" className="text-sm font-medium text-stone-600 hover:text-[#ef9d2a] transition-colors">Find Caterers</a>
                <a href="#" className="text-sm font-medium text-stone-600 hover:text-[#ef9d2a] transition-colors">Recipes</a>
                <a href="#" className="text-sm font-medium text-stone-600 hover:text-[#ef9d2a] transition-colors">Support</a>
            </nav>
            <div className="flex items-center gap-3">
                <a href="/login" className="hidden md:flex items-center justify-center rounded-full h-10 px-6 border border-stone-200 hover:border-[#ef9d2a] text-stone-900 hover:text-[#ef9d2a] text-sm font-bold transition-all">
                    Login
                </a>
                <div className="md:hidden">
                    <Menu className="w-6 h-6 text-stone-800" />
                </div>
            </div>
        </header>
    );
};

const EmailVerificationPage = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(59);
    const [isLoading, setIsLoading] = useState(false);
    const inputRefs = useRef([]);

    // Mock User Email Passed via state/context conceptually
    const userEmail = "hello@johndoe.com";

    // Timer Countdown Logic
    useEffect(() => {
        let timer;
        if (timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [timeLeft]);

    // Handle OTP Input Changes
    const handleChange = (index, value) => {
        if (isNaN(value)) return;

        const newOtp = [...otp];
        // Handle Pasting Full Codes
        if (value.length > 1) {
            const pastedData = value.slice(0, 6).split('');
            for (let i = 0; i < pastedData.length; i++) {
                if (index + i < 6) newOtp[index + i] = pastedData[i];
            }
            setOtp(newOtp);
            const focusIndex = Math.min(index + pastedData.length, 5);
            inputRefs.current[focusIndex]?.focus();
            return;
        }

        // Standard digit entry
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus Next Box
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Handle Keyboard Navigation (Backspace)
    const handleKeyDown = (index, e) => {
        // If pressing Backspace on an empty field, move to previous
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = (e) => {
        e.preventDefault();
        const otpString = otp.join('');
        if (otpString.length !== 6) {
            alert("Please enter the complete 6-digit verification code.");
            return;
        }

        setIsLoading(true);
        // Simulate API Verification
        setTimeout(() => {
            setIsLoading(false);
            navigate('/dashboard');
        }, 1500);
    };

    const handleResend = () => {
        if (timeLeft > 0) return;
        // Simulate Resend API Call
        setTimeLeft(59);
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
    };

    return (
        <div className="min-h-screen bg-[#fcfaf8] font-['Plus_Jakarta_Sans',sans-serif] flex flex-col text-stone-900 selection:bg-[#ef9d2a]/30">

            <AuthNavbar />

            <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-12 relative overflow-hidden">

                {/* Abstract Background Shapes (Blurred Circles) */}
                <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[#ef9d2a]/10 blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-[0%] right-[-5%] w-[500px] h-[500px] rounded-full bg-orange-200/20 blur-[130px] pointer-events-none"></div>

                {/* Auth Card Content */}
                <div className="w-full max-w-[520px] bg-white rounded-[2rem] shadow-2xl shadow-stone-200/50 border border-stone-100 p-8 md:p-12 relative z-10 animate-fade-in-up">

                    {/* Header Icon & Title */}
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 mx-auto bg-[#ef9d2a]/10 rounded-2xl flex items-center justify-center mb-6 text-[#ef9d2a] shadow-inner">
                            <MailOpen className="w-8 h-8" strokeWidth={2.5} />
                        </div>
                        <h1 className="text-3xl font-extrabold mb-3 text-[#1b160d] tracking-tight">Verify your email</h1>
                        <p className="text-stone-500 font-medium text-base leading-relaxed max-w-sm mx-auto">
                            We've sent a 6-digit code to <span className="font-bold text-stone-800">{userEmail}</span>. Enter it below to confirm your account.
                        </p>
                    </div>

                    <form onSubmit={handleVerify} className="flex flex-col gap-8">

                        {/* OTP 6-Box Grid */}
                        <div className="flex justify-center gap-2 sm:gap-3">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    pattern="\d*"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    autoFocus={index === 0}
                                    className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold bg-stone-50 border-2 border-slate-200 rounded-2xl focus:border-[#ef9d2a] focus:ring-4 focus:ring-[#ef9d2a]/10 focus:outline-none transition-all caret-[#ef9d2a] text-[#1b160d]"
                                />
                            ))}
                        </div>

                        {/* Submit Verification */}
                        <button
                            type="submit"
                            disabled={isLoading || otp.join('').length !== 6}
                            className="w-full h-14 bg-[#ef9d2a] hover:bg-[#d98a1e] text-white text-lg font-bold rounded-full shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Verify Account</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>

                    </form>

                    {/* Footer Timer Link */}
                    <div className="mt-8 text-center pt-2">
                        <p className="text-sm font-medium text-stone-500">
                            Didn't receive the email?
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={timeLeft > 0}
                                className={`ml-1.5 font-bold transition-colors ${timeLeft > 0 ? 'text-stone-400 cursor-not-allowed' : 'text-[#ef9d2a] hover:underline'}`}
                            >
                                Resend code {timeLeft > 0 && <span className="font-medium text-stone-400">in 0:{timeLeft.toString().padStart(2, '0')}</span>}
                            </button>
                        </p>
                    </div>

                </div>

                {/* Secure Trust Indicators (Matches Theme Blueprint) */}
                <div className="mt-10 flex items-center justify-center gap-5 sm:gap-8 text-slate-400 text-xs font-bold uppercase tracking-wider relative z-10 animate-fade-in delay-100">
                    <div className="flex items-center gap-1.5">
                        <Lock className="w-4 h-4" />
                        <span>Secure Connection</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                    <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Verified Chef Network</span>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default EmailVerificationPage;
