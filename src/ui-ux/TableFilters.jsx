import { Filter } from 'lucide-react';

 export const TableFilters = ({ categories, activeCategory, onCategoryChange, activeType, onTypeChange }) => {
  return (
    <div className="space-y-4">
      {/* الفئات الرئيسية */}
      <div className="flex flex-wrap gap-2 bg-white p-4 rounded-2xl shadow-sm border border-zinc-100 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-6 py-3 rounded-xl text-xs font-black transition-all duration-300 ${
              activeCategory === category
                ? 'bg-zinc-900 text-[#D4AF37] shadow-lg scale-105'
                : 'bg-zinc-50 text-zinc-600 border border-zinc-200 hover:bg-zinc-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* الفلتر الفرعي للزيوت */}
      {activeCategory === "زيوت" && (
        <div className="flex items-center gap-4 bg-zinc-900 p-2 rounded-2xl w-fit animate-in fade-in slide-in-from-right-4">
          <div className="flex items-center gap-2 px-3 border-l border-zinc-700 text-zinc-500">
            <Filter size={14} />
            <span className="text-[10px] font-black uppercase tracking-tighter">التعبئة:</span>
          </div>
          <div className="flex gap-1">
            {['الكل', 'سايب', 'جركن'].map((type) => (
              <button
                key={type}
                onClick={() => onTypeChange(type)}
                className={`px-5 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                  activeType === type ? 'bg-[#D4AF37] text-zinc-900' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};