import React, { useState } from 'react';
import {
  Check,
  Download,
  FileText,
  Image as ImageIcon,
  ChevronLeft,
  MapPin,
  Users,
  Utensils,
  Calendar,
  Clock,
  MoreVertical,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- MOCK DATA ---
const MOCK_ENQUIRY = {
  id: 'ENQ-2023-104',
  status: 'IN PROGRESS',
  guestCount: '350 Pax',
  budget: '₹450 - ₹600 / head',
  cuisine: 'North Indian, Continental',
  date: 'Oct 24, 2024',
  location: 'Grand Hyatt, Mumbai',
  type: 'Wedding Sangeet',
  notes:
    'Looking for a premium setup with live counters. Need special focus on the dessert section. No beef or pork on the menu.',
  attachments: [
    {
      id: 1,
      name: 'Venue_Floorplan.pdf',
      size: '2.4 MB',
      type: 'pdf',
      icon: FileText,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
    {
      id: 2,
      name: 'Reference_Decor.jpg',
      size: '1.1 MB',
      type: 'image',
      icon: ImageIcon,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50',
    },
  ],
};

const MOCK_QUOTES = [
  {
    id: 'Q-01',
    caterer: 'Royal Feast Caterers',
    price: '₹5,50,000',
    perHead: '₹550 / head',
    message:
      'Hi Priya, we would love to cater your Sangeet! We have attached our premium North Indian & Continental fusion menu. This includes 4 live counters and a specialized dessert bar as requested.',
    time: 'Today, 2:30 PM',
    isNew: true,
  },
  {
    id: 'Q-02',
    caterer: 'Spice Route Kitchen',
    price: '₹4,80,000',
    perHead: '₹480 / head',
    message:
      'Hello! I have reviewed your requirements. We can definitely manage the Sangeet within your budget. Please check out the attached proposal for the menu breakdown.',
    time: 'Yesterday, 4:15 PM',
    isNew: false,
  },
];

const MOCK_ACTIVITY = [
  {
    id: 1,
    title: 'Quote Received',
    auth: 'Royal Feast Caterers',
    time: 'Today, 2:30 PM',
    type: 'success',
  },
  {
    id: 2,
    title: 'Caterer Viewed Enquiry',
    auth: 'Spice Route Kitchen',
    time: 'Yesterday, 8:00 PM',
    type: 'neutral',
  },
  {
    id: 3,
    title: 'Quote Received',
    auth: 'Spice Route Kitchen',
    time: 'Yesterday, 4:15 PM',
    type: 'success',
  },
  {
    id: 4,
    title: 'Enquiry Broadcasted',
    auth: 'System',
    time: 'Oct 15, 10:00 AM',
    type: 'neutral',
  },
  {
    id: 5,
    title: 'Enquiry Created',
    auth: 'Priya Sharma',
    time: 'Oct 15, 09:45 AM',
    type: 'neutral',
  },
];

const STEPS = [
  { id: 1, label: 'Reviewing', status: 'completed' },
  { id: 2, label: 'Quotes', status: 'active' },
  { id: 3, label: 'Negotiation', status: 'upcoming' },
  { id: 4, label: 'Confirmed', status: 'upcoming' },
];

// --- SUB-COMPONENTS ---

const ProgressStepper = ({ steps }) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        {/* Connecting Line String */}
        <div className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-1 bg-slate-200 rounded-full z-0 hidden sm:block">
          <div
            className="h-full bg-[#ef9d2a] rounded-full transition-all duration-500"
            style={{ width: '33%' }}
          ></div>
        </div>

        {steps.map((step, idx) => (
          <div
            key={step.id}
            className="relative z-10 flex flex-col items-center gap-2 bg-[#fcfaf8] sm:bg-transparent px-2"
          >
            {step.status === 'completed' ? (
              <div className="w-10 h-10 rounded-full bg-[#ef9d2a] text-white flex items-center justify-center shadow-md shadow-orange-500/20 ring-4 ring-[#fcfaf8]">
                <Check className="w-5 h-5" strokeWidth={3} />
              </div>
            ) : step.status === 'active' ? (
              <div className="w-10 h-10 rounded-full bg-white border-2 border-[#ef9d2a] flex items-center justify-center shadow-md ring-4 ring-[#fcfaf8]">
                <div className="w-3 h-3 rounded-full bg-[#ef9d2a]"></div>
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-slate-200 text-slate-400 font-bold flex items-center justify-center ring-4 ring-[#fcfaf8]">
                {step.id}
              </div>
            )}
            <span
              className={`text-[11px] sm:text-xs font-bold uppercase tracking-widest ${
                step.status === 'upcoming' ? 'text-slate-400' : 'text-stone-900'
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const EnquirySummary = ({ data }) => (
  <div className="bg-white rounded-[1.5rem] p-6 sm:p-8 shadow-sm border border-transparent flex flex-col gap-6">
    {/* Header */}
    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
      <h2 className="text-xl font-black text-stone-900 tracking-tight">Enquiry Summary</h2>
      <button className="text-[#ef9d2a] text-sm font-bold hover:text-[#d98a1e] transition-colors">
        View Full Request
      </button>
    </div>

    {/* Data Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
          Event Type
        </span>
        <span className="text-base font-bold text-stone-900">{data.type}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
          Guest Count
        </span>
        <span className="text-base font-bold text-stone-900">{data.guestCount}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
          Budget Config
        </span>
        <span className="text-base font-bold text-stone-900">{data.budget}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Date</span>
        <span className="text-base font-bold text-stone-900">{data.date}</span>
      </div>
      <div className="flex flex-col gap-1 sm:col-span-2">
        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
          Cuisine Requirements
        </span>
        <span className="text-base font-bold text-stone-900">{data.cuisine}</span>
      </div>
    </div>

    {/* Notes Layout */}
    <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
        Additional Notes
      </span>
      <div className="w-full bg-slate-50 rounded-2xl p-4 text-sm font-medium text-slate-600 leading-relaxed border border-slate-100">
        "{data.notes}"
      </div>
    </div>

    {/* Attachments Row */}
    {data.attachments && data.attachments.length > 0 && (
      <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
          Attachments ({data.attachments.length})
        </span>
        <div className="flex flex-wrap gap-3">
          {data.attachments.map((file) => {
            const Icon = file.icon;
            return (
              <div
                key={file.id}
                className="flex items-center gap-3 p-3 pr-4 rounded-xl border border-slate-200 hover:border-[#ef9d2a]/30 hover:bg-orange-50/20 transition-all cursor-pointer group"
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${file.bg} ${file.color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-stone-900 group-hover:text-[#ef9d2a] transition-colors">
                    {file.name}
                  </span>
                  <span className="text-xs font-medium text-slate-400">{file.size}</span>
                </div>
                <button className="ml-2 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-stone-900 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    )}
  </div>
);

const QuoteCard = ({ quote }) => (
  <div
    className={`bg-white rounded-[1.5rem] p-6 sm:p-8 shadow-sm border transition-shadow hover:shadow-md ${quote.isNew ? 'border-[#ef9d2a]/30 ring-4 ring-[#ef9d2a]/5' : 'border-transparent'}`}
  >
    {/* Top Array */}
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-500 font-bold shrink-0">
          {quote.caterer.substring(0, 2).toUpperCase()}
        </div>
        <div className="flex flex-col gap-0.5">
          <h3 className="text-lg font-black text-stone-900">{quote.caterer}</h3>
          <span className="text-xs font-bold text-slate-400">{quote.time}</span>
        </div>
      </div>
      <div className="flex flex-col sm:items-end">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
          Estimated Quote
        </span>
        <span className="text-2xl font-black text-[#ef9d2a] leading-none">{quote.price}</span>
        <span className="text-xs font-bold text-slate-500 mt-1">{quote.perHead}</span>
      </div>
    </div>

    {/* Message Body String */}
    <div className="w-full bg-slate-50 rounded-2xl p-5 text-sm font-medium text-stone-600 leading-relaxed border border-slate-100 mb-6 relative">
      {/* Speech Bubble Tail */}
      <div className="absolute -top-2 left-6 w-4 h-4 bg-slate-50 rotate-45 border-l border-t border-slate-100"></div>
      {quote.message}
    </div>

    {/* Action Blocks */}
    <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-slate-100">
      <button className="w-full sm:flex-1 h-12 rounded-full border-2 border-[#ef9d2a] text-[#ef9d2a] hover:bg-orange-50 font-black text-sm transition-colors flex items-center justify-center gap-2">
        <FileText className="w-4 h-4" />
        View Full Proposal
      </button>
      <button className="w-full sm:w-auto h-12 px-6 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 font-bold text-sm transition-colors flex items-center justify-center">
        Ignore
      </button>
    </div>
  </div>
);

const ActivityHistory = ({ log }) => (
  <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-transparent h-fit sticky top-24">
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-xl font-black text-stone-900 tracking-tight">Activity History</h2>
      <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-400 transition-colors">
        <MoreVertical className="w-5 h-5" />
      </button>
    </div>

    <div className="relative border-l-2 border-slate-100 ml-3 pl-6 space-y-8">
      {log.map((item, idx) => (
        <div key={item.id} className="relative">
          {/* Node Visual */}
          {item.type === 'success' ? (
            <div className="absolute -left-[33px] top-0.5 w-4 h-4 rounded-full border-[3px] border-[#fcfaf8] bg-green-500 ring-2 ring-green-500/20"></div>
          ) : item.type === 'alert' ? (
            <div className="absolute -left-[33px] top-0.5 w-4 h-4 rounded-full border-[3px] border-[#fcfaf8] bg-[#ef9d2a] ring-2 ring-[#ef9d2a]/20"></div>
          ) : (
            <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full border-2 border-[#fcfaf8] bg-slate-300"></div>
          )}

          {/* Node Data */}
          <div className="flex flex-col gap-1">
            <span
              className={`text-sm font-bold ${item.type === 'success' ? 'text-stone-900' : 'text-stone-700'}`}
            >
              {item.title}
            </span>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <span>{item.auth}</span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span>{item.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AssignedAgent = () => (
  <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-transparent mt-6 flex items-center gap-4">
    <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-sm shrink-0">
      NA
    </div>
    <div className="flex flex-col">
      <span className="text-sm font-bold text-stone-900">Not Assigned</span>
      <span className="text-xs font-medium text-slate-400">No agent connected yet</span>
    </div>
    <button className="ml-auto text-sm font-bold text-[#ef9d2a] hover:text-[#d98a1e] transition-colors">
      Assign
    </button>
  </div>
);

// --- MAIN PAGE ---

export default function EnquiryDetailPage() {
  return (
    <div className="w-full min-h-screen bg-[#fcfaf8] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#ef9d2a]/30 pb-24 animate-in fade-in duration-500">
      {/* Minimal Dashboard Layout Wrapper Assumption */}
      <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 pl-4 ">
        {/* --- 1. Top Header Array --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-2">
          <div className="flex flex-col gap-3">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
              <Link
                to="/dashboard/enquiries"
                className="hover:text-stone-900 transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Enquiries
              </Link>
              <span>/</span>
              <span className="text-stone-600 font-black">{MOCK_ENQUIRY.id}</span>
            </div>

            <div className="flex items-center gap-4">
              <h1 className="text-3xl md:text-4xl font-black text-stone-900 tracking-tight">
                {MOCK_ENQUIRY.type}
              </h1>
              <div className="hidden sm:flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-black tracking-widest border border-blue-200">
                {MOCK_ENQUIRY.status}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none h-12 px-6 rounded-full border-2 border-slate-200 hover:border-slate-300 bg-white text-slate-600 font-bold text-sm transition-colors">
              Edit Details
            </button>
            <button className="flex-1 md:flex-none h-12 px-6 rounded-full bg-[#ef9d2a] hover:bg-[#d98a1e] text-white font-black text-sm transition-all shadow-md shadow-orange-500/20 active:scale-95 flex items-center justify-center gap-2">
              <Check className="w-4 h-4" strokeWidth={3} />
              Mark as Closed
            </button>
          </div>
        </div>

        {/* --- 2. Structural Split Layout --- */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8 mt-6">
          {/* LEFT PANE (Core Flow) */}
          <div className="xl:col-span-2 flex flex-col gap-6 lg:gap-8">
            {/* Stepper Extracted */}
            <ProgressStepper steps={STEPS} />

            {/* Summary Block */}
            <EnquirySummary data={MOCK_ENQUIRY} />

            {/* Responses/Quotes Stream */}
            <div className="flex flex-col gap-6 mt-4">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xl font-black text-stone-900 tracking-tight">
                  Caterer Responses
                </h3>
                <span className="text-sm font-bold text-[#ef9d2a] px-3 py-1 bg-orange-50 rounded-full">
                  {MOCK_QUOTES.length} Quotes Received
                </span>
              </div>

              <div className="flex flex-col gap-6">
                {MOCK_QUOTES.map((quote) => (
                  <QuoteCard key={quote.id} quote={quote} />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT PANE (Sidebar/Logs) */}
          <div className="col-span-1 pt-6 xl:pt-24">
            <ActivityHistory log={MOCK_ACTIVITY} />
            <AssignedAgent />
          </div>
        </div>
      </div>
    </div>
  );
}
