import React from 'react';
import { Box, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyState = ({ onAdd }) => {
  return (
    <div className="text-center py-20 bg-zinc-50/50 rounded-[3rem] border-2 border-dashed border-zinc-200 m-6 animate-in fade-in zoom-in duration-500">
      {/* الأيقونة */}
      <div className="bg-white w-20 h-20 rounded-3xl shadow-inner flex items-center justify-center mx-auto mb-6 text-zinc-300">
        <Box size={40} className="animate-pulse" />
      </div>

      {/* النصوص */}
      <h3 className="text-zinc-800 text-xl font-black mb-2">
        المخزن فارغ تماماً
      </h3>
      <p className="text-zinc-500 mb-8 max-w-xs mx-auto text-sm leading-relaxed">
        لم يتم إضافة أي منتجات حتى الآن. ابدأ ببناء مخزنك وإضافة أول منتج لك الآن.
      </p>

      {/* زر الإضافة */}
      <Link
        to={"/add-products"}
        className="bg-zinc-900 w-60 text-white px-10 py-4 rounded-2xl font-black text-sm hover:bg-[#D4AF37] hover:text-zinc-900 transition-all flex items-center gap-3 mx-auto shadow-2xl hover:scale-105 active:scale-95"
      >
        <Plus size={20} />
        إضافة أول منتج للمخزن
      </Link>
    </div>
  );
};

export default EmptyState;