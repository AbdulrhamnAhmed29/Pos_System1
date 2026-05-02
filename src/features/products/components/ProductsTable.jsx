import React, { useState, useMemo } from 'react'
import { Edit2, Trash2, Plus, Box, Barcode, Filter, Droplet } from 'lucide-react'

const ProductsTable = ({ products, isLoading, onEdit, onDelete, onAdd }) => {
  const [typedProducts, setTypedProducts] = useState("الكل");
  const [filteredcategories, setFilteredcategories] = useState("الكل");

  const categories = useMemo(() => {
    const cats = new Set();
    products?.forEach(product => {
      if (product.category?.name) {
        cats.add(product.category.name.trim());
      }
    });
    return ['الكل', ...Array.from(cats).sort()];
  }, [products]);

  const productsByCategory = products?.filter(product => {
    if (filteredcategories === "الكل") return true;
    const categoryName = (product.category?.name || "بدون قسم").trim();
    return categoryName === filteredcategories.trim();
  }) || [];




  const finalFilteredProducts = typedProducts === "الكل"
    ? productsByCategory
    : productsByCategory.filter(p => p.attribute_sets[0]?.name === typedProducts);
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center py-32 gap-6">
        <div className="relative">
          <div className="h-20 w-20 rounded-full border-4 border-zinc-100 border-t-[#D4AF37] animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Droplet className="text-[#D4AF37] animate-bounce" size={24} />
          </div>
        </div>
        <p className="text-zinc-400 font-bold text-sm tracking-[0.2em] animate-pulse">جاري جلب بيانات المخزن...</p>
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20 bg-zinc-50/50 rounded-[3rem] border-2 border-dashed border-zinc-200 m-6">
        <div className="bg-white w-20 h-20 rounded-3xl shadow-inner flex items-center justify-center mx-auto mb-6 text-zinc-300">
          <Box size={40} />
        </div>
        <h3 className="text-zinc-800 text-xl font-black mb-2">المخزن فارغ</h3>
        <p className="text-zinc-500 mb-8 max-w-xs mx-auto text-sm">لم يتم إضافة أي منتجات حتى الآن، ابدأ ببناء مخزنك الآن.</p>
        <button
          onClick={onAdd}
          className="bg-zinc-900 text-white px-10 py-4 rounded-2xl font-black text-sm hover:bg-[#D4AF37] hover:text-zinc-900 transition-all flex items-center gap-3 mx-auto shadow-2xl"
        >
          <Plus size={20} />
          إضافة منتج جديد
        </button>
      </div>
    )
  }

  return (
    <div className="w-full space-y-6 px-4">
      {/* الفلتر الرئيسي - الفئات */}
      <div className="flex flex-wrap gap-2 bg-white p-4 rounded-2xl shadow-md border border-zinc-100 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setFilteredcategories(category);
              setTypedProducts("الكل");
            }}
            className={`px-6 py-3 rounded-xl text-xs font-black transition-all duration-300 whitespace-nowrap ${
              filteredcategories === category
                ? 'bg-gradient-to-r from-zinc-900 to-zinc-800 text-[#D4AF37] shadow-lg shadow-zinc-900/50 scale-105'
                : 'bg-zinc-50 text-zinc-600 border border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* الفلتر الفرعي - خاص عند اختيار فئة معينة */}
      {filteredcategories === "زيوت" && (
        <div className="flex items-center gap-4 bg-zinc-900 p-2 rounded-2xl w-fit animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="flex items-center gap-2 px-3 border-l border-zinc-700 text-zinc-400">
            <Filter size={14} />
            <span className="text-[10px] font-black uppercase">التعبئة:</span>
          </div>
          <div className="flex gap-1">
            {['الكل', 'سايب', 'جركن'].map((type) => (
              <button
                key={type}
                onClick={() => setTypedProducts(type)}
                className={`px-5 py-1.5 rounded-lg text-[11px] font-bold transition-all ${typedProducts === type
                    ? 'bg-[#D4AF37] text-zinc-900'
                    : 'text-zinc-400 hover:text-white'
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* الجدول */}
      <div className="bg-white rounded-[2rem] shadow-xl shadow-zinc-200/50 border border-zinc-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-zinc-50/50 border-b border-zinc-100">
                <th className="px-6 py-4 text-right text-xs font-black text-zinc-400 uppercase tracking-widest">المنتج</th>
                <th className="px-6 py-4 text-right text-xs font-black text-zinc-400 uppercase tracking-widest">الأسعار</th>
                <th className="px-6 py-4 text-center text-xs font-black text-zinc-400 uppercase tracking-widest">التصنيف</th>

                {/* إظهار الأعمدة بناءً على نوع الفلتر */}
                {typedProducts !== "سايب" && (
                  <th className="px-6 py-4 text-center text-xs font-black text-zinc-400 uppercase tracking-widest">مخزون (جركن)</th>
                )}
                {typedProducts !== "جركن" && (
                  <th className="px-6 py-4 text-center text-xs font-black text-zinc-400 uppercase tracking-widest">مخزون (كيلو/لتر)</th>
                )}

                <th className="px-6 py-4 text-center text-xs font-black text-zinc-400 uppercase tracking-widest">الباركود</th>
                <th className="px-4 py-4 text-center text-xs font-black text-zinc-400 uppercase tracking-widest">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {finalFilteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className={`group transition-all hover:bg-zinc-50/80 
                    ${product.parent_id === null ? 'hidden' : ''}
                    ${product.quantity < 5 && product.quantity !== null ? 'bg-red-50/30' : ''}
                  `}
                >
                  {/* اسم المنتج */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-zinc-900 font-bold text-sm group-hover:text-[#D4AF37] transition-colors">
                        {product.name}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-medium">ID: #{product.id}</span>
                    </div>
                  </td>

                  {/* الأسعار */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="text-[11px] text-zinc-400">شراء: <span className="text-zinc-600 font-bold">{product.buying_price || '0'}</span></div>
                      <div className="text-sm font-black text-zinc-900 italic">{product.cost_price} <small className="text-[#D4AF37] not-italic">جنية</small></div>
                    </div>
                  </td>

                  {/* الفئة والنوع */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="bg-zinc-100 text-zinc-600 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase">
                        {product.category?.name?.trim() || 'عام'}
                      </span>
                      <span className="text-[9px] font-bold text-zinc-400">{product?.attribute_sets[0]?.name || "عادي"}</span>
                    </div>
                  </td>

                  {/* مخزون الجركن */}
                  {typedProducts !== "سايب" && (
                    <td className="px-6 py-4 text-center">
                      <span className={`text-sm font-black ${(!product.quantity || product.quantity < 5) ? 'text-red-500 animate-pulse' : 'text-zinc-700'}`}>
                        {product.quantity ?? '---'}
                      </span>
                    </td>
                  )}

                  {/* مخزون السايب */}
                  {typedProducts !== "جركن" && (
                    <td className="px-6 py-4 text-center">
                      <span className={`text-sm font-black ${(product.bulk_quantity < 10) ? 'text-orange-500' : 'text-zinc-700'}`}>
                        {product.bulk_quantity ?? '---'}
                      </span>
                    </td>
                  )}

                  {/* الباركود */}
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-50 rounded-lg text-zinc-400 border border-zinc-100">
                      <Barcode size={12} />
                      <span className="text-[10px] font-mono font-bold tracking-tighter text-zinc-600">{product.barcode || 'N/A'}</span>
                    </div>
                  </td>

                  {/* التحكم */}
                  <td className="px-4 py-4">
                    <div className="flex justify-center gap-1.5  transition-opacity">
                      <button
                        onClick={() => onEdit(product)}
                        className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                        title="تعديل"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => onDelete(product.id)}
                        className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                        title="حذف"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* فوتر الجدول */}
        <div className="bg-zinc-50/50 px-6 py-4 border-t border-zinc-100 flex justify-between items-center">
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
            إجمالي المنتجات المعروضة: {finalFilteredProducts.length}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductsTable;