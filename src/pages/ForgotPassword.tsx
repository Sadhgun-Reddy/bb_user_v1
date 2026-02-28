import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, Menu, Mail, ArrowRight, ArrowLeft, Unlock, CheckCircle2 } from 'lucide-react';


const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#fcfaf8] font-['Plus_Jakarta_Sans',sans-serif] flex flex-col text-stone-900 selection:bg-[#ef9d2a]/30">

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
        {/* Abstract Background Shapes (Blurred Circles) */}
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-[#ef9d2a]/10 blur-[100px] pointer-events-none w-max-[500px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[#ef9d2a]/20 blur-[120px] pointer-events-none"></div>

        {/* Auth Card */}
        <div className="w-full max-w-md bg-white rounded-[2rem] sm:rounded-3xl shadow-2xl shadow-stone-200/50 border border-stone-100 p-8 sm:p-10 relative z-10 animate-fade-in-up">
          {!isSubmitted ? (
            // STATE A: Forgot Password Form
            <div className="flex flex-col animate-fade-in">
              {/* Header Section */}
              <div className="flex flex-col items-center text-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-xl bg-[#ef9d2a]/10 flex items-center justify-center text-[#ef9d2a] mb-2 shadow-inner">
                  <Unlock className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1b160d]">
                    Forgot Password?
                  </h1>
                  <p className="text-stone-500 font-medium text-sm leading-relaxed mx-auto">
                    Don't worry, it happens to the best of us. Enter your email address and we'll
                    send you a link to reset your password.
                  </p>
                </div>
              </div>

              {/* Form Section */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Email Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-bold text-stone-700 pl-1">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400 group-focus-within:text-[#ef9d2a] transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-11 pr-4 h-12 rounded-full border border-stone-200 bg-stone-50 text-[#1b160d] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#ef9d2a]/50 focus:border-[#ef9d2a] transition-all text-base font-medium"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 mt-2 bg-[#ef9d2a] hover:bg-[#d98a1e] text-white text-base font-bold rounded-full shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Reset Link</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Back Link */}
              <div className="mt-8 text-center pt-2">
                <button
                  onClick={() => navigate('/login')}
                  className="inline-flex items-center gap-2 text-sm font-bold text-stone-500 hover:text-[#ef9d2a] transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Login
                </button>
              </div>
            </div>
          ) : (
            // STATE B: Success View
            <div className="flex flex-col items-center text-center animate-fade-in py-6">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1b160d] mb-4">
                Check Your Email
              </h2>

              <p className="text-stone-500 font-medium text-base leading-relaxed mb-8 max-w-sm">
                We've sent a password reset link to <br />
                <span className="font-bold text-stone-800">{email}</span>
              </p>

              <button
                onClick={() => navigate('/login')}
                className="w-full h-12 bg-white border border-stone-200 hover:border-stone-300 hover:bg-stone-50 text-stone-800 text-base font-bold rounded-full transition-all flex items-center justify-center gap-2 mb-4"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Login
              </button>

              <p className="text-sm font-medium text-stone-500">
                Didn't receive the email?{' '}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-[#ef9d2a] font-bold hover:underline"
                >
                  Click to resend
                </button>
              </p>
            </div>
          )}
        </div>

        {/* Optional Footer Helper Text */}
        <div className="absolute bottom-8 left-0 right-0 text-center animate-fade-in z-10">
          <p className="text-sm text-stone-500 font-medium">
            Need help?{' '}
            <a
              href="#"
              className="font-bold text-[#1b160d] hover:text-[#ef9d2a] underline decoration-stone-300 hover:decoration-[#ef9d2a] transition-colors"
            >
              Contact Support
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
