import { Droplet } from 'lucide-react';

export const LoadingState = () => (
  <div className="flex flex-col justify-center items-center py-32 gap-6">
    <div className="relative">
      <div className="h-20 w-20 rounded-full border-4 border-zinc-100 border-t-[#D4AF37] animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Droplet className="text-[#D4AF37] animate-bounce" size={24} />
      </div>
    </div>
    <p className="text-zinc-400 font-bold text-sm tracking-[0.2em] animate-pulse uppercase">
      جاري جلب بيانات المخزن...
    </p>
  </div>
);