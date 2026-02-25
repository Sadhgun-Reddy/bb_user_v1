import React, { useState } from 'react';
import {
    ArrowRight,
    Mail,
    Phone,
    MapPin,
    Plus,
    Minus,
    LifeBuoy,
    MessageSquareText
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- MOCK DATA ---
const FAQ_LIST = [
    {
        id: 'faq-1',
        question: 'How do I cancel a caterer booking?',
        answer: 'You can cancel a booking directly from your Enquiries Dashboard if the status is still "In Progress". If the booking is "Confirmed", you will need to contact the caterer directly as per their specific cancellation policy.'
    },
    {
        id: 'faq-2',
        question: 'When do caterers get paid?',
        answer: 'Book Bawarchi holds the initial deposit in escrow. The caterer receives the deposit 48 hours before the event date, and the remaining balance is settled directly between you and the caterer post-event.'
    },
    {
        id: 'faq-3',
        question: 'How do I know if a caterer is verified?',
        answer: 'All verified caterers undergo a strict background check, including FSSAI license verification. Look for the blue "Verified" shield badge on their profile.'
    },
    {
        id: 'faq-4',
        question: 'What happens if a caterer doesn\'t show up?',
        answer: 'We have a strict Service Level Agreement. In the rare event of a no-show, you will receive a 100% refund of your deposit, and our emergency support team will attempt to find a replacement vendor immediately.'
    }
];

const CONTACT_METHODS = [
    { id: 'cm-1', type: 'Email Us', detail: 'support@bookbawarchi.com', subtext: 'Response time: within 24 hours', icon: Mail },
    { id: 'cm-2', type: 'Call Us', detail: '+91 1800-123-4567', subtext: 'Mon-Sat from 9am to 6pm IST', icon: Phone },
    { id: 'cm-3', type: 'Head Office', detail: '124 Innovation Drive', subtext: 'Koramangala, Bangalore 560034', icon: MapPin }
];

// --- SUB-COMPONENTS ---

const HeroHeader = () => (
    <div className="flex flex-col gap-4 mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-tight max-w-2xl">
            We're here to help.
        </h1>
        <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl leading-relaxed">
            Need assistance with a booking, have a question about a caterer, or experiencing technical issues? Our support team is ready.
        </p>
    </div>
);

const ContactForm = () => (
    <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 shadow-sm border border-transparent w-full flex flex-col gap-8 h-full">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-50 text-[#ef9d2a] flex items-center justify-center">
                <MessageSquareText className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-black text-stone-900 tracking-tight">Send us a Message</h2>
        </div>

        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-stone-900 ml-2">Your Name</label>
                    <input
                        type="text"
                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-semibold text-stone-900 focus:ring-2 focus:ring-[#ef9d2a]/20 outline-none transition-shadow"
                        placeholder="e.g. Priya Sharma"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-stone-900 ml-2">Email Address</label>
                    <input
                        type="email"
                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-semibold text-stone-900 focus:ring-2 focus:ring-[#ef9d2a]/20 outline-none transition-shadow"
                        placeholder="you@example.com"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-stone-900 ml-2">Subject</label>
                <select className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-semibold text-stone-900 focus:ring-2 focus:ring-[#ef9d2a]/20 outline-none transition-shadow appearance-none cursor-pointer">
                    <option value="" disabled selected>Select an issue type...</option>
                    <option value="booking">Booking Issue</option>
                    <option value="payment">Payment & Refunds</option>
                    <option value="caterer">Report a Caterer</option>
                    <option value="technical">Technical Bug</option>
                    <option value="other">Other Inquiry</option>
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-stone-900 ml-2">Message</label>
                <textarea
                    rows="6"
                    className="w-full bg-slate-50 border-none rounded-2xl p-6 text-sm font-semibold text-stone-900 focus:ring-2 focus:ring-[#ef9d2a]/20 outline-none transition-shadow resize-none leading-relaxed"
                    placeholder="Describe your issue in detail..."
                ></textarea>
            </div>

            <button className="w-full md:w-auto mt-2 px-10 py-4 text-lg rounded-full bg-[#ef9d2a] hover:bg-[#d98a1e] text-white font-black flex items-center justify-center gap-3 shadow-md shadow-orange-500/20 active:scale-95 transition-all self-start">
                Send Message
                <ArrowRight className="w-5 h-5" strokeWidth={3} />
            </button>
        </form>
    </div>
);

const TicketRedirectCard = () => (
    <div className="w-full bg-orange-50/50 rounded-[2.5rem] p-8 lg:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-orange-100">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-200/50 text-[#ef9d2a] flex items-center justify-center shrink-0">
                <LifeBuoy className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="text-lg font-black text-stone-900">Track your support requests</h3>
                <p className="text-sm font-medium text-slate-600">View the status of your existing open tickets.</p>
            </div>
        </div>
        <Link to="/dashboard" className="px-8 py-3 rounded-full bg-white border-2 border-orange-200 text-[#ef9d2a] hover:bg-orange-50 font-black text-sm transition-colors text-center whitespace-nowrap">
            Go to Dashboard
        </Link>
    </div>
);

const ContactInfoList = () => (
    <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 shadow-sm border border-transparent w-full flex flex-col gap-8">
        <h2 className="text-2xl font-black text-stone-900 tracking-tight">Other ways to connect</h2>

        <div className="flex flex-col gap-6">
            {CONTACT_METHODS.map(method => {
                const Icon = method.icon;
                return (
                    <div key={method.id} className="flex gap-5 p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors group">
                        <div className="w-12 h-12 rounded-full bg-orange-50 group-hover:bg-orange-100 text-[#ef9d2a] flex items-center justify-center shrink-0 transition-colors">
                            <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="text-xs font-black uppercase tracking-widest text-[#ef9d2a] mb-0.5">{method.type}</span>
                            <span className="text-base font-bold text-stone-900 leading-tight">{method.detail}</span>
                            <span className="text-sm font-medium text-slate-500 mt-1">{method.subtext}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
);

const FaqAccordion = () => {
    const [openId, setOpenId] = useState('faq-1');

    return (
        <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 shadow-sm border border-transparent w-full flex flex-col gap-8 h-full">
            <h2 className="text-2xl font-black text-stone-900 tracking-tight">Common Questions</h2>

            <div className="flex flex-col gap-3">
                {FAQ_LIST.map((faq) => {
                    const isOpen = openId === faq.id;
                    return (
                        <div
                            key={faq.id}
                            onClick={() => setOpenId(isOpen ? null : faq.id)}
                            className={`flex flex-col bg-slate-50/80 rounded-2xl p-5 cursor-pointer border transition-colors ${isOpen ? 'border-slate-200' : 'border-transparent hover:bg-slate-100/50'}`}
                        >
                            <div className="flex items-center justify-between gap-4">
                                <h3 className={`font-bold transition-colors select-none text-base sm:text-[17px] ${isOpen ? 'text-[#ef9d2a]' : 'text-stone-900'}`}>
                                    {faq.question}
                                </h3>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-orange-100 text-[#ef9d2a]' : 'text-slate-400'}`}>
                                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                </div>
                            </div>

                            {/* Accordion Body */}
                            <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                                <div className="overflow-hidden">
                                    <p className="text-slate-600 font-medium text-sm leading-relaxed pr-8">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


// --- MAIN PAGE ---

export default function ContactSupportPage() {
    return (
        <div className="w-full min-h-screen bg-[#fcfaf8] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#ef9d2a]/30  pb-24 animate-in fade-in duration-500">

            {/* Standard Container (assuming this page is part of the global layout, not bound by dashboard sidebar, though instructions said "Dashboard Layout", the visual description and typical flow puts this outside if it's Global. Assuming it's inside the User Dashboard as requested). */}
            {/* If it needs to be full width like a global page, remove `pl-4 lg:pl-[280px]` */}
            <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 pl-4  ">

                <HeroHeader />

                {/* --- 2-Pane Split Structure --- */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">

                    {/* LEFT PANE (Action) */}
                    <div className="flex flex-col gap-8 h-full">
                        <ContactForm />
                        <TicketRedirectCard />
                    </div>

                    {/* RIGHT PANE (Info) */}
                    <div className="flex flex-col gap-8 h-full">
                        <FaqAccordion />
                        <ContactInfoList />
                    </div>

                </div>

            </div>
        </div>
    );
}
