import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Home, ArrowRight } from 'lucide-react';

function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 font-sans" dir="rtl">
            <div className="max-w-md w-full text-center space-y-8">
                
                {/* أيقونة التحذير مع تأثير إضاءة ذهبي */}
                <div className="relative inline-block">
                    <div className="absolute inset-0 bg-[#D4AF37] blur-[60px] opacity-20 rounded-full"></div>
                    <div className="relative bg-zinc-900 border border-zinc-800 p-8 rounded-[2.5rem] shadow-2xl">
                        <AlertTriangle size={80} className="text-[#D4AF37] animate-pulse" strokeWidth={1.5} />
                    </div>
                </div>

                {/* النصوص */}
                <div className="space-y-3">
                    <h1 className="text-7xl font-black text-white tracking-tighter">404</h1>
                    <h2 className="text-2xl font-bold text-zinc-300">عذراً، الصفحة غير موجودة</h2>
                    <p className="text-zinc-500 text-sm leading-relaxed">
                        يبدو أن الرابط الذي تحاول الوصول إليه غير صحيح أو تم نقله لمكان آخر. 
                        لا تقلق، يمكنك العودة دائماً لنقطة البيع.
                    </p>
                </div>

                {/* أزرار التنقل */}
                <div className="flex flex-col gap-3 pt-4">
                    <button 
                        onClick={() => navigate('/pos')}
                        className="w-full bg-[#D4AF37] hover:bg-white text-zinc-900 py-4 rounded-2xl font-black transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-[#D4AF37]/10 group"
                    >
                        <Home size={20} />
                        العودة للرئيسية
                    </button>
                    
                    <button 
                        onClick={() => navigate(-1)}
                        className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3"
                    >
                        الرجوع للخلف
                        <ArrowRight size={18} />
                    </button>
                </div>

                {/* Footer بسيط */}
                <p className="text-zinc-700 text-[10px] font-bold uppercase tracking-widest pt-8">
                    نظام سيجل لإدارة الزيوت • PREMIUM POS
                </p>
            </div>
        </div>
    );
}

export default NotFoundPage;