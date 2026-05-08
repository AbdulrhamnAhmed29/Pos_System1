import { useMemo, useState } from "react";
import { ProductRow } from "./ProductRow";
import { LoadingState } from "../../../ui/LoadingState";
import EmptyState from "../../../ui/EmptyState";

export const ProductsTable = ({ products, isLoading, onEdit, onDelete, onAdd }) => {
  const [typedProducts, setTypedProducts] = useState("الكل");
  const [SearchProducts, setSearchProducts] = useState("");

  const filteredProducts = useMemo(() => {

    const searchTerm = SearchProducts.toLowerCase().trim();
    if (!searchTerm) {
      return products;
    };

    return products.filter((product) => {
      const productName = product.name ? product.name.toLowerCase().trim() : '';
      return productName.includes(searchTerm);
    });
  }, [products, SearchProducts]);



  if (isLoading) return <LoadingState />;
  if (!products?.length) return <EmptyState onAdd={onAdd} />; // يمكنك إنشاء مكون EmptyState بنفس الطريقة


  return (
    <div className="w-full space-y-6 ">

      {/* search button  */}
      <div className="relative max-w-md w-full group">
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <input
          type="text"
          placeholder="ابحث عن منتجك ..."
          dir="rtl"
          className="block w-full pr-11 pl-4 py-3.5 bg-white border border-gray-200 
               text-gray-900 text-sm rounded-2xl shadow-sm
               placeholder:text-gray-400
               focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
               hover:border-gray-300 transition-all duration-200"
          onChange={(e) => setSearchProducts(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-[2rem] shadow-xl border border-zinc-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-zinc-50/50 border-b border-zinc-100 text-right text-xs font-black text-zinc-400 uppercase">
                <th className="px-6 py-4">المنتج</th>
                <th className="px-6 py-4">نوعه</th>
                <th className="px-6 py-4">الأسعار</th>
                {typedProducts !== "سايب" && <th className="px-6 py-4 text-center">مخزون (جركن)</th>}
                {typedProducts !== "جركن" && <th className="px-6 py-4 text-center">مخزون (كيلو)</th>}
                <th className="px-6 py-4 text-center">الباركود</th>
                <th className="px-4 py-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {filteredProducts.map(product => (
                <ProductRow
                  key={product.id}
                  product={product}
                  activeType={typedProducts}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
       
      </div>
    </div>
  );
};