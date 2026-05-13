import React from 'react';
import { useOrders } from '../hooks/useGetOrders';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPrint, FaArrowRight, FaUser, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

function OrderDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { orderById, isLoadingSingle } = useOrders(id);

    const order = orderById || null;

    if (isLoadingSingle) return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-amber-600"></div>
        </div>
    );

    if (!order) return <div className="text-gray-600 p-10 text-center font-sans">لا توجد بيانات لهذا الأوردر</div>;

    const handlePrint = () => window.print();

    return (
        <div className="h-44 bg-[#f4f4f4] text-gray-800 p-4 md:p-12 font-sans selection:bg-amber-100" dir="rtl">
            <div className="max-w-4xl mx-auto">

                {/* Header - Navigation & Print */}
                <div className="flex justify-between items-center mb-6 no-print">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-medium"
                    >
                        <FaArrowRight className="text-sm" /> عودة للقائمة
                    </button>
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 bg-amber-700 text-white px-6 py-2.5 rounded-lg hover:bg-amber-800 transition-all shadow-lg shadow-amber-200 text-sm font-bold"
                    >
                        <FaPrint /> طباعة الفاتورة
                    </button>
                </div>

                {/* Main Invoice Card */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden p-3 md:p-5 relative">

                    {/* Watermark Logo (Optional for extra luxury) */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
                        <h1 className="text-[12rem] font-black -rotate-12">ABU DAHAB</h1>
                    </div>

                    {/* Company Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start border-b-2 border-stone-900 pb-8 mb-2 gap-6">
                        <div className="flex items-center gap-4">
                            {/* Logo Placeholder */}
                            <div className="w-16 h-16 bg-stone rounded-xl flex items-center justify-center bg-stone-900 text-white text-3xl font-black shadow-inner">
                                AD
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">شركة أولاد آل أبو الدهب</h1>
                                <div className="flex gap-4 mt-2 text-[11px] text-gray-500">
                                    <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-amber-600" /> الجيزه  مطار امبابه اول شارع الكيلاني</span>
                                    <span className="flex items-center gap-1 font-mono text-left" dir="ltr"><FaPhoneAlt className="text-amber-600" /> +20 123 456 789</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-left md:text-right w-full md:w-auto border-t md:border-t-0 pt- md:pt-0">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">فاتورة مبيعات</h2>
                            <div className="space-y-1">
                                <p className="text-xs text-gray-400">رقم الفاتورة: <span className="text-gray-900 font-mono font-bold">#{order.barcode}</span></p>
                                <p className="text-xs text-gray-400">التاريخ: <span className="text-gray-900 font-bold">{new Date(order.createdAt).toLocaleDateString('ar-EG')}</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Customer & Payment Info */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10 bg-gray-50 p-2 rounded-xl border border-gray-100">
                        <div className="space-y-1">
                            <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
                                <FaUser className="text-amber-600" /> العميل
                            </h3>
                            <p className="text-md font-bold text-gray-800">{order.customer}</p>
                        </div>
                      
                        <div className="space-y-1 border-r border-gray-200 pr-6 hidden md:block">
                            <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
                                الحالة
                            </h3>
                            <span className="inline-block bg-green-100 text-green-700 px-3 py-0.5 rounded text-[16px] font-black">
                                {order.status_order?.toUpperCase() || "PAID"}
                            </span>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="mb-2">
                        <table className="w-full">
                            <thead>
                                <tr className="text-right border-b-2 border-gray-100">
                                    <th className="pb-2 font-black text-xs text-gray-500 uppercase">الصنف</th>
                                    <th className="pb-2 font-black text-xs text-gray-500 uppercase text-center">الكمية</th>
                                    <th className="pb-2 font-black text-xs text-gray-500 uppercase text-center">السعر</th>
                                    <th className="pb-2 font-black text-xs text-gray-500 uppercase text-left">الإجمالي</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {order.order_items?.map((item) => (
                                    <tr key={item.id}>
                                        <td className="py-2">
                                            <p className="font-bold text-gray-800">{item.product?.name}</p>
                                            <p className="text-[9px] text-gray-400 font-mono">SKU: {item.product?.documentId?.slice(0, 8).toUpperCase()}</p>
                                        </td>
                                        <td className="py-2 text-center font-bold text-gray-700">{item.quantityInOrder}</td>
                                        <td className="py-2 text-center text-gray-600 font-medium">{item.unit_price} <span className="text-[10px]">ج.م</span></td>
                                        <td className="py-2 text-left font-black text-gray-900">{item.sub_total} <span className="text-[10px]">ج.م</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Calculation Summary */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-6 border-t border-gray-100">


                        <div className="w-full md:w-full  text-white p-6 rounded-2xl shadow-xl shadow-gray-200">
                            <div className="space-y-3">
                                <div className="flex justify-between text-gray-400 text-xs">
                                    <span>الإجمالي الفرعي</span>
                                    <span className="font-bold">{order.total_price} ج.م</span>
                                </div>
                                <div className="flex justify-between text-red-400 text-xs">
                                    <span>الخصم </span>
                                    <span className="font-bold">-{order.discount} ج.م</span>
                                </div>
                                <div className="pt-3 mt-3 border-t border-gray-700 flex justify-between items-center">
                                    <span className="font-bold text-amber-500 uppercase tracking-tighter">صافي المطلوب</span>
                                    <div className="text-left">
                                        <span className="text-2xl font-black text-black leading-none">
                                            {order.final_price}
                                        </span>
                                        <span className="text-[10px] block font-bold text-amber-500">جنيه مصري فقط</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="mt-10 text-center border-t border-gray-50 pt-6">
                        <p className="text-gray-400 text-[10px] font-medium tracking-widest uppercase italic">
                            شكراً لثقتكم في أولاد آل أبو الدهب -
                        </p>
                    </div>
                </div>
            </div>

            {/* Print Specific Styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    .no-print { display: none !important; }
                    body { background-color: white !important; padding: 0 !important; }
                    .shadow-sm, .shadow-xl { box-shadow: none !important; }
                    .bg-[#f4f4f4] { background-color: white !important; }
                    .rounded-xl, .rounded-2xl { border-radius: 0 !important; }
                    .bg-gray-900 { background-color: #1a1a1a !important; color: white !important; -webkit-print-color-adjust: exact; }
                    .text-amber-500 { color: #b45309 !important; -webkit-print-color-adjust: exact; }
                    .border { border: 1px solid #eee !important; }
                    @page { margin: 1cm; }
                }
            `}} />
        </div>
    );
}

export default OrderDetails;