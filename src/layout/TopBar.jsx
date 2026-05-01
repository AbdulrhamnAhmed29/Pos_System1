import { useState, useEffect, useRef } from 'react'
import { ExternalLink, Bell, AlertCircle, Clock, CheckCircle2, Info } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const TopBar = () => {
    const location = useLocation();
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const notifRef = useRef(null);

    const notifications = [
        { id: 1, title: 'طلب جديد', desc: 'تم استلام طلب جديد رقم #1205', time: 'منذ دقيقتين', type: 'success' },
        { id: 2, title: 'نقص في المخزون', desc: 'منتج "زيت موبيل 1" اقترب من النفاد', time: 'منذ ساعة', type: 'warning' },
        { id: 3, title: 'تحديث النظام', desc: 'تم تحديث نظام سِجل للنسخة 2.0', time: 'منذ يوم', type: 'info' },
    ];

    const pageTitles = {
        '/dashboard': 'لوحة الإحصائيات',
        '/sellspoint': 'نقطة البيع السريعة',
        '/products': 'إدارة المنتجات',
        '/add': 'إضافة منتج جديد',
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setIsNotifOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getNotifStyles = (type) => {
        switch (type) {
            case 'success': return { icon: <CheckCircle2 size={14} />, bg: 'bg-emerald-50', text: 'text-emerald-600' };
            case 'warning': return { icon: <AlertCircle size={14} />, bg: 'bg-amber-50', text: 'text-amber-600' };
            default: return { icon: <Info size={14} />, bg: 'bg-blue-50', text: 'text-blue-600' };
        }
    };

    return (
        <header
            dir="rtl"
            className="fixed top-0 left-0 right-0 lg:right-64 h-20 z-40 flex items-center justify-between px-6 lg:px-10 
                       bg-white/90 backdrop-blur-xl border-b border-zinc-100 transition-all duration-300"
        >
            {/* جهة اليمين - العنوان الذكي */}
            <div className="flex items-center gap-4">
                <div className="flex flex-col text-right border-r-4 border-[#D4AF37] pr-4 py-1">
                    <h1 className="text-lg font-black text-zinc-900 tracking-tight leading-none">
                        {pageTitles[location.pathname] || 'الرئيسية'}
                    </h1>
                    <p className="text-[10px] text-zinc-400 font-bold tracking-[0.15em] uppercase mt-1 opacity-80">
                        سِـجِـل | PREMIUM POS
                    </p>
                </div>
            </div>

            {/* جهة اليسار - الأكشنز */}
            <div className="flex items-center gap-5">
                <div className="flex items-center gap-3 relative" ref={notifRef}>
                    
                    {/* زر التنبيهات الأبيض الشيك */}
                    <button 
                        onClick={() => setIsNotifOpen(!isNotifOpen)}
                        className={`relative p-3 rounded-2xl transition-all duration-300 group ${
                            isNotifOpen 
                            ? 'bg-zinc-900 text-white shadow-2xl shadow-zinc-300' 
                            : 'bg-zinc-50 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 border border-zinc-100'
                        }`}
                    >
                        <Bell size={20} className={isNotifOpen ? '' : 'group-hover:rotate-12 transition-transform'} />
                        <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-[#D4AF37] border-2 border-white rounded-full"></span>
                    </button>

                    {/* قائمة الإشعارات (White Premium Style) */}
                    {isNotifOpen && (
                        <div className="absolute top-16 left-0 w-[340px] bg-white border border-zinc-100 shadow-[0_30px_90px_rgba(0,0,0,0.12)] rounded-[2rem] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                            <div className="p-5 border-b border-zinc-50 bg-white flex items-center justify-between">
                                <span className="text-sm font-black text-zinc-900">التنبيهات الأخيرة</span>
                                <span className="text-[10px] bg-zinc-900 text-white px-3 py-1.5 rounded-full font-bold">3 جديدة</span>
                            </div>
                            
                            <div className="max-h-[380px] overflow-y-auto">
                                {notifications.map((notif) => {
                                    const style = getNotifStyles(notif.type);
                                    return (
                                        <div key={notif.id} className="p-5 border-b border-zinc-50 hover:bg-zinc-50/50 transition-all cursor-pointer group">
                                            <div className="flex gap-4">
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${style.bg} ${style.text}`}>
                                                    {style.icon}
                                                </div>
                                                <div className="flex flex-col text-right">
                                                    <span className="text-xs font-black text-zinc-900 group-hover:text-[#D4AF37] transition-colors">{notif.title}</span>
                                                    <span className="text-[11px] text-zinc-500 font-medium leading-relaxed mt-1">{notif.desc}</span>
                                                    <div className="flex items-center gap-1.5 mt-2.5 text-[9px] text-zinc-400 font-bold uppercase tracking-wider">
                                                        <Clock size={10} />
                                                        {notif.time}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            
                            <button className="w-full p-5 text-[10px] font-black text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 transition-all text-center border-t border-zinc-50 uppercase tracking-[0.3em]">
                                عرض سجل التنبيهات كاملاً
                            </button>
                        </div>
                    )}
                </div>

                {/* زر نقطة البيع (Contrast Button) */}
                <Link to={'/sellspoint'} className="hidden sm:block">
                    <button className="flex items-center gap-3 bg-zinc-900 text-white px-6 py-3 rounded-2xl font-black text-[11px] transition-all hover:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-200 active:scale-95 border border-zinc-900">
                        <span className="tracking-wide">نقطة البيع</span>
                        <div className="bg-[#D4AF37] p-1 rounded-md">
                            <ExternalLink size={12} className="text-zinc-900" />
                        </div>
                    </button>
                </Link>
            </div>

            {/* الخط الذهبي الرفيع في الأسفل لإعطاء لمسة فخامة */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent"></div>
        </header>
    )
}

export default TopBar;