import React, { useState } from 'react';
import {
    CloudUpload,
    Check,
    X,
    ChevronLeft,
    Leaf,
    Bone,
    Flame,
    Plus,
    Minus,
    IndianRupee,
    Image as ImageIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- COMPONENTS ---

// 1. Image Uploader Component
const ImageUploader = ({ images, setImages, mainImageIndex, setMainImageIndex }) => {
    // In a real app, this would handle actual file selection
    const handleUploadClick = () => {
        const dummyImage = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=300&h=300';
        setImages([...images, dummyImage]);
    };

    const handleRemoveImage = (indexToRemove) => {
        const newImages = images.filter((_, idx) => idx !== indexToRemove);
        setImages(newImages);
        if (mainImageIndex === indexToRemove) {
            setMainImageIndex(0); // Reset main to first if current main is deleted
        } else if (mainImageIndex > indexToRemove) {
            setMainImageIndex(mainImageIndex - 1); // Adjust index
        }
    };

    return (
        <section className="flex flex-col gap-6 rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-stone-100">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-stone-900">Visuals</h2>
                <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-bold text-stone-600">Draft</span>
            </div>

            {/* Primary Upload Box */}
            <div
                onClick={handleUploadClick}
                className="group relative flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-stone-200 bg-stone-50 transition-colors hover:border-[#ef9d2a] hover:bg-[#ef9d2a]/5"
            >
                <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-stone-100 group-hover:scale-110 transition-transform">
                    <CloudUpload className="text-[#ef9d2a] w-10 h-10" strokeWidth={1.5} />
                </div>
                <div className="relative z-10 text-center">
                    <p className="text-sm font-bold text-stone-900 group-hover:text-[#ef9d2a] transition-colors">Click to upload</p>
                    <p className="text-xs text-stone-500 font-medium">SVG, PNG, JPG or GIF (max. 5MB)</p>
                </div>
            </div>

            {/* Gallery Thumbnails */}
            {images.length > 0 && (
                <div className="grid grid-cols-4 gap-3">
                    {images.map((img, idx) => (
                        <div
                            key={idx}
                            onClick={() => setMainImageIndex(idx)}
                            className={`relative aspect-square cursor-pointer overflow-hidden rounded-2xl group ${mainImageIndex === idx
                                    ? 'ring-2 ring-[#ef9d2a] ring-offset-2'
                                    : 'opacity-70 hover:opacity-100 border border-stone-200'
                                }`}
                        >
                            <img src={img} alt={`Upload ${idx}`} className="h-full w-full object-cover" />
                            {/* Remove Overlay */}
                            <div
                                onClick={(e) => { e.stopPropagation(); handleRemoveImage(idx); }}
                                className="absolute inset-0 bg-stone-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    ))}
                    {images.length < 4 && (
                        <div
                            onClick={handleUploadClick}
                            className="flex aspect-square cursor-pointer items-center justify-center rounded-2xl border border-stone-200 bg-stone-50 text-stone-400 hover:border-[#ef9d2a] hover:text-[#ef9d2a] transition-colors"
                        >
                            <Plus className="w-6 h-6" />
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

// 2. Tag Input Component (Ingredients)
const TagInput = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            e.preventDefault();
            if (!tags.includes(inputValue.trim())) {
                setTags([...tags, inputValue.trim()]);
            }
            setInputValue('');
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="space-y-3">
            <label className="ml-1 text-sm font-bold text-stone-700">Ingredients</label>
            <div className="relative">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type ingredient and press Enter..."
                    className="w-full rounded-full border-stone-200 bg-stone-50 px-6 py-4 font-medium text-stone-900 placeholder:text-stone-400 focus:border-[#ef9d2a] focus:ring-[#ef9d2a] outline-none transition-all"
                />
            </div>
            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3 p-4 rounded-3xl border border-stone-100 bg-white">
                    {tags.map((tag, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-1.5 rounded-full bg-[#ef9d2a]/10 py-1.5 pl-4 pr-2 text-sm font-bold text-[#b57315] animate-fade-in"
                        >
                            {tag}
                            <button
                                onClick={() => removeTag(tag)}
                                className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ef9d2a]/20 text-[#b57315] hover:bg-[#ef9d2a] hover:text-white transition-colors"
                            >
                                <X className="w-3 h-3" strokeWidth={3} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


// 3. Main Dish Editor Component
const DishEditor = () => {
    // Form States
    const [dishName, setDishName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [basePrice, setBasePrice] = useState('0');
    const [minQuantity, setMinQuantity] = useState(1);

    // Complex States
    const [images, setImages] = useState([]);
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const [dietaryType, setDietaryType] = useState('veg'); // 'veg', 'non-veg', 'vegan'
    const [spiceLevel, setSpiceLevel] = useState('mild'); // 'mild', 'medium', 'hot'
    const [ingredients, setIngredients] = useState([]);

    const handleQuantityChange = (delta) => {
        setMinQuantity(prev => Math.max(1, prev + delta));
    };

    return (
        <div className="min-h-screen bg-[#fcfaf8] font-['Plus_Jakarta_Sans',sans-serif] text-stone-900 selection:bg-[#ef9d2a]/30">

            {/* Top Bar Wrapper / Header Context */}
            <header className="sticky top-0 z-20 flex h-20 items-center border-b border-stone-100 bg-white/80 px-4 sm:px-8 backdrop-blur-md w-full max-w-7xl mx-auto">
                <div className="flex items-center gap-2 text-sm font-bold">
                    <Link to="/caterer/menus" className="text-stone-400 transition-colors hover:text-[#ef9d2a] flex items-center gap-1">
                        <ChevronLeft className="w-4 h-4" />
                        Menu List
                    </Link>
                    <span className="text-stone-300">/</span>
                    <span className="text-stone-900">Add New Dish</span>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 p-4 sm:p-8 pb-32">

                {/* Page Header & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 animate-fade-in-up">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-stone-900 mb-2">
                            Add New Dish
                        </h1>
                        <p className="text-stone-500 font-medium">Create a new item for your menu packages.</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        <Link to="/caterer/menus" className="rounded-full border border-stone-200 bg-white px-6 py-3 text-sm font-bold text-stone-700 hover:bg-stone-50 transition-colors">
                            Cancel
                        </Link>
                        <button className="flex items-center gap-2 rounded-full bg-[#ef9d2a] px-8 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-[#d98a1e] hover:-translate-y-0.5 active:translate-y-0">
                            <Check className="w-5 h-5" strokeWidth={3} />
                            Save Dish
                        </button>
                    </div>
                </div>

                {/* Left/Right Grid Layout */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 animate-fade-in delay-100">

                    {/* LEFT COLUMN: Visuals & Pricing (col-span-1) */}
                    <div className="flex flex-col gap-8 lg:col-span-1">
                        <ImageUploader
                            images={images}
                            setImages={setImages}
                            mainImageIndex={mainImageIndex}
                            setMainImageIndex={setMainImageIndex}
                        />

                        {/* Pricing Card */}
                        <section className="flex flex-col gap-6 rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-stone-100">
                            <h2 className="text-lg font-bold text-stone-900">Pricing Configuration</h2>

                            {/* Base Price */}
                            <div className="space-y-2">
                                <label className="ml-1 text-xs font-bold text-stone-700 uppercase tracking-wide">Base Price</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={basePrice}
                                        onChange={(e) => setBasePrice(e.target.value)}
                                        className="block w-full rounded-full border-stone-200 bg-stone-50 px-5 py-4 pl-12 text-xl font-black text-stone-900 focus:border-[#ef9d2a] focus:ring-[#ef9d2a] outline-none transition-all"
                                    />
                                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                                </div>
                            </div>

                            {/* Min Quantity Selector */}
                            <div className="space-y-2 mt-2">
                                <label className="ml-1 text-xs font-bold text-stone-700 uppercase tracking-wide">Min. Order Quantity</label>
                                <div className="flex items-center gap-4 bg-stone-50 p-2 rounded-full border border-stone-100 w-max mx-auto sm:mx-0">
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm text-stone-600 hover:text-[#ef9d2a] transition-colors"
                                    >
                                        <Minus className="w-4 h-4" strokeWidth={3} />
                                    </button>
                                    <span className="w-12 text-center text-xl font-black text-stone-900 select-none">
                                        {minQuantity}
                                    </span>
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm text-stone-600 hover:text-[#ef9d2a] transition-colors"
                                    >
                                        <Plus className="w-4 h-4" strokeWidth={3} />
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* RIGHT COLUMN: Dish Details (col-span-2) */}
                    <div className="flex flex-col gap-6 lg:col-span-2">
                        <section className="flex flex-col gap-8 rounded-[1.5rem] bg-white p-6 sm:p-8 shadow-sm ring-1 ring-stone-100">
                            <h2 className="text-xl font-bold text-stone-900 border-b border-stone-100 pb-4">Dish Details</h2>

                            <div className="space-y-6">
                                {/* Details Input Row */}
                                <div className="space-y-2">
                                    <label className="ml-1 text-sm font-bold text-stone-700">Dish Name</label>
                                    <input
                                        type="text"
                                        value={dishName}
                                        onChange={(e) => setDishName(e.target.value)}
                                        placeholder="E.g., Authentic Hyderabadi Biryani"
                                        className="w-full rounded-full border-stone-200 bg-stone-50 px-6 py-4 font-bold text-lg text-stone-900 placeholder:text-stone-400 focus:border-[#ef9d2a] focus:ring-[#ef9d2a] outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="ml-1 text-sm font-bold text-stone-700">Description</label>
                                    <textarea
                                        rows="4"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Describe the dish, its preparation, and what makes it special..."
                                        className="w-full resize-none rounded-3xl border-stone-200 bg-stone-50 px-6 py-5 font-medium text-stone-900 placeholder:text-stone-400 focus:border-[#ef9d2a] focus:ring-[#ef9d2a] outline-none transition-all"
                                    />
                                </div>

                                {/* Selectors Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                                    <div className="space-y-2">
                                        <label className="ml-1 text-sm font-bold text-stone-700">Category</label>
                                        <select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full appearance-none rounded-full border-stone-200 bg-stone-50 px-6 py-4 font-bold text-stone-900 focus:border-[#ef9d2a] focus:ring-[#ef9d2a] outline-none transition-all"
                                        >
                                            <option value="" disabled>Select Category</option>
                                            <option value="starters">Starters</option>
                                            <option value="main-course">Main Course</option>
                                            <option value="desserts">Desserts</option>
                                            <option value="drinks">Beverages</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="ml-1 text-sm font-bold text-stone-700">Cuisine</label>
                                        <select
                                            value={cuisine}
                                            onChange={(e) => setCuisine(e.target.value)}
                                            className="w-full appearance-none rounded-full border-stone-200 bg-stone-50 px-6 py-4 font-bold text-stone-900 focus:border-[#ef9d2a] focus:ring-[#ef9d2a] outline-none transition-all"
                                        >
                                            <option value="" disabled>Select Cuisine</option>
                                            <option value="indian">Indian</option>
                                            <option value="chinese">Chinese</option>
                                            <option value="italian">Italian</option>
                                            <option value="continental">Continental</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="h-px bg-stone-100 my-4"></div>

                                {/* Dietary Preference Pills */}
                                <div className="space-y-3">
                                    <label className="ml-1 text-sm font-bold text-stone-700">Dietary Type</label>
                                    <div className="flex flex-wrap gap-3">
                                        {/* Veg */}
                                        <button
                                            onClick={() => setDietaryType('veg')}
                                            className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-all ${dietaryType === 'veg'
                                                    ? 'bg-[#ef9d2a] text-white shadow-md'
                                                    : 'border border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                                                }`}
                                        >
                                            <Leaf className="w-5 h-5" />
                                            Vegetarian
                                        </button>
                                        {/* Non-Veg */}
                                        <button
                                            onClick={() => setDietaryType('non-veg')}
                                            className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-all ${dietaryType === 'non-veg'
                                                    ? 'bg-[#ef9d2a] text-white shadow-md'
                                                    : 'border border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                                                }`}
                                        >
                                            <Bone className="w-5 h-5" />
                                            Non-Vegetarian
                                        </button>
                                        {/* Vegan */}
                                        <button
                                            onClick={() => setDietaryType('vegan')}
                                            className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-all ${dietaryType === 'vegan'
                                                    ? 'bg-[#ef9d2a] text-white shadow-md'
                                                    : 'border border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                                                }`}
                                        >
                                            <Leaf className="w-5 h-5" />
                                            Vegan
                                        </button>
                                    </div>
                                </div>

                                {/* Spice Level Bar */}
                                <div className="space-y-3 pt-4 border-t border-stone-50">
                                    <label className="ml-1 text-sm font-bold text-stone-700">Spice Level</label>
                                    <div className="flex bg-stone-50 p-1.5 rounded-full w-max border border-stone-100">
                                        <button
                                            onClick={() => setSpiceLevel('mild')}
                                            className={`flex flex-col items-center justify-center w-24 py-2 rounded-full transition-all ${spiceLevel === 'mild' ? 'bg-white shadow-sm ring-1 ring-stone-200/50' : 'text-stone-400 hover:text-stone-600'
                                                }`}
                                        >
                                            <Flame className={`w-5 h-5 ${spiceLevel === 'mild' ? 'text-[#ef9d2a]' : ''}`} />
                                            <span className={`text-[10px] uppercase tracking-wider font-bold mt-1 ${spiceLevel === 'mild' ? 'text-[#ef9d2a]' : ''}`}>Mild</span>
                                        </button>
                                        <button
                                            onClick={() => setSpiceLevel('medium')}
                                            className={`flex flex-col items-center justify-center w-24 py-2 rounded-full transition-all ${spiceLevel === 'medium' ? 'bg-white shadow-sm ring-1 ring-stone-200/50' : 'text-stone-400 hover:text-stone-600'
                                                }`}
                                        >
                                            <div className="flex">
                                                <Flame className={`w-5 h-5 ${spiceLevel === 'medium' ? 'text-[#ef9d2a]' : ''}`} />
                                                <Flame className={`w-5 h-5 -ml-2 ${spiceLevel === 'medium' ? 'text-[#ef9d2a]' : ''}`} />
                                            </div>
                                            <span className={`text-[10px] uppercase tracking-wider font-bold mt-1 ${spiceLevel === 'medium' ? 'text-[#ef9d2a]' : ''}`}>Medium</span>
                                        </button>
                                        <button
                                            onClick={() => setSpiceLevel('hot')}
                                            className={`flex flex-col items-center justify-center w-24 py-2 rounded-full transition-all ${spiceLevel === 'hot' ? 'bg-white shadow-sm ring-1 ring-stone-200/50' : 'text-stone-400 hover:text-stone-600'
                                                }`}
                                        >
                                            <div className="flex">
                                                <Flame className={`w-5 h-5 ${spiceLevel === 'hot' ? 'text-red-500' : ''}`} />
                                                <Flame className={`w-5 h-5 -ml-2 ${spiceLevel === 'hot' ? 'text-red-500' : ''}`} />
                                                <Flame className={`w-5 h-5 -ml-2 ${spiceLevel === 'hot' ? 'text-red-500' : ''}`} />
                                            </div>
                                            <span className={`text-[10px] uppercase tracking-wider font-bold mt-1 ${spiceLevel === 'hot' ? 'text-red-500' : ''}`}>Hot</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Ingredients Section */}
                        <section className="flex flex-col gap-6 rounded-[1.5rem] bg-white p-6 sm:p-8 shadow-sm ring-1 ring-stone-100">
                            <TagInput tags={ingredients} setTags={setIngredients} />
                        </section>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default DishEditor;
