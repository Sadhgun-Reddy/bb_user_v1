import React, { useState } from 'react';
import {
  Check,
  ShieldAlert,
  ImagePlus,
  CloudUpload,
  Clock,
  MapPin,
  Building2,
  ShieldCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

// --- TYPES ---
export type SettingsTab = 'Basic Info' | 'Location' | 'Operations' | 'Verification';

interface CatererSettingsInputs {
  businessName: string;
  tagline: string;
  about: string;
}

// --- MOCK DATA ---
const INITIAL_DATA: CatererSettingsInputs = {
  businessName: 'Royal Feast Caterers',
  tagline: 'Premium North Indian & Fusion Cuisine',
  about:
    'We specialize in large-scale wedding events and corporate functions. With over 15 years of experience, our team of expert chefs delivers authentic flavors with modern presentation.',
};

// --- SUB-COMPONENTS ---

const SettingsHeader: React.FC = () => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full mb-8">
    <div className="flex flex-col gap-1">
      <h1 className="text-3xl font-black text-stone-900 tracking-tight">Profile Settings</h1>
      <p className="text-stone-500 font-medium">
        Manage your caterer identity and operational preferences.
      </p>
    </div>
    <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#ef9d2a] hover:bg-[#d98a1e] text-white font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 active:scale-95 transition-all shrink-0">
      <Check className="w-4 h-4" strokeWidth={3} />
      Save Changes
    </button>
  </div>
);

