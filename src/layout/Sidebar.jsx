import { useState, useEffect, useRef } from 'react'
import {
    Menu, LogOut, LayoutDashboard,
    Droplets,  X,
    Box,
    Wallet,
    ShoppingCart,
    AlertTriangle,
    Zap,
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useLogout } from '../features/auth'

const Sidebar = () => {
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const sidebarRef = useRef(null)
    const logout = useLogout()
    const location = useLocation()

    const menuItems = [
        {
            path: '/pos',
            label: 'نقطة البيع',
            icon: ShoppingCart
        },
        {
            path: '/dashboard',
            label: 'الاحصائيات',
            icon: LayoutDashboard
        },
        {
            path: '/products',
            label: 'إدارة المنتجات',
            icon: Box
        },
        {
            path: '/restock',
            label: 'المنتجات الناقصة',
            icon: AlertTriangle
        },
        {
            path: '/sells',
            label: 'ادارة المبيعات',
            icon: Wallet,
        },
        {
            path: '/expense',
            label: 'ادارة المصاريف',
            icon: Wallet
        },
    ];

    // إغلاق القائمة عند الضغط خارجها (للموبايل فقط)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobileOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsMobileOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isMobileOpen])

    const isActive = (path) => location.pathname === path

    return (
        <>
            {/* زر الهامبرجر - يظهر فقط في الموبايل */}
            <button
                onClick={() => setIsMobileOpen(true)}
                className="fixed top-4 right-4 z-50 p-2 bg-white border border-zinc-200 rounded-xl shadow-sm lg:hidden text-zinc-600"
            >
                <Menu size={24} />
            </button>

            {/* Overlay للموبايل */}
            {isMobileOpen && (
                <div className="fixed inset-0 bg-zinc-900/20 backdrop-blur-sm z-40 lg:hidden transition-opacity" />
            )}

            <aside
                ref={sidebarRef}
                dir="rtl"
                className={`
                    fixed top-0 right-0 z-40 h-screen transition-transform duration-300 ease-in-out
                    bg-white border-l border-zinc-100  shadow-lg
                    ${isMobileOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
                    w-72 lg:w-64 xl:w-72 flex flex-col
                `}
            >
                {/* Header: اسم السيستم واللوجو */}
                <div className="p-6 h-20 border-b border-zinc-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center shadow-lg shadow-zinc-200">
                            <Droplets className="text-[#D4AF37]" size={22} />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-zinc-900 text-sm tracking-tight">ادارة الزيوت</span>
                            <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider">Oil Management</span>
                        </div>
                    </div>

                    {/* زر إغلاق الموبايل */}
                    <button onClick={() => setIsMobileOpen(false)} className="lg:hidden p-1 text-zinc-400">
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
                    {menuItems.map((item) => {
                        const Icon = item.icon
                        const active = isActive(item.path)
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMobileOpen(false)}
                                className={`
                                    flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group
                                    ${active
                                        ? 'bg-stone-900 text-[#D4AF37] ring-1 ring-zinc-100 shadow-sm'
                                        : 'text-zinc-500 hover:bg-zinc-50/50 hover:text-zinc-900'}
                                `}
                            >
                                <div className={`transition-colors ${active ? 'text-stone-300' : 'group-hover:text-[#D4AF37]'}`}>
                                    <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                                </div>
                                <span className={`text-sm ${active ? 'text-stone-300' : 'font-bold'}`}>
                                    {item.label}
                                </span>
                                {active && (
                                    <div className="mr-auto">
                                        <div className="w-1.5 h-1.5 rounded-full bg-stone-300 shadow-[0_0_8px_#D4AF37]" />
                                    </div>
                                )}
                            </Link>
                        )
                    })}
                </nav>

                {/* User / Logout Section */}
                <div className="p-4 border-t border-zinc-50">
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl text-red-500 font-bold text-sm
                        hover:bg-red-50 transition-all group"
                    >
                        <LogOut size={20} strokeWidth={2.5} className="group-hover:-translate-x-1 transition-transform" />
                        <span>تسجيل الخروج</span>
                    </button>
                </div>
            </aside>

            {/* حاوية المحتوى الرئيسي - هذا الجزء مهم ليظهر بجانب السايد بار في الشاشات الكبيرة */}
            <div className="lg:pr-64 xl:pr-72 transition-all duration-300">
                {/* هنا يوضع الـ <Outlet /> أو محتوى الصفحة */}
            </div>
        </>
    )
}

export default Sidebar