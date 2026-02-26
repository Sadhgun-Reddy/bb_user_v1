import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Users,
  Calendar,
  ChevronRight,
  Circle,
  ChevronDown,
  ArrowUpDown,
  CheckCircle2,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- MOCK DATA ---
const MOCK_LEADS = [
  {
    id: 'L-001',
    customer: {
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      initials: 'PS',
    },
    logistics: {
      event: 'Wedding Sangeet',
      date: 'Oct 24, 2024',
      guests: 350,
    },
    acquisition: 'Direct',
    status: 'New',
    timeAgo: '12 mins ago',
    isUnread: true,
  },
  {
    id: 'L-002',
    customer: {
      name: 'Rahul Mehta',
      avatar: '',
      initials: 'RM',
    },
    logistics: {
      event: 'Corporate Gala',
      date: 'Nov 15, 2024',
      guests: 120,
    },
    acquisition: 'Broadcast',
    status: 'New',
    timeAgo: '2 hours ago',
    isUnread: true,
  },
  {
    id: 'L-003',
    customer: {
      name: 'Anita Desai',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      initials: 'AD',
    },
    logistics: {
      event: 'Birthday Celebration',
      date: 'Dec 05, 2024',
      guests: 50,
    },
    acquisition: 'Direct',
    status: 'Replied',
    timeAgo: '1 day ago',
    isUnread: false,
  },
  {
    id: 'L-004',
    customer: {
      name: 'Vikram Singh',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      initials: 'VS',
    },
    logistics: {
      event: 'Housewarming',
      date: 'Sep 30, 2024',
      guests: 40,
    },
    acquisition: 'Broadcast',
    status: 'Viewed',
    timeAgo: '2 days ago',
    isUnread: false,
  },
  {
    id: 'L-005',
    customer: {
      name: 'Sneha Patel',
      avatar: '',
      initials: 'SP',
    },
    logistics: {
      event: 'Anniversary Dinner',
      date: 'Oct 12, 2024',
      guests: 80,
    },
    acquisition: 'Direct',
    status: 'Replied',
    timeAgo: '3 days ago',
    isUnread: false,
  },
  {
    id: 'L-006',
    customer: {
      name: 'Karan Kapoor',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      initials: 'KK',
    },
    logistics: {
      event: 'Engagement Party',
      date: 'Nov 20, 2024',
      guests: 200,
    },
    acquisition: 'Broadcast',
    status: 'New',
    timeAgo: '4 days ago',
    isUnread: true,
  },
];

// --- UTILS & BADGE STYLES ---

const getStatusBadge = (status) => {
  switch (status) {
    case 'New':
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-[#ef9d2a] border border-orange-200">
          <Circle className="w-2 h-2 fill-[#ef9d2a] text-[#ef9d2a]" />
          <span className="text-xs font-black tracking-wide">New</span>
        </div>
      );
    case 'Replied':
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 border border-green-200">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span className="text-xs font-black tracking-wide">Replied</span>
        </div>
      );
    case 'Viewed':
    default:
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
          <span className="text-xs font-black tracking-wide">Viewed</span>
        </div>
      );
  }
};

const getAcquisitionBadge = (type) => {
  return type === 'Direct' ? (
    <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-purple-100 text-purple-700">
      Direct
    </span>
  ) : (
    <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-700">
      Broadcast
    </span>
  );
};

// --- SUB-COMPONENTS ---

const InboxHeader = ({ newLeadsCount, searchQuery, setSearchQuery }) => (
  <div className="flex flex-col gap-6 mb-8">
    {/* Title & Stats */}
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-black text-stone-900 tracking-tight">
          Leads & Enquiries
        </h1>
      </div>
      <p className="text-stone-500 font-medium">
        You have <strong className="text-[#ef9d2a]">{newLeadsCount} new leads</strong> awaiting your
        response today.
      </p>
    </div>

    {/* Controls Toolbar */}
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 w-full bg-white p-2 pl-4 rounded-[2rem] lg:rounded-full shadow-sm border border-stone-100">
      {/* Search */}
      <div className="relative w-full lg:w-[350px] shrink-0">
        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-stone-400" />
        </div>
        <input
          type="text"
          placeholder="Search by customer or event type..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-3 bg-transparent border-none text-stone-900 font-medium placeholder:text-stone-400 focus:ring-0 outline-none text-sm"
        />
      </div>

      <div className="w-full h-px lg:w-px lg:h-6 bg-stone-200"></div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 lg:gap-6 px-2 pb-2 lg:pb-0 w-full lg:w-auto">
        <button className="flex items-center gap-2 text-sm font-bold text-stone-600 hover:text-stone-900 transition-colors">
          Type: All
          <ChevronDown className="w-4 h-4 text-stone-400" />
        </button>
        <button className="flex items-center gap-2 text-sm font-bold text-stone-600 hover:text-stone-900 transition-colors">
          Status: All
          <ChevronDown className="w-4 h-4 text-stone-400" />
        </button>
        <button className="flex items-center gap-2 text-sm font-bold text-stone-600 hover:text-stone-900 transition-colors">
          <ArrowUpDown className="w-4 h-4 text-stone-400" />
          Newest
        </button>
        <div className="flex-1 lg:hidden"></div> {/* Spacer for mobile */}
        {/* Export Action */}
        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-stone-200 text-stone-600 text-sm font-bold hover:bg-stone-50 hover:text-stone-900 transition-colors ml-auto lg:ml-0">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>
    </div>
  </div>
);

