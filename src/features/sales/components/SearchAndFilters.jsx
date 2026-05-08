import React from 'react';
import { Barcode } from 'lucide-react';

const SearchAndFilters = ({
    searchTerm,
    setSearchTerm,
    searchRef,
    categories,
    selectedCategory,
    setSelectedCategory,
    subFilters,
    selectedSubFilter,
    setSelectedSubFilter
}) => {
    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-zinc-100 mb-6 space-y-4">
            {/* search and barcode input */}
            <div className="relative group">
                <Barcode className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#D4AF37]" size={22} />
                <input
                    ref={searchRef}
                    type="text"
                    placeholder="امسح الباركود أو ابحث عن منتج..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-2xl pr-14 py-4 text-lg font-bold focus:border-[#D4AF37] outline-none transition-all"
                />
            </div>

            {/* btn categories */}
            <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => { setSelectedCategory(cat); setSelectedSubFilter("الكل"); }}
                        className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${selectedCategory === cat ? 'bg-zinc-900 text-[#D4AF37]' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/*btn brands*/}
            {subFilters.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar border-t border-zinc-50 pt-3">
                    {subFilters.map(brand => (
                        <button
                            key={brand}
                            onClick={() => setSelectedSubFilter(brand)}
                            className={`px-4 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all ${selectedSubFilter === brand ? 'bg-[#D4AF37] text-zinc-900' : 'bg-white border border-zinc-200 text-zinc-500 hover:border-[#D4AF37]'
                                }`}
                        >
                            {brand}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchAndFilters;