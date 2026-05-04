import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react'
import { ShoppingCart, Barcode, X, Plus, Minus, CheckCircle, Tag, } from 'lucide-react'
import { useNotifications } from '../../../shared/context/NotificationContext'

const POSPage = () => {
    const { allProducts } = useNotifications()
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const searchRef = useRef(null);
    const [selectedCategory, setSelectedCategory] = useState('الكل');
    const [selectedSubFilter, setSelectedSubFilter] = useState("الكل");

    const categories = useMemo(() => {
        const cats = new Set(allProducts?.map(p => p.category?.name).filter(Boolean));
        return ['الكل', ...Array.from(cats).sort()];
    }, [allProducts]);

    const subFilters = useMemo(() => {
        if (selectedCategory === 'الكل' || !allProducts) return [];
        const filters = new Set();
        allProducts
            .filter(p => p.category?.name === selectedCategory && p.attribute_sets?.[0]?.name)
            .forEach(p => filters.add(p.attribute_sets[0].name));
        return ['الكل', ...Array.from(filters).sort()];
    }, [allProducts, selectedCategory]);

    // التأكد من الفوكس الدائم على حقل البحث للباركود
    useEffect(() => {
        const keepFocus = () => searchRef.current?.focus();
        keepFocus();
        document.addEventListener('click', keepFocus);
        return () => document.removeEventListener('click', keepFocus);
    }, []);



    const filteredProducts = useMemo(() => {
        if (!allProducts) return [];

        return allProducts.filter(product => {
            const matchesCat = selectedCategory === 'الكل' || product.category?.name === selectedCategory;
            const productBarcode = product.barcode !== null && product.barcode !== undefined ? String(product.barcode) : '';
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                productBarcode.includes(searchTerm);
            const matchesSubFilter = selectedSubFilter === 'الكل' || product.attribute_sets?.[0]?.name === selectedSubFilter;

            return matchesCat && matchesSearch && matchesSubFilter;
        });
    }, [allProducts, searchTerm, selectedCategory, selectedSubFilter]);


    const addToCart = useCallback((product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    }, []);

    // فصل منطق البحث بالباركود (Side Effect) في useEffect مستقل
    useEffect(() => {
        if (!searchTerm.trim() || !allProducts) return;

        const exactMatch = allProducts.find(p => {
            const productBarcode = p.barcode !== null && p.barcode !== undefined ? String(p.barcode) : '';
            return productBarcode === searchTerm.trim();
        });

        if (exactMatch) {
            addToCart(exactMatch);
            setSearchTerm(''); // تصفير البحث فوراً بعد الإضافة
        }
    }, [searchTerm, allProducts, addToCart]);


    const cartTotal = useMemo(() => cart.reduce((s, i) => s + (Number(i.cost_price) * i.quantity), 0), [cart]);

    return (
        <div className="min-h-screen font-sans" dir="rtl">
            <div className="flex h-screen overflow-hidden">

                {/* 1. الجانب الأيمن: المنتجات */}
                <div className="flex-1 flex flex-col p-6 overflow-hidden">

                    {/* Header: البحث والتصنيفات */}
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-zinc-100 mb-6 space-y-5">
                        <div className="relative group">
                            <Barcode className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#D4AF37] transition-colors" size={22} />
                            <input
                                ref={searchRef}
                                type="text"
                                placeholder="ابحث بالاسم أو امسح الباركود مباشرة..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-xl pr-14 py-3 text-lg font-bold focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] transition-all text-black placeholder:text-zinc-400"
                            />
                        </div>

                        <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setSelectedCategory(cat);
                                        setSelectedSubFilter("الكل");
                                    }}
                                    className={`px-6 py-3 rounded-xl text-xs font-black transition-all duration-300 whitespace-nowrap ${selectedCategory === cat
                                            ? 'bg-gradient-to-r from-zinc-900 to-zinc-800 text-[#D4AF37] shadow-lg shadow-zinc-900/50 scale-105'
                                            : 'bg-zinc-50 text-zinc-600 border border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {subFilters.length > 0 && (
                            <div className="flex items-center gap-3  p-3 rounded-xl  animate-in fade-in slide-in-from-top-2 duration-300">

                                <div className="flex gap-2 flex-wrap">
                                    {subFilters.map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setSelectedSubFilter(type)}
                                            className={`px-5 py-2 rounded-lg text-xs font-black transition-all duration-300 ${selectedSubFilter === type
                                                    ? 'bg-[#D4AF37] text-zinc-900 shadow-lg shadow-[#D4AF37]/30 scale-105'
                                                    : 'bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* شبكة المنتجات */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar pb-10">
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                            {filteredProducts.map(product => (
                                <div
                                    key={product.id}
                                    onClick={() => addToCart(product)}
                                    className="p-5 rounded-[2rem] border border-zinc-200 shadow-lg hover:shadow-xl hover:shadow-[#D4AF37]/10 hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="bg-zinc-50 p-3 rounded-2xl text-[#D4AF37]">
                                            <Tag size={20} />
                                        </div>
                                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{product.category?.name || 'عام'}</span>
                                    </div>
                                    <h3 className="font-black text-zinc-900 text-sm mb-2 group-hover:text-[#D4AF37] transition-colors line-clamp-1">{product.name}</h3>
                                    <div className="flex justify-between items-end mt-4">
                                        <div>
                                            <p className="text-[9px] font-bold text-zinc-400 uppercase">السعر</p>
                                            <p className="text-lg font-black text-zinc-900">{product.cost_price} <span className="text-[10px]">ج.م</span></p>
                                        </div>
                                        <div className="bg-zinc-900 text-white p-2 rounded-xl group-hover:bg-[#D4AF37] group-hover:text-zinc-900 transition-all">
                                            <Plus size={18} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. الجانب الأيسر: السلة */}
                <div className="w-[400px]  bg-white border-r border-zinc-100 shadow-2xl flex flex-col">
                    <div className="p-8 border-b border-zinc-50 bg-zinc-900 text-white rounded-bl-[3rem]">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-black flex items-center gap-2">
                                <ShoppingCart size={20} className="text-[#D4AF37]" />
                                السلة
                            </h2>
                            <span className="bg-[#D4AF37] text-zinc-900 px-3 py-1 rounded-lg text-[10px] font-black">{cart.length} أصناف</span>
                        </div>
                        <div className="space-y-1">
                            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">إجمالي الحساب</p>
                            <p className="text-4xl font-black text-[#D4AF37] tracking-tighter">{cartTotal.toFixed(2)} <span className="text-sm">ج.م</span></p>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                        {cart.map(item => (
                            <div key={item.id} className="flex items-center gap-4 bg-zinc-50 p-4 rounded-2xl group border border-zinc-200 transition-all">
                                <div className="flex-1">
                                    <p className="text-xs font-black text-black line-clamp-1">{item.name}</p>
                                    <p className="text-[10px] font-bold text-black">{(item.cost_price * item.quantity).toFixed(2)} ج.م</p>
                                </div>
                                <div className="flex items-center gap-2 bg-white rounded-xl p-1 border border-zinc-100 shadow-sm">
                                    <button onClick={() => setCart(prev => prev.map(i => i.id === item.id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i))} className="p-1 text-black hover:text-zinc-900"><Minus size={12} /></button>
                                    <span className="text-xs text-black font-black w-4 text-center">{item.quantity}</span>
                                    <button onClick={() => setCart(prev => prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))} className="p-1 text-black hover:text-zinc-900"><Plus size={12} /></button>
                                </div>
                                <button onClick={() => setCart(prev => prev.filter(i => i.id !== item.id))} className="text-zinc-300 hover:text-red-500"><X size={14} /></button>
                            </div>
                        ))}
                    </div>

                    <div className="w-full flex gap-3 flex-row items-center justify-center ">
                        <button className="w-36 bg-zinc-900 hover:text-[#D4AF37] text-white py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all shadow-xl shadow-[#D4AF37]/20 active:scale-95 group">
                            <Tag size={20} className="group-hover:scale-110 transition-transform" />
                            إضافة خصم
                        </button>
                        <button className="w-36 bg-zinc-900 hover:text-[#D4AF37] text-white py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all shadow-xl shadow-[#D4AF37]/20 active:scale-95 group">
                            <Tag size={20} className="group-hover:scale-110 transition-transform" />
                           حالة الطلب
                        </button>
                    </div>

                    <div className="p-3 bg-white border-t border-zinc-50">
                        <button className="w-full bg-[#D4AF37] hover:bg-zinc-900 hover:text-[#D4AF37] text-zinc-900 py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all shadow-xl shadow-[#D4AF37]/20 active:scale-95 group">
                            <CheckCircle size={20} className="group-hover:scale-110 transition-transform" />
                            إتمام ودفع الفاتورة
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default POSPage;