const LeadRow = ({ lead }) => (
  <div className="relative group flex flex-col lg:flex-row lg:items-center justify-between p-5 lg:p-6 border-b border-stone-100 hover:bg-orange-50/30 transition-colors cursor-pointer bg-white first:rounded-t-[2.5rem] last:rounded-b-[2.5rem] last:border-b-0 gap-4 lg:gap-6">
    {/* Unread Accent Bar */}
    {lead.status === 'New' && (
      <div className="absolute left-0 top-3 bottom-3 w-1.5 bg-[#ef9d2a] rounded-r-lg"></div>
    )}

    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6 flex-1 min-w-0 lg:pr-6 pl-4 lg:pl-0">
      {/* 1. Customer Column */}
      <div className="flex items-center gap-4 w-full sm:w-64 shrink-0">
        <div className="relative shrink-0">
          {lead.customer.avatar ? (
            <img
              src={lead.customer.avatar}
              alt={lead.customer.name}
              className="w-12 h-12 rounded-full object-cover border border-stone-200 shadow-sm"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-black text-lg shadow-sm border border-slate-200">
              {lead.customer.initials}
            </div>
          )}
        </div>
        <div className="flex flex-col min-w-0">
          <span
            className={`text-[15px] truncate ${lead.status === 'New' ? 'font-black text-stone-900' : 'font-bold text-stone-700'}`}
          >
            {lead.customer.name}
          </span>
          <span className="text-xs font-bold text-stone-400 mt-0.5">{lead.timeAgo}</span>
        </div>
      </div>

      {/* 2. Logistics Column */}
      <div className="flex flex-col gap-1.5 w-full sm:w-64 shrink-0 sm:border-l sm:border-stone-100 sm:pl-6">
        <span
          className={`text-[15px] truncate ${lead.status === 'New' ? 'font-bold text-stone-900' : 'font-semibold text-stone-700'}`}
        >
          {lead.logistics.event}
        </span>
        <div className="flex items-center gap-2 text-xs font-bold text-stone-500">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {lead.logistics.date}
          </span>
          <span className="w-1 h-1 rounded-full bg-stone-300"></span>
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            {lead.logistics.guests}
          </span>
        </div>
      </div>

      {/* 3. Badges Column */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full sm:w-auto lg:w-48 lg:justify-end shrink-0 sm:border-l sm:border-stone-100 sm:pl-6 lg:border-none lg:pl-0 mt-2 sm:mt-0">
        {getAcquisitionBadge(lead.acquisition)}
        {getStatusBadge(lead.status)}
      </div>
    </div>

    {/* 4. Actions Column */}
    <div className="flex items-center justify-end gap-4 shrink-0 mt-4 lg:mt-0 border-t border-stone-100 pt-4 lg:border-none lg:pt-0 w-full lg:w-auto">
      {lead.status === 'New' ? (
        <button className="flex-1 lg:flex-none flex items-center justify-center h-10 px-8 rounded-full bg-[#ef9d2a] text-white font-black text-sm hover:bg-[#d98a1e] shadow-md shadow-orange-500/20 transition-all active:scale-95 group-hover:-translate-y-0.5">
          Respond
        </button>
      ) : (
        <button className="flex-1 lg:flex-none flex items-center justify-center h-10 px-6 rounded-full bg-stone-100 text-stone-600 font-bold text-sm hover:bg-stone-200 transition-colors">
          View Details
        </button>
      )}
      <button className="w-10 h-10 rounded-full flex items-center justify-center text-stone-400 hover:bg-stone-100 hover:text-stone-900 transition-colors shrink-0">
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  </div>
);

// --- MAIN PAGE ---

export default function CatererInboxPage() {
  const [leads, setLeads] = useState(MOCK_LEADS);
  const [searchQuery, setSearchQuery] = useState('');

  const newLeadsCount = leads.filter((l) => l.status === 'New').length;

  // Filter Logic
  const filteredLeads = leads.filter(
    (lead) =>
      lead.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.logistics.event.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full animate-in fade-in duration-500">
      <InboxHeader
        newLeadsCount={newLeadsCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* High-Density Data List Card */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-stone-100 flex flex-col overflow-hidden relative min-h-[400px]">
        {/* Header Row (Desktop Only) */}
        <div className="hidden lg:flex items-center pl-6 pr-6 py-4 border-b border-stone-100 bg-stone-50/50 text-[11px] font-black text-stone-400 uppercase tracking-widest">
          <div className="w-64 pl-4 shrink-0">Customer</div>
          <div className="w-64 shrink-0 pl-6 border-l border-transparent">Logistics</div>
          <div className="w-48 shrink-0 text-right ml-auto">Lead Data</div>
          <div className="w-48 shrink-0"></div> {/* Actions Spacer */}
        </div>

        {/* Lead Rows Container */}
        <div className="flex flex-col w-full h-full divide-y-0">
          {filteredLeads.length > 0 ? (
            filteredLeads.map((lead) => <LeadRow key={lead.id} lead={lead} />)
          ) : (
            /* Empty State */
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center my-auto">
              <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-6">
                <Search className="w-8 h-8 text-[#ef9d2a]" />
              </div>
              <h3 className="text-xl font-black text-stone-900 mb-2">No Leads Found</h3>
              <p className="text-stone-500 font-medium max-w-sm">
                {searchQuery
                  ? 'Try adjusting your search filters.'
                  : 'You have no active leads in your inbox right now.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination Footer */}
      {filteredLeads.length > 0 && (
        <div className="flex items-center justify-between px-4 mt-8">
          <span className="text-sm font-bold text-stone-500">
            Showing 1-{filteredLeads.length} of {leads.length} leads
          </span>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:border-[#ef9d2a] hover:text-[#ef9d2a] transition-colors hover:bg-white shadow-sm">
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
            <button className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:border-[#ef9d2a] hover:text-[#ef9d2a] transition-colors hover:bg-white shadow-sm">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