const AlertBanner: React.FC = () => (
  <div className="w-full bg-orange-50 rounded-2xl p-4 flex items-center gap-4 mb-8 border border-orange-100/50">
    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[#ef9d2a] shrink-0">
      <ShieldAlert className="w-5 h-5" />
    </div>
    <div className="flex flex-col flex-1">
      <span className="text-sm font-black text-stone-900">Verification Pending</span>
      <span className="text-sm font-medium text-slate-600">
        Your FSSAI and Registration documents are currently under review.
      </span>
    </div>
    <button className="hidden sm:block text-sm font-bold text-[#ef9d2a] hover:text-[#d98a1e] transition-colors whitespace-nowrap">
      View Status
    </button>
  </div>
);

interface TabNavigationProps {
  activeTab: SettingsTab;
  setActiveTab: (tab: SettingsTab) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
    { id: 'Basic Info', label: 'Basic Info', icon: Building2 },
    { id: 'Location', label: 'Location', icon: MapPin },
    { id: 'Operations', label: 'Operations', icon: Clock },
    { id: 'Verification', label: 'Verification', icon: ShieldCheck },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide border-b border-slate-100">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm transition-all whitespace-nowrap ${isActive
              ? 'bg-slate-900 text-white font-bold shadow-md'
              : 'text-slate-500 hover:text-slate-900 font-medium hover:bg-slate-50'
              }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-white/80' : 'text-slate-400'}`} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

interface BasicInfoTabProps {
  formData: CatererSettingsInputs;
  setFormData: (data: CatererSettingsInputs) => void;
}

const BasicInfoTab: React.FC<BasicInfoTabProps> = ({ formData, setFormData }) => {
  const { register, handleSubmit, watch } = useForm<Partial<CatererSettingsInputs>>({
    defaultValues: formData,
  });

  const onSubmit: SubmitHandler<Partial<CatererSettingsInputs>> = (data) => {
    setFormData({ ...formData, ...(data as CatererSettingsInputs) });
    console.log('Saved data:', data);
  };

  const aboutCharacterCount = watch('about')?.length || 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10 mt-8 animate-in fade-in duration-500">
      {/* Visual Media Section */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-black text-stone-900 hidden">Media</h3>{' '}
        {/* Optional Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Brand Logo (Col 1) */}
          <div className="col-span-1 flex flex-col gap-3">
            <label className="text-sm font-bold text-stone-900 ml-2">Brand Logo</label>
            <div className="aspect-square w-full sm:max-w-[240px] md:max-w-none border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50 hover:bg-orange-50/30 hover:border-[#ef9d2a]/30 transition-all flex flex-col items-center justify-center cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#ef9d2a] mb-3 group-hover:scale-110 transition-transform">
                <ImagePlus className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-stone-600 group-hover:text-[#ef9d2a] transition-colors">
                Upload Logo
              </span>
              <span className="text-xs font-medium text-slate-400 mt-1">500x500px min</span>
            </div>
          </div>

          {/* Cover Image (Cols 2-3) */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
            <label className="text-sm font-bold text-stone-900 ml-2">Cover Image (Banner)</label>
            <div className="aspect-[2/1] w-full border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50 hover:bg-orange-50/30 hover:border-[#ef9d2a]/30 transition-all flex flex-col items-center justify-center cursor-pointer group relative overflow-hidden">
              <div className="flex flex-col items-center justify-center z-10 relative pointer-events-none">
                <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center text-[#ef9d2a] mb-4 group-hover:-translate-y-1 transition-transform duration-300">
                  <CloudUpload className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-stone-600 group-hover:text-[#ef9d2a] transition-colors">
                  Drag and drop or browse
                </span>
                <span className="text-xs font-medium text-slate-400 mt-1">
                  Ratio 2:1 (1200x600px recommended)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Fields Section */}
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-stone-900 ml-2">
              Business Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('businessName', { required: true })}
              className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-semibold text-stone-900 focus:ring-2 focus:ring-[#ef9d2a]/20 outline-none transition-shadow"
              placeholder="e.g. Royal Feast Caterers"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-stone-900 ml-2">Tagline (Optional)</label>
            <input
              type="text"
              {...register('tagline')}
              className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-semibold text-stone-900 focus:ring-2 focus:ring-[#ef9d2a]/20 outline-none transition-shadow"
              placeholder="e.g. Premium Cuisine Delivered"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between ml-2 mb-1">
            <label className="text-sm font-bold text-stone-900">About the Caterer</label>
            <span className="text-xs font-bold text-slate-400">{aboutCharacterCount}/500</span>
          </div>
          <textarea
            {...register('about')}
            rows={5}
            maxLength={500}
            className="w-full bg-slate-50 border-none rounded-2xl p-6 text-sm font-semibold text-stone-900 focus:ring-2 focus:ring-[#ef9d2a]/20 outline-none transition-shadow resize-none leading-relaxed"
            placeholder="Describe your specialties, history, and what makes your service unique..."
          ></textarea>
        </div>
      </div>
      <button type="submit" className="hidden">Save</button>
    </form>
  );
};

// --- MAIN PAGE ---

export default function CatererSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('Basic Info');
  const [formData, setFormData] = useState<CatererSettingsInputs>(INITIAL_DATA);

  return (
    <div className="w-full min-h-screen bg-[#fcfaf8] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#ef9d2a]/30 pb-24 animate-in fade-in duration-500">
      {/* Dashboard Fluid Content Wrapper */}
      <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 pl-4">
        <SettingsHeader />

        {/* Massive Main Card Container */}
        <div className="bg-white rounded-[2.5rem] p-6 lg:p-10 shadow-sm border border-slate-100 flex flex-col">
          <AlertBanner />

          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Content Router */}
          {activeTab === 'Basic Info' && <BasicInfoTab formData={formData} setFormData={setFormData} />}

          {activeTab === 'Location' && (
            <div className="py-20 flex flex-col items-center justify-center text-center animate-in fade-in">
              <MapPin className="w-12 h-12 text-slate-200 mb-4" />
              <h3 className="text-xl font-black text-stone-900 mb-2">Location Settings</h3>
              <p className="text-slate-500 font-medium">
                Configure your service area and delivery radius here.
              </p>
            </div>
          )}

          {activeTab === 'Operations' && (
            <div className="py-20 flex flex-col items-center justify-center text-center animate-in fade-in">
              <Clock className="w-12 h-12 text-slate-200 mb-4" />
              <h3 className="text-xl font-black text-stone-900 mb-2">Operating Hours</h3>
              <p className="text-slate-500 font-medium">
                Set your weekly availability and holiday schedules.
              </p>
            </div>
          )}

          {activeTab === 'Verification' && (
            <div className="py-20 flex flex-col items-center justify-center text-center animate-in fade-in">
              <ShieldCheck className="w-12 h-12 text-slate-200 mb-4" />
              <h3 className="text-xl font-black text-stone-900 mb-2">Compliance & Verification</h3>
              <p className="text-slate-500 font-medium">
                Manage FSSAI licenses, tax documents, and payout accounts.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
