import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useExpenses } from '../hooks/useExpenses';
import { Save, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';

function UpdateExpenses() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { byId, update, isLoading, isPending } = useExpenses(id);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    console.log(errors);


    useEffect(() => {
        if (byId) {
            const data = byId;
            reset({
                category: data.category,
                price: data.price,
                Person: data.Person,
                notes: data.notes
            });
        }
    }, [byId, reset]);


    const onSubmit = (data) => {
        console.log(data);
        update({ id,  data }, {
            
            onSuccess: () => {
                Swal.fire({
                    title: "تم التعديل!",
                    text: "تم تحديث بيانات المصروف بنجاح",
                    icon: "success",
                    confirmButtonColor: "#D4AF37",
                });
                navigate(-1);
            },
            onError: () => {
                Swal.fire("خطأ", "حدثت مشكلة أثناء التعديل", "error");
            }
        });
    };

    if (isLoading) return (
        <div className="flex justify-center items-center h-screen">
            <Loader2 className="animate-spin text-[#D4AF37]" size={40} />
        </div>
    );

    return (
        <div className="min-h-screen bg-zinc-50/50 p-6">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-zinc-900">
                        تعديل <span className="text-[#D4AF37]">المصروف</span>
                    </h1>
                </div>

                <div className="bg-white rounded-3xl border border-zinc-100 shadow-2xl p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">



                        <div className="space-y-2">
                            <label className="block text-sm font-black text-zinc-700 mr-2">المستلم / الشخص (Person)</label>
                            <input
                                {...register("Person", { required: "الحقل مطلوب" })}
                                className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-[#D4AF37]/20 outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-black text-zinc-700 mr-2">المبلغ (Price)</label>
                            <input
                                type="number"
                                {...register("price", { required: "الحقل مطلوب" })}
                                className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-4 text-sm font-black focus:ring-2 focus:ring-[#D4AF37]/20 outline-none"
                            />
                        </div>
                        <div className="relative">
                            <select
                                {...register("category", { required: "يجب ادخال نوع المصاريف" })}
                                className="pr-9 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-amber-500 outline-none text-sm font-bold text-gray-600 appearance-none cursor-pointer"
                            >
                                <option value="مصاريف يومية">مصاريف يومية</option>
                                <option value="بضاعة">بضاعة</option>
                                <option value="ميه">ميه</option>
                                <option value="كهربا">كهربا</option>
                                <option value="اجور يومية">اجور يومية</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-black text-zinc-700 mr-2">ملاحظات (Notes)</label>
                            <textarea
                                {...register("notes")}
                                rows="3"
                                className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-[#D4AF37]/20 outline-none resize-none"
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="submit"
                                disabled={isPending}
                                className="flex-1 bg-zinc-900 text-white font-black py-4 rounded-2xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
                            >
                                {isPending ? "جاري الحفظ..." : <><Save size={20} className="text-[#D4AF37]" /> تحديث البيانات</>}
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-6 bg-zinc-100 text-zinc-500 font-bold rounded-2xl hover:bg-zinc-200 transition-all"
                            >
                                إلغاء
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateExpenses;