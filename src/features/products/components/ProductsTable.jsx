import { useMemo, useState } from "react";
import { ProductRow } from "./ProductRow";
import { LoadingState } from "../../../ui-ux/LoadingState";
import EmptyState from "../../../ui-ux/EmptyState";
import { TableFilters } from "../../../ui-ux/TableFilters";

export const ProductsTable = ({ products, isLoading, onEdit, onDelete, onAdd }) => {
  const [typedProducts, setTypedProducts] = useState("الكل");
  const [filteredcategories, setFilteredcategories] = useState("الكل");

  // استخراج الفئات (Logics remain the same)
  const categories = useMemo(() => {
    const cats = new Set();
    products?.forEach(p => p.category?.name && cats.add(p.category.name.trim()));
    return ['الكل', ...Array.from(cats).sort()];
  }, [products]);

  // تصفية البيانات
  const filteredList = useMemo(() => {
    let result = products || [];
    if (filteredcategories !== "الكل") {
      result = result.filter(p => (p.category?.name || "بدون قسم").trim() === filteredcategories.trim());
    }
    if (typedProducts !== "الكل") {
      result = result.filter(p => p.attribute_sets[0]?.name === typedProducts);
    }
    return result;
  }, [products, filteredcategories, typedProducts]);

  if (isLoading) return <LoadingState />;
  if (!products?.length) return <EmptyState onAdd={onAdd} />; // يمكنك إنشاء مكون EmptyState بنفس الطريقة


  return (
    <div className="w-full space-y-6 px-4">
      <TableFilters 
        categories={categories}
        activeCategory={filteredcategories}
        onCategoryChange={(cat) => { setFilteredcategories(cat); setTypedProducts("الكل"); }}
        activeType={typedProducts}
        onTypeChange={setTypedProducts}
      />

      <div className="bg-white rounded-[2rem] shadow-xl border border-zinc-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-zinc-50/50 border-b border-zinc-100 text-right text-xs font-black text-zinc-400 uppercase">
                <th className="px-6 py-4">المنتج</th>
                <th className="px-6 py-4">الأسعار</th>
                <th className="px-6 py-4 text-center">التصنيف</th>
                {typedProducts !== "سايب" && <th className="px-6 py-4 text-center">مخزون (جركن)</th>}
                {typedProducts !== "جركن" && <th className="px-6 py-4 text-center">مخزون (كيلو)</th>}
                <th className="px-6 py-4 text-center">الباركود</th>
                <th className="px-4 py-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {filteredList.map(product => (
                <ProductRow 
                  key={product.id} 
                  product={product} 
                  activeType={typedProducts}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-zinc-50/50 px-6 py-4 border-t border-zinc-100">
          <p className="text-[11px] font-bold text-zinc-400 uppercase">إجمالي المعروض: {filteredList.length}</p>
        </div>
      </div>
    </div>
  );
};