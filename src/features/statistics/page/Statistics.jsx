import React, { useMemo, useEffect, useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { TrendingUp, Wallet, Zap, Package } from 'lucide-react';
import { useStatistcs } from '../hooks/useStatistics';
import { motion, animate } from 'framer-motion';

const AnimatedNumber = ({ value }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const controls = animate(0, value, {
            duration: 1.5,
            ease: "easeOut",
            onUpdate: (latest) => setDisplayValue(Math.floor(latest))
        });
        return () => controls.stop();
    }, [value]);

    return <span>{displayValue.toLocaleString()}</span>;
};

const Statistics = () => {
    const {
        reportsOrders,
        ReportsExpesnse,
        startDay,
        endDay,
        setEndDay,
        setStartDay,
    } = useStatistcs();



    const totalOrdersCount = reportsOrders?.length || 0;
    const TotalOrdersPrices = useMemo(() => {
        return reportsOrders?.reduce((acc, curr) => acc + Number(curr.final_price || 0), 0) || 0;
    }, [reportsOrders]);
    const TotalExpenses = useMemo(() => {
        return ReportsExpesnse?.reduce((acc, curr) => acc + Number(curr.price || 0), 0) || 0;
    }, [ReportsExpesnse]);
    const TotalDailyExpenses = useMemo(() => {
        return ReportsExpesnse?.reduce((acc, curr) => {
            return curr.type === "مصاريف يومية" ? acc + Number(curr.price || 0) : acc;
        }, 0) || 0;
    }, [ReportsExpesnse]);

    const netProfit = useMemo(() => TotalOrdersPrices - TotalExpenses, [TotalOrdersPrices, TotalExpenses]);
    const cashInDrawer = useMemo(() => TotalOrdersPrices - TotalDailyExpenses, [TotalOrdersPrices, TotalDailyExpenses]);

    // Expenses Analysis 
    const ExpensesAnalysis = useMemo(() => {
        if (!ReportsExpesnse || ReportsExpesnse.length === 0) return [];
        const grouped = ReportsExpesnse.reduce((acc, curr) => {
            const category = curr.type || "أخرى";
            acc[category] = (acc[category] || 0) + Number(curr.price || 0);
            return acc;
        }, {});

        return Object.entries(grouped).map(([type, amount]) => ({
            type,
            amount,
            percentage: TotalExpenses > 0 ? ((amount / TotalExpenses) * 100).toFixed(1) : 0
        })).sort((a, b) => b.amount - a.amount);
    }, [ReportsExpesnse, TotalExpenses]);



    // best sellers 
    const topSellingProducts = useMemo(() => {
        if (!reportsOrders || reportsOrders.length === 0) return [];

        const productMap = {};

        reportsOrders.forEach((order) => {
            const items = order.order_items || [];

            items.forEach((item) => {
                const productName = item.product?.name || "منتج غير معروف";
                const qty = Number(item.quantityInOrder || 0);

                if (productMap[productName]) {
                    productMap[productName].totalQty += qty;
                } else {
                    productMap[productName] = {
                        name: productName,
                        totalQty: qty
                    };
                }
            });
        });



        return Object.values(productMap)
            .sort((a, b) => b.totalQty - a.totalQty)
            .slice(0, 5);
    }, [reportsOrders]);

    console.log(topSellingProducts);




    const goldenGradient = "linear-gradient(135deg, #D4AF37 0%, #F3E5AB 100%)";

    return (
        <div className="p-6 bg-[#FDFDFD] min-h-screen text-[#1F1F1F] font-arabic" dir="rtl">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className='pb-8'
            >
                <h1 className="text-4xl font-black text-zinc-900 flex items-center gap-3">
                    لوحة <span style={{ background: goldenGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>الإحصائيات</span>
                </h1>
                <p className="text-zinc-400 font-bold text-sm flex items-center gap-2 mt-2">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
                    تحليل ذكي وحقيقي لحركة السيولة والمبيعات
                </p>
            </motion.div>

            {/* Date Filters */}
            <div className="flex flex-wrap items-center gap-6 mb-10 p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-black text-gray-400 mr-1 uppercase">فترة البداية</label>
                    <input
                        type="date"
                        className="px-4 py-2 rounded-xl border border-gray-100 focus:ring-2 focus:ring-[#D4AF37] outline-none text-sm font-bold bg-gray-50"
                        value={startDay}
                        onChange={(e) => setStartDay(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-black text-gray-400 mr-1 uppercase">فترة النهاية</label>
                    <input
                        type="date"
                        className="px-4 py-2 rounded-xl border border-gray-100 focus:ring-2 focus:ring-[#D4AF37] outline-none text-sm font-bold bg-gray-50"
                        value={endDay}
                        onChange={(e) => setEndDay(e.target.value)}
                    />
                </div>
            </div>

            {/*  (Real Data) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                    { label: 'صافي الربح', value: netProfit, icon: TrendingUp, color: '#10b981' },
                    { label: '(الخوارج)المصاريف', value: TotalExpenses, icon: Wallet, color: '#ef4444' },
                    { label: '  خزنة الكاشير (الدرج)', value: cashInDrawer, icon: Zap, color: '#D4AF37' },
                    { label: 'عدد الاوردرات', value: totalOrdersCount, icon: Package, color: '#6366f1', isUnit: false },
                ].map((card, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 shadow-xl shadow-gray-100/50 rounded-2xl border-b-4 border-[#D4AF37] flex items-center justify-between"
                    >
                        <div>
                            <p className="text-gray-400 text-[11px] font-black uppercase mb-1">{card.label}</p>
                            <h3 className="text-2xl font-black text-zinc-800">
                                <AnimatedNumber value={card.value} />
                                {card.isUnit !== false && <span className="text-xs mr-1 text-gray-400 font-medium">ج.م</span>}
                            </h3>
                        </div>
                        <div className="p-3 rounded-xl bg-gray-50">
                            <card.icon style={{ color: card.color }} size={28} />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/*  Expenses  */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
                >
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h3 className="text-xl font-black mb-1">توزيع المصاريف</h3>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">بناءً على الفئات المسجلة</p>
                        </div>
                        <div className="text-left">
                            <span className="text-[10px] block text-gray-400 font-black uppercase">الإجمالي</span>
                            <span className="text-xl font-black"><AnimatedNumber value={TotalExpenses} /> ج.م</span>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {ExpensesAnalysis.map((item, index) => (
                            <div key={index} className="group">
                                <div className="flex justify-between items-center mb-3">
                                    <div className="flex items-center gap-3">
                                        <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-400 text-xs font-black group-hover:bg-[#D4AF37] group-hover:text-white transition-all">
                                            {index + 1}
                                        </span>
                                        <div>
                                            <span className="text-zinc-800 font-black text-sm block">{item.type}</span>
                                            <span className="text-[10px] text-gray-400 font-bold tracking-tight">قيمة: {item.amount.toLocaleString()} ج.م</span>
                                        </div>
                                    </div>
                                    <span className="font-black text-[#D4AF37]">{item.percentage}%</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.percentage}%` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="h-full rounded-full shadow-lg"
                                        style={{ background: goldenGradient }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
                {/* sales diagram */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
                >
                    <div className="mb-8">
                        <h2 className="text-xl font-black">تحليل المبيعات</h2>
                        <p className="text-gray-400 text-xs font-bold uppercase mt-1">
                            أفضل 5 منتجات مبيعاً خلال الفترة المختارة
                        </p>
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={topSellingProducts}>
                                <defs>
                                    <linearGradient id="barGold" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#D4AF37" stopOpacity={1} />
                                        <stop offset="100%" stopColor="#F3E5AB" stopOpacity={0.8} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9CA3AF', fontSize: 10, fontWeight: 700 }}
                                    interval={0} 
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                />
                                <Tooltip
                                    cursor={{ fill: '#f9f9f9' }}
                                    contentStyle={{
                                        borderRadius: '15px',
                                        border: 'none',
                                        boxShadow: '0 10px 15px rgba(0,0,0,0.05)',
                                        textAlign: 'right',
                                        fontFamily: 'inherit'
                                    }}
                                    formatter={(value) => [`${value} قطعة`, 'إجمالي الكمية']}
                                />
                                <Bar
                                    dataKey="totalQty" 
                                    fill="url(#barGold)"
                                    radius={[10, 10, 0, 0]}
                                    barSize={45}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Statistics;