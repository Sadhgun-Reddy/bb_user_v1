import React, { useState } from 'react';
import {
    CheckCircle2,
    Plus,
    Utensils,
    Edit2,
    Image as ImageIcon
} from 'lucide-react';

// --- MOCK DATA ---
const INITIAL_MENUS = [
    {
        id: 'm1',
        title: 'Grand Wedding Feast',
        category: 'Buffet',
        description: 'A luxurious spread featuring 12 premium items including live counters.',
        itemCount: 12,
        pricePerPlate: 25,
        status: 'published',
        isPublic: true,
        images: [
            'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=200&h=200',
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=200&h=200'
        ],
        additionalImagesCount: 9
    },
    {
        id: 'm2',
        title: 'Corporate Premium',
        category: 'Lunch Box',
        description: 'Efficient, tasty, and easy to eat meals designed for office meetings.',
        itemCount: 5,
        pricePerPlate: 12,
        status: 'published',
        isPublic: true,
        images: [
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=200&h=200',
            'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=200&h=200'
        ],
        additionalImagesCount: 3
    },
    {
        id: 'm3',
        title: 'Birthday Bash',
        category: 'Kids Special',
        description: 'Kid-friendly menu with pizzas, cakes, and fun finger foods.',
        itemCount: 8,
        pricePerPlate: 18,
        status: 'published',
        isPublic: true,
        images: [
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=200&h=200',
            'https://images.unsplash.com/photo-1578985545062-69928b1ea6e6?auto=format&fit=crop&q=80&w=200&h=200'
        ],
        additionalImagesCount: 6
    },
    {
        id: 'm4',
        title: 'Evening Snacks',
        category: 'High Tea',
        description: 'Selection of teas, coffees, and light savory snacks.',
        itemCount: 4,
        pricePerPlate: 8,
        status: 'draft',
        isPublic: false,
        images: [
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=200&h=200',
            null // Representing a missing image
        ],
        additionalImagesCount: 0
    }
];

// --- COMPONENTS ---

const MenuPackageCard = ({ menu, onToggle }) => {
    const isDraft = menu.status === 'draft';

    return (
        <div className={`group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-[#ef9d2a]/20 relative flex flex-col h-full ${isDraft ? 'opacity-80' : ''}`}>

            {/* Top Absolute Badge */}
            <div className="absolute top-6 right-6 z-10">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${isDraft
                        ? 'bg-stone-100 text-stone-600'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                    {menu.status === 'published' ? 'Published' : 'Draft'}
                </span>
            </div>

            {/* Avatar Group (Images) */}
            <div className={`flex -space-x-4 mb-6 pt-2 pl-2 ${isDraft ? 'filter grayscale opacity-70' : ''}`}>
                {/* Image 1 */}
                <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-sm z-30 bg-stone-100 flex items-center justify-center">
                    {menu.images[0] ? (
                        <img src={menu.images[0]} alt="Dish 1" className="w-full h-full object-cover" />
                    ) : (
                        <ImageIcon className="w-6 h-6 text-stone-300" />
                    )}
                </div>
                {/* Image 2 */}
                <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-sm z-20 bg-stone-100 flex items-center justify-center">
                    {menu.images[1] ? (
                        <img src={menu.images[1]} alt="Dish 2" className="w-full h-full object-cover" />
                    ) : (
                        <ImageIcon className="w-6 h-6 text-stone-300" />
                    )}
                </div>
                {/* Count Indicator */}
                {menu.additionalImagesCount > 0 ? (
                    <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-sm z-10 bg-stone-100 flex items-center justify-center">
                        <span className="text-xs font-bold text-stone-500">+{menu.additionalImagesCount}</span>
                    </div>
                ) : (
                    <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-sm z-10 bg-stone-50 flex items-center justify-center">
                    </div>
                )}
            </div>

            {/* Content Payload */}
            <div className="flex-1 mb-4">
                <span className="text-[#ef9d2a] text-[10px] font-black uppercase tracking-wider mb-1.5 block">
                    {menu.category}
                </span>
                <h3 className="text-xl font-bold text-stone-900 leading-tight mb-2">
                    {menu.title}
                </h3>
                <p className="text-stone-500 text-sm line-clamp-2 leading-relaxed font-medium">
                    {menu.description}
                </p>
            </div>

            {/* Statistics Row */}
            <div className="flex items-center gap-4 py-4 border-t border-stone-100 mb-4 mt-auto">
                <div className="flex items-center gap-1.5">
                    <Utensils className="w-4 h-4 text-stone-400" />
                    <span className="text-sm font-bold text-stone-700">{menu.itemCount} Items</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-stone-300"></div>
                <div className="flex items-baseline gap-1">
                    <span className="text-base font-black text-[#ef9d2a]">${menu.pricePerPlate}</span>
                    <span className="text-xs text-stone-400 font-bold uppercase tracking-wide">/ plate</span>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between">
                {/* Toggle Logic */}
                <div className={`flex items-center gap-2 ${isDraft ? 'opacity-60' : ''}`}>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={menu.isPublic}
                            onChange={() => onToggle(menu.id)}
                        />
                        <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ef9d2a]"></div>
                    </label>
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">
                        {menu.isPublic ? 'Public' : 'Hidden'}
                    </span>
                </div>

                {/* Edit Action */}
                <button className="text-stone-400 hover:text-[#ef9d2a] hover:bg-[#ef9d2a]/10 p-2 rounded-full transition-colors">
                    <Edit2 className="w-4 h-4" strokeWidth={2.5} />
                </button>
            </div>

        </div>
    );
};

