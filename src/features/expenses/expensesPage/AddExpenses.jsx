import React from 'react';
import { useForm } from 'react-hook-form';
import {useExpenses} from "../hooks/useExpenses";
import { Plus, ArrowRight, Save } from 'lucide-react';
import Swal from 'sweetalert2';

function AddExpenses() {
    const { add } = useExpenses();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            Person: "",
            notes: "",
            price: "",
            category :"",
        }
    });

    const onSubmit = (data) => {
        console.log(data);
        
        add(data, {
            onSuccess: () => {
                Swal.fire({
                    title: "تم الحفظ!",
                    text: "تم إضافة المصروف بنجاح",
                    icon: "success",
                    confirmButtonColor: "#D4AF37",
                });
                reset();
            },
            onError: () => {
                Swal.fire("خطأ", "حدثت مشكلة أثناء الحفظ", "error");
            }
        });
    };

    return (
        <div className="min-h-screen bg-zinc-50/50 p-6">
            <div className="max-w-2xl mx-auto">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-zinc-900 flex items-center gap-3">
                            <Plus className="text-[#D4AF37]" size={32} />
                            إضافة <span className="text-[#D4AF37] font-outline-2">مصروف جديد</span>
                        </h1>
                        <p className="text-zinc-500 font-bold text-sm mr-11 opacity-70">قم بتسجيل تفاصيل الخارج المالي بدقة</p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-3xl border border-zinc-100 shadow-2xl shadow-zinc-200/40 overflow-hidden">
                    <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">

                        <div className="space-y-2">
                            <label className="block text-sm font-black text-zinc-700 mr-2">  المستلم</label>
                            <input
                                {...register("Person", { required: "هذا الحقل مطلوب" })}
                                placeholder="مثال: فاتورة الكهرباء أو اسم الموظف"
                                className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] transition-all"
                            />
                            {errors.person && <p className="text-red-500 text-xs mt-1 mr-2">{errors.person.message}</p>}
                        </div>

                        {/* حقل المبلغ */}
                        <div className="space-y-2">
                            <label className="block text-sm font-black text-zinc-700 mr-2">المبلغ (ج.م)</label>
                            <input
                                type="number"
                                {...register("price", { required: "يجب إدخال المبلغ" })}
                                placeholder="0.00"
                                className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-4 text-sm font-black focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] transition-all"
                            />
                        </div>
                        {/* Status Filter */}
                        <div className="relative">
                            <select
                                {...register("category",{required:"يجب ادخال نوع المصاريف"})}
                                className="pr-9 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-amber-500 outline-none text-sm font-bold text-gray-600 appearance-none cursor-pointer"
                            >
                                <option value="مصاريف يومية">مصاريف يومية</option>
                                <option value="بضاعة">بضاعة</option>
                                <option value="ميه">ميه</option>
                                <option value="كهربا">كهربا</option>
                                <option value="اجور يومية">اجور يومية</option>
                            </select>
                        </div>

                        {/* حقل الملاحظات */}
                        <div className="space-y-2">
                            <label className="block text-sm font-black text-zinc-700 mr-2">ملاحظات إضافية</label>
                            <textarea
                                {...register("notes")}
                                rows="3"
                                placeholder="اكتب أي تفاصيل أخرى هنا..."
                                className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] transition-all resize-none"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="pt-4 flex gap-3">
                            <button
                                type="submit"
                                disabled={add.isPending}
                                className="flex-1 bg-zinc-900 text-white font-black py-4 rounded-2xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-zinc-900/20 disabled:bg-zinc-400"
                            >
                                {add.isPending ? "جاري الحفظ..." : (
                                    <>
                                        <Save size={20} className="text-[#D4AF37]" />
                                        حفظ البيانات
                                    </>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => reset()}
                                className="px-6 bg-zinc-100 text-zinc-500 font-bold rounded-2xl hover:bg-zinc-200 transition-all"
                            >
                                مسح
                            </button>
                        </div>
                    </form>
                </div>

                {/* Back Link */}
                <button className="mt-8 text-zinc-400 font-bold text-sm flex items-center gap-2 hover:text-zinc-800 transition-colors mr-2">
                    <ArrowRight size={16} />
                    العودة لجدول المصروفات
                </button>
            </div>
        </div>
    );
}

export default AddExpenses;