import React from 'react';
import { Layers, ArrowRight } from 'lucide-react';

const ProductCard = ({ product, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(product)}
      className="group relative bg-white rounded-[2rem] border border-zinc-100 p-5 shadow-sm hover:shadow-2xl hover:shadow-[#D4AF37]/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-zinc-50 rounded-full group-hover:bg-[#D4AF37]/5 transition-colors" />
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-5">
          <div className="bg-zinc-900 text-[#D4AF37] p-3 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
            <Layers size={20} />
          </div>
          <div className="text-left">
            <span className="block text-[10px] font-black text-[#D4AF37] uppercase">
              {product.category?.name || 'عام'}
            </span>
          </div>
        </div>
        <h3 className="font-black text-zinc-800 text-sm mb-1 line-clamp-2 h-10 group-hover:text-[#D4AF37] transition-colors">
          {product.name}
        </h3>
        <div className="flex justify-end pt-4 border-t border-zinc-50">
          <div className="bg-zinc-50 text-zinc-400 p-2.5 rounded-xl group-hover:bg-[#D4AF37] group-hover:text-zinc-900 transition-all">
            <ArrowRight size={18} className="rotate-180" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;