const AddNewPlaceholder = () => {
    return (
        <div className="group bg-transparent rounded-2xl p-6 border-2 border-dashed border-stone-200 flex flex-col items-center justify-center min-h-[360px] cursor-pointer hover:border-[#ef9d2a]/50 hover:bg-[#ef9d2a]/5 transition-all">
            <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Plus className="text-[#ef9d2a] w-8 h-8" strokeWidth={3} />
            </div>
            <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#ef9d2a] transition-colors">
                Create New Menu
            </h3>
            <p className="text-stone-500 text-sm mt-2 text-center font-medium">
                Start from scratch or use a template
            </p>
        </div>
    );
};

const MenuManagement = () => {
    const [menus, setMenus] = useState(INITIAL_MENUS);

    const handleTogglePublic = (menuId) => {
        setMenus(menus.map(menu => {
            if (menu.id === menuId) {
                // Determine new status based on current isPublic state
                // If it was public, now hidden (draft). If hidden, now public (published)
                const newIsPublic = !menu.isPublic;
                return {
                    ...menu,
                    isPublic: newIsPublic,
                    status: newIsPublic ? 'published' : 'draft'
                };
            }
            return menu;
        }));
    };

    const activeMenusCount = menus.filter(m => m.status === 'published').length;

    return (
        <div className="min-h-screen bg-[#fcfaf8] font-['Plus_Jakarta_Sans',sans-serif] text-stone-900 selection:bg-[#ef9d2a]/30 p-4 sm:p-8 w-full max-w-7xl mx-auto">

            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 animate-fade-in-up">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-stone-900 tracking-tight mb-2">
                        Menu Management
                    </h1>
                    <div className="flex items-center gap-2 text-stone-500">
                        <CheckCircle2 className="w-5 h-5 text-[#ef9d2a]" strokeWidth={2.5} />
                        <span className="text-sm font-medium">
                            Active Menus: <strong className="text-stone-900 ml-1">{activeMenusCount}</strong> / 10
                        </span>
                    </div>
                </div>

                <button className="bg-[#ef9d2a] hover:bg-[#d98a1e] text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 shrink-0">
                    <Plus className="w-5 h-5" strokeWidth={3} />
                    Create New Menu
                </button>
            </div>

            {/* Grid Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 animate-fade-in delay-100">
                {menus.map(menu => (
                    <MenuPackageCard
                        key={menu.id}
                        menu={menu}
                        onToggle={handleTogglePublic}
                    />
                ))}

                {/* Last slot is always the create new trigger */}
                <AddNewPlaceholder />
            </div>

        </div>
    );
};

export default MenuManagement;
