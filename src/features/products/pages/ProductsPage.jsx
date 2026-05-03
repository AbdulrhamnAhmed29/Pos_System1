import React from 'react';
import { useGetProducts } from '../hooks/UseGetProducts';
import { useMutationProduct } from '../hooks/UseMutationProduct';
import {ProductsTable} from '../components/ProductsTable';
import { Plus } from 'lucide-react';
import Swal from 'sweetalert2';

const ProductsPage = () => {
  const { data: products, isLoading } = useGetProducts();
  const { addMutation, updateMutation, deleteMutation } = useMutationProduct();

  const productsList = products || [];


  // إعدادات SweetAlert الموحدة
  const premiumSwal = Swal.mixin({
    customClass: {
      confirmButton: 'bg-[#D4AF37] text-black px-8 py-2 rounded-xl font-black mx-2 shadow-lg shadow-[#D4AF37]/20',
      cancelButton: 'bg-zinc-100 text-zinc-500 px-8 py-2 rounded-xl font-black mx-2',
      input: 'rounded-xl border-zinc-100 focus:ring-[#D4AF37] focus:border-[#D4AF37] font-bold text-right',
      popup: 'rounded-[2rem] border-none shadow-2xl',
    },
    buttonsStyling: false,
  });

  const handleAdd = () => {
    premiumSwal.fire({
      title: '<span class="font-black text-zinc-800">إضافة منتج جديد للزيوت</span>',
      html: `
        <div class="flex flex-col gap-4 p-2" dir="rtl">
          <input id="name" type="text" placeholder="اسم المنتج (مثلاً: زيت كاسترول 5W-30)" class="swal2-input !m-0 w-full" />
          <input id="price" type="number" placeholder="سعر البيع" class="swal2-input !m-0 w-full" />
          <input id="category" type="text" placeholder="الفئة (زيوت محرك، فلاتر، إلخ)" class="swal2-input !m-0 w-full" />
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'تأكيد الإضافة',
      cancelButtonText: 'إلغاء',
      preConfirm: () => {
        const name = document.getElementById('name').value.trim();
        const price = document.getElementById('price').value.trim();
        const category = document.getElementById('category').value.trim();
        if (!name || !price) {
          Swal.showValidationMessage('يرجى ملء البيانات الأساسية للمنتج');
          return false;
        }
        return { name, price: parseFloat(price), category };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        addMutation.mutate(result.value);
      }
    });
  };

  const handleEdit = (product) => {
    premiumSwal.fire({
      title: '<span class="font-black text-zinc-800">تحديث بيانات المنتج</span>',
      html: `
        <div class="flex flex-col gap-4 p-2" dir="rtl">
          <label class="text-right text-[10px] font-black text-zinc-400 mr-2 uppercase">اسم المنتج</label>
          <input id="name" type="text" value="${product.name}" class="swal2-input !m-0 w-full" />
          <label class="text-right text-[10px] font-black text-zinc-400 mr-2 uppercase">السعر</label>
          <input id="price" type="number" value="${product.price}" class="swal2-input !m-0 w-full" />
          <label class="text-right text-[10px] font-black text-zinc-400 mr-2 uppercase">الفئة</label>
          <input id="category" type="text" value="${product.category || ''}" class="swal2-input !m-0 w-full" />
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'حفظ التعديلات',
      cancelButtonText: 'إلغاء',
      preConfirm: () => {
        const name = document.getElementById('name').value.trim();
        const price = document.getElementById('price').value.trim();
        const category = document.getElementById('category').value.trim();
        if (!name || !price) {
          Swal.showValidationMessage('لا يمكن ترك الاسم أو السعر فارغاً');
          return false;
        }
        return { name, price: parseFloat(price), category };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        updateMutation.mutate({ id: product.id, payload: result.value });
      }
    });
  };

  const handleDelete = (productId) => {
    premiumSwal.fire({
      title: 'هل أنت متأكد من الحذف؟',
      text: "سيتم إزالة هذا الصنف نهائياً من سجلات المخزون",
      icon: 'warning',
      iconColor: '#ef4444',
      showCancelButton: true,
      confirmButtonText: 'نعم، حذف الصنف',
      cancelButtonText: 'تراجع',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(productId);
      }
    });
  };

  return (
    <div className="min-h-screen w-full pt-7 font-sans px-4 lg:px-8" dir="rtl">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-2 h-8 bg-[#D4AF37] rounded-full shadow-[0_0_15px_rgba(212,175,55,0.4)]"></div>
            <h1 className="text-3xl font-black text-zinc-900 tracking-tight">إدارة المنتجات</h1>
          </div>
          <p className="text-zinc-500 font-bold text-sm mr-5 opacity-70 italic">نظام سِجل لإدارة الزيوت وقطع الغيار</p>
        </div>

        <button
          onClick={handleAdd}
          disabled={addMutation.isPending}
          className="group relative overflow-hidden bg-zinc-900 text-white px-8 py-3 rounded-md font-black text-sm flex items-center gap-3 shadow-2xl shadow-zinc-200 transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-50"
        >
          <div className="absolute inset-0 bg-[#D4AF37] translate-y-[102%] group-hover:translate-y-0 transition-transform duration-300"></div>
          <Plus size={20} className="relative z-10 text-[#D4AF37] group-hover:text-zinc-900 transition-colors" />
          <span className="relative z-10 transition-colors group-hover:text-zinc-900">إضافة صنف جديد</span>
        </button>
      </div>


      {/* Table Section */}
      <div className="  overflow-hidden">
        <div className="overflow-x-auto w-full">
          <ProductsTable
            products={productsList}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAdd={handleAdd}
          />
        </div>
      </div>

      {/* Branding Footer */}
      <div className="py-10 flex flex-col items-center gap-2 opacity-40">
        <div className="flex items-center gap-2">
          <div className="h-[1px] w-12 bg-zinc-300"></div>
          <span className="text-[10px] font-black tracking-[0.3em] text-zinc-500 uppercase">سِجل للزيوت</span>
          <div className="h-[1px] w-12 bg-zinc-300"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;