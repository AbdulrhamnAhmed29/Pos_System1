import React from 'react';
import Barcode from 'react-barcode';

export const ReceiptDesign = React.forwardRef(({ orderData, cart }, ref) => {
   const orderId = orderData.barcode
// هيطلع حاجة زي: 115-4829 (يوم 11 شهر 5 - رقم عشوائي)
    return (
        <div
            ref={ref}
            className="p-6 w-[95mm] bg-white text-slate-900 font-sans tracking-tight"
            style={{ direction: 'rtl' }}
        >
            {/* Header - Brand Identity */}
            <div className="text-center mb-4">
                <h2 className="text-2xl font-black uppercase tracking-[2px] mb-1">ولاد العم</h2>
            
                <div className="border-b border-dotted border-slate-400 pb-3">
                    <p className="text-[11px] leading-relaxed font-medium">الجيزة، مطار إمبابة - أول شارع الكيلاني</p>
                </div>
            </div>

            {/* Order Meta Data */}
            <div className="flex justify-between items-end mb-4 text-[11px] font-medium text-slate-700">
                <div className="flex flex-col gap-0.5">
                    <span>رقم الفاتورة: <span className="font-bold text-black tracking-tighter">#{orderId || '0000'}</span></span>
                    <span>التاريخ: {new Date().toLocaleDateString('ar-EG')}</span>
                </div>
                <div className="text-left">
                    <span>الوقت: {new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </div>

            {/* Items Table */}
            <table className="w-full mb-4">
                <thead>
                    <tr className="text-[10px] text-slate-400 border-b border-slate-200">
                        <th className="text-right py-2 font-bold uppercase">الصنف</th>
                        <th className="text-center py-2 font-bold uppercase whitespace-nowrap">الكمية</th>
                        <th className="text-left py-2 font-bold uppercase whitespace-nowrap">الإجمالي</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-dotted divide-slate-200">
                    {cart.map((item, index) => (
                        <tr key={index} className="text-[12px]">
                            <td className="py-2 leading-tight pr-1">
                                <span className="block font-bold text-slate-800">{item.name}</span>
                                <span className="text-[10px] text-slate-500 font-medium italic">
                                    {item.attributes?.[0]?.name || ''}
                                </span>
                            </td>
                            <td className="py-2 text-center font-medium text-slate-700">{item.quantity}</td>
                            <td className="py-2 text-left font-bold text-black whitespace-nowrap">
                                {(item.cost_price * item.quantity).toLocaleString()} <small className="text-[9px]">ج.م</small>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Summary Section */}
            <div className="space-y-2 border-t-2 border-black pt-3">
                <div className="flex justify-between text-[12px] font-medium">
                    <span className="text-slate-500 text-xs">الإجمالي الفرعي:</span>
                    <span>{orderData?.totalPrice} ج.م</span>
                </div>

                {orderData?.discount > 0 && (
                    <div className="flex justify-between text-[12px] text-red-600 font-bold">
                        <span>قيمة الخصم:</span>
                        <span>-{orderData?.discount} ج.م</span>
                    </div>
                )}

                <div className="flex justify-between items-center pt-2 mt-1 border-t border-slate-200">
                    <span className="text-sm font-black uppercase">الصافي النهائي</span>
                    <span className="text-xl font-black tracking-tighter">
                        {orderData?.finalPrice} <small className="text-[10px]">ج.م</small>
                    </span>
                </div>
            </div>

            {/* Footer - Barcode & Credits */}
            <div className="mt-6 flex flex-col items-center">
                <div className="mb-4">
                    <Barcode 
                        value={orderId}
                        width={1.1}      
                        height={35}       
                        fontSize={12}
                        displayValue={true}
                        font="monospace"
                        background="transparent"
                        margin={0}
                    />
                </div>
           

                {/* Final Branding - The Elvora Signature */}
                <div className="mt-2 flex flex-col items-center opacity-80 group">
                    <div className="text-[7px] uppercase tracking-[3px] font-bold text-slate-400 mb-1">
                        System Architect
                    </div>
                    <div className="text-[11px] font-black text-black tracking-tight">
                        ABDULRHMAN <span className="text-slate-400 font-light italic">AHMED</span>
                    </div>
                    <div className="w-8 h-[1px] bg-slate-200 mt-1"></div>
                </div>
            </div>
        </div>
    );
});