import { Edit2, Trash2, Barcode, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProductRow = ({ product, activeType, onEdit, onDelete }) => {
  // التحقق من حالة المخزون
  const lowStock = product.quantity < 22 && product.quantity !== null;


  const isLoose = product.attribute_sets?.[0]?.name === "سايب";
  const isServices = product.quantity === 0;
  const is_Services = product.bulk_quantity === 0;

  const isParent = product.parent_id === null;


  if (isLoose) return null;

  return (
    <tr className={`
      group transition-all duration-300 border-b border-zinc-50
      hover:bg-zinc-50/80 relative
      ${lowStock ? 'bg-red-50/20' : ''}
            ${isParent ? 'bg-gray-200' : ''}


    `}>

      {/* product name   */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className={`
            w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors
            ${lowStock ? 'bg-red-100 text-red-600' : 'bg-zinc-100 text-zinc-500 group-hover:bg-[#D4AF37]/10 group-hover:text-[#D4AF37]'}
          `}>
            <Package size={18} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-zinc-900 font-black text-sm truncate group-hover:text-[#D4AF37] transition-colors">
              {product.name}
            </span>
          </div>
        </div>

      </td>

      {/* product type  */}
      <td className="px-6 py-5 text-center">
        <span className={` ${isServices ? "hidden" : ""} text-["10px"] font-black`}>{product?.attributes?.[0]?.name}</span>

      </td>

      {/* prices */}
      <td className="px-6 py-5">
        <div className={` flex flex-col gap-0.5`}>
          <div className={`text-sm font-black text-zinc-900 flex items-center gap-1 ${isParent ? "hidden" : ""}`}>
            {product.cost_price}
            <span className="text-[#D4AF37] text-xs">جنية</span>
          </div>
        </div>
      </td>


      {/*  quantity  */}
      {activeType !== "سايب" && (
        <td className={` px-6 py-5 text-center`}>
          <div className={`${isParent ? "hidden" : ""} ${isServices ? "hidden" : ""} flex flex-col  items-center`}>
            <span className={`text-sm font-black px-3 py-1 rounded-lg ${lowStock ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-emerald-50 text-emerald-600'
              }`}>
              {!product.quantity && isServices ? "" : product.quantity}

              <span className="text-[10px] ms-1 font-black uppercase tracking-tighter">
                {product.attribute_sets?.[0]?.name || ""}
              </span>
            </span>

            {lowStock && <span className="text-[8px] text-red-500 font-bold mt-1">مخزون منخفض!</span>}
          </div>
        </td>
      )}

      {/*   (Bulk) */}
      {activeType !== "جركن" && (
        <td className="px-6 py-5 text-center">
          <span className={`text-sm font-black  ${is_Services ? "hidden" : ""} ${product.bulk_quantity < 40 &&product.bulk_quantity !=null ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-emerald-50 text-emerald-600'}`}>
            {product.bulk_quantity ?? '---'}
          </span>
        </td>
      )}

      {/* الباركود */}
      <td className={`px-6 py-5 text-center `}>
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-zinc-200 rounded-xl shadow-sm text-zinc-500 group-hover:border-[#D4AF37]/30 transition-colors ${isParent ? "hidden" : ""}`}>
          <Barcode size={14} className="text-zinc-400 group-hover:text-[#D4AF37]" />
          <span className="text-[10px] font-mono font-bold tracking-tighter">{product.barcode || '---'}</span>
        </div>
      </td>

      {/* الإجراءات (Actions) */}
      <td className="px-6 py-5">
        <div className={`flex justify-end gap-2 `}>
          <Link
            to={`/update-product/${product.documentId}`}
            className={`p-2.5 rounded-xl bg-white border border-zinc-100 text-blue-500 hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:shadow-lg hover:shadow-blue-200 transition-all ${isParent ? "" : "hidden"} active:scale-90`}
            title="تعديل"
          >
            <Edit2 size={14} />
          </Link>
          <button
            onClick={() => onDelete(product.documentId)}
            className="p-2.5 rounded-xl bg-white border border-zinc-100 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-lg hover:shadow-red-200 transition-all active:scale-90"
            title="حذف"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
};