import { useState, useEffect, useRef } from 'react'
import { ExternalLink, Bell, Clock, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useNotifications } from '../shared/context/NotificationContext'

const TopBar = () => {
    const location = useLocation();
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const notifRef = useRef(null);
    const { lowStockProducts, lowStockCount } = useNotifications();

    // 1. غلق القائمة تلقائياً عند تغيير المسار
    useEffect(() => {
        setIsNotifOpen(false);
    }, [location.pathname]);

    // 2. غلق القائمة عند الضغط خارجها
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setIsNotifOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const pageTitles = {
        '/dashboard': 'لوحة الإحصائيات',
        '/pos': 'نقطة البيع',
        '/products': 'إدارة المنتجات',
        '/restock': 'المنتجات الناقصة',
        '/sells': 'إدارة المبيعات',
        '/expense': 'إدارة المصاريف',
        '/add-products': 'إضافة منتج',

    };

    return (
        <header
            dir="rtl"
            className="fixed top-0 left-0 right-0 lg:right-64 h-20 z-30 flex items-center justify-between px-6 lg:px-10 
                       bg-white border-b border-zinc-100 transition-all duration-300 shadow-sm"
        >
            {/* جهة اليمين - العنوان الذكي */}
            <div className="flex ps-9 items-center gap-4">
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

                    {/* زر التنبيهات */}
                    <button
                        onClick={() => setIsNotifOpen(!isNotifOpen)}
                        className={`relative p-3 rounded-2xl transition-all duration-300 ${isNotifOpen
                                ? 'bg-zinc-900 text-white shadow-xl shadow-zinc-200 scale-95'
                                : 'bg-zinc-50 text-zinc-500 hover:bg-zinc-100 border border-zinc-100'
                            }`}
                    >
                        <Bell size={20} className={isNotifOpen ? 'animate-none' : 'hover:rotate-12 transition-transform'} />
                        {lowStockCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-black rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                                {lowStockCount}
                            </span>
                        )}
                    </button>

                    {/* قائمة الإشعارات (Ultra-White Premium) */}
                    {isNotifOpen && (
                        <div className="absolute top-16 left-0 w-[350px] bg-white border border-zinc-100 shadow-[0_20px_60px_rgba(0,0,0,0.1)] rounded-[2.5rem] overflow-hidden animate-in fade-in zoom-in duration-200 z-50">

                            {/* Header */}
                            <div className="p-6 border-b border-zinc-50 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                                    <span className="text-xs font-black text-zinc-900 uppercase tracking-widest">التنبيهات</span>
                                </div>
                                <span className="text-[9px] bg-zinc-50 text-zinc-500 px-3 py-1 rounded-full font-bold">
                                    {lowStockCount} منتجات منخفضة
                                </span>
                            </div>

                            {/* Scrollable Content */}
                            <div className="max-h-[380px] overflow-y-auto custom-scrollbar">
                                {lowStockProducts && lowStockProducts.length > 0 ? (
                                    lowStockProducts.map((notif) => (
                                        <div key={notif.id} className="p-5 border-b border-zinc-50 hover:bg-zinc-50/50 transition-all cursor-pointer group">
                                            <div className="flex gap-4 items-start">
                                                <div className="bg-red-50 p-2 rounded-xl text-red-500">
                                                    <AlertTriangle size={16} />
                                                </div>
                                                <div className="flex flex-col text-right w-full">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <h4 className="text-xs font-black text-zinc-800 group-hover:text-[#D4AF37] transition-colors">
                                                            {notif.name}
                                                        </h4>
                                                        <div className="flex items-center gap-1 text-[9px] text-zinc-400 font-bold uppercase">
                                                            <Clock size={10} />
                                                            {notif.time || 'الآن'}
                                                        </div>
                                                    </div>
                                                    <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">
                                                        المخزون المتبقي <span className="text-red-500 font-black">{notif.quantity || notif.bulk_quantity}</span> - يرجى إعادة الطلب.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    /* حالة عدم وجود تحذيرات */
                                    <div className="py-16 px-10 text-center flex flex-col items-center justify-center">
                                        <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                                            <CheckCircle2 size={32} strokeWidth={1.5} />
                                        </div>
                                        <h3 className="text-sm font-black text-zinc-900 mb-1">كل شيء على ما يرام</h3>
                                        <p className="text-[11px] text-zinc-400 font-medium leading-relaxed">
                                            لا توجد منتجات منخفضة في المخزن حالياً. جميع الأصناف متوفرة بكثرة.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <Link to={'/restock'} className="block p-4 bg-zinc-50/50 border-t border-zinc-50">
                                <button className="w-full flex items-center justify-center gap-2 bg-zinc-900 text-white py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-black transition-all active:scale-[0.98]">
                                    عرض صفحة النواقص
                                    <ArrowLeft size={14} className="text-[#D4AF37]" />
                                </button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* زر نقطة البيع */}
                <Link to={'/pos'} className="hidden sm:block">
                    <button className="flex items-center gap-3 bg-zinc-900 text-white px-6 py-3 rounded-2xl font-black text-[11px] transition-all hover:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-200 active:scale-95 border border-zinc-900">
                        <span className="tracking-wide">نقطة البيع</span>
                        <div className="bg-[#D4AF37] p-1 rounded-md">
                            <ExternalLink size={12} className="text-zinc-900" />
                        </div>
                    </button>
                </Link>
            </div>

            {/* الخط الذهبي الرفيع */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent"></div>
        </header>
    );
};

export default TopBar;