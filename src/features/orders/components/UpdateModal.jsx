import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useOrderMutation } from "../../orders/hooks/useMutationOrders";
import { useParams, useNavigate } from "react-router-dom";
import { useOrders } from "../hooks/useGetOrders";
import { ArrowRight, Save, User, CreditCard, Hash } from "lucide-react";
import Swal from 'sweetalert2';


const UpdateOrderPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { update } = useOrderMutation();
    const { orderById, isLoading } = useOrders(id);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            customerName: "",
            paymentStatus: "",
        }
    });

    useEffect(() => {
        if (orderById) {
            reset({
                customerName: orderById.customer,
                paymentStatus: orderById.status_order
            });
        }
    }, [orderById, reset]);


    const onSubmit = (data) => {
        const payload = {
            id: orderById.documentId,
            updatedData: {
                customer: data.customerName,
                status_order: data.paymentStatus
            }
        };
        const id = payload.id;

        Swal.fire({
            title: 'جاري حفظ التعديلات...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        update({ id, payload }, {
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'تم التحديث!',
                    text: 'تم تعديل بيانات الفاتورة بنجاح',
                    confirmButtonText: 'حسناً',
                    confirmButtonColor: '#18181b',
                    timer: 2000
                }).then(() => {
                    navigate('/sales');
                });
            },
            onError: (error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'عذراً...',
                    text: 'حدث خطأ أثناء التحديث، حاول مرة أخرى',
                    confirmButtonText: 'موافق',
                    confirmButtonColor: '#ef4444'
                });
                console.error(error);
            }
        });
    };

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc]">
            <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#fcfcfc] p-4 md:p-8 font-arabic" dir="rtl">
            <div className="max-w-3xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors mb-2 group"
                        >
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            <span className="text-sm font-bold">العودة للقائمة</span>
                        </button>
                        <h1 className="text-3xl font-black text-zinc-900 tracking-tight">
                            تعديل تفاصيل <span className="text-amber-500">الطلب</span>
                        </h1>
                    </div>

                    <div className="bg-white px-4 py-2 rounded-2xl border border-zinc-100 shadow-sm flex items-center gap-3">
                        <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                            <Hash size={18} />
                        </div>
                        <div>
                            <p className="text-[10px] text-zinc-400 font-bold uppercase">رقم المرجع</p>
                            <p className="text-sm font-black text-zinc-800 font-sans">{orderById?.barcode || id}</p>
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl border border-zinc-100 shadow-xl shadow-zinc-200/40 overflow-hidden"
                >
                    <form onSubmit={handleSubmit(onSubmit)} className="divide-y divide-zinc-50">

                        {/* Section 1: Customer Details */}
                        <div className="p-8 space-y-6">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-white">
                                    <User size={16} />
                                </div>
                                <h2 className="font-black text-zinc-800 text-lg">بيانات العميل</h2>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-zinc-400 uppercase tracking-widest mr-1">اسم العميل بالكامل</label>
                                    <div className="relative">
                                        <input
                                            {...register("customerName", { required: "اسم العميل مطلوب" })}
                                            className={`w-full bg-zinc-50 border ${errors.customerName ? 'border-red-500' : 'border-zinc-100'} p-4 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500 transition-all font-bold text-zinc-800`}
                                            placeholder="أدخل اسم العميل..."
                                        />
                                        {errors.customerName && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.customerName.message}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Payment Details */}
                        <div className="p-8 space-y-6 bg-zinc-50/30">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-white">
                                    <CreditCard size={16} />
                                </div>
                                <h2 className="font-black text-zinc-800 text-lg">تفاصيل الدفع</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-zinc-400 uppercase tracking-widest mr-1">طريقة السداد</label>
                                    <select
                                        {...register("paymentStatus", { required: "طريقة الدفع مطلوبة" })}
                                        className="w-full bg-white border border-zinc-100 p-4 rounded-2xl outline-none focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500 transition-all font-bold text-zinc-800 appearance-none cursor-pointer"
                                    >
                                        <option value="كاش">دفع نقدي (كاش)</option>
                                        <option value="آجل">دفع آجل (مديونية)</option>
                                    </select>
                                </div>

                                <div className="bg-amber-500/10 p-4 rounded-2xl border border-amber-200/50 self-end">
                                    <p className="text-[10px] text-amber-700 font-black mb-1 italic">ملاحظة الحساب:</p>
                                    <p className="text-[11px] text-amber-900 leading-relaxed font-medium">
                                        تغيير حالة الدفع يؤثر على سجلات الخزينة والتقارير اليومية فور الحفظ.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="p-8 flex items-center justify-end gap-4 bg-white">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-8 py-4 rounded-2xl text-zinc-400 font-bold hover:bg-zinc-50 transition-all"
                            >
                                إلغاء التعديلات
                            </button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="flex items-center gap-3 bg-zinc-900 text-amber-500 px-10 py-4 rounded-2xl font-black shadow-xl shadow-zinc-200 hover:bg-black transition-all"
                            >
                                <Save size={20} />
                                حفظ التغييرات
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default UpdateOrderPage;