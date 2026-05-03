import { Edit2, Trash2, Barcode } from 'lucide-react';

export const ProductRow = ({ product, activeType, onEdit, onDelete }) => {
  if (product.parent_id === null) return null;

  const lowStock = product.quantity < 5 && product.quantity !== null;

  return (
    <tr className={`group transition-all hover:bg-zinc-50/80 ${lowStock ? 'bg-red-50/30' : ''}`}>
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
          <div className="text-[11px] text-zinc-400">شراء: {product.buying_price || '0'}</div>
          <div className="text-sm font-black text-zinc-900 italic">
            {product.cost_price} <small className="text-[#D4AF37] not-italic">جنية</small>
          </div>
        </div>
      </td>

      {/* التصنيف */}
      <td className="px-6 py-4 text-center">
        <div className="flex flex-col items-center gap-1">
          <span className="bg-zinc-100 text-zinc-600 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase">
            {product.category?.name?.trim() || 'عام'}
          </span>
          <span className="text-[9px] font-bold text-zinc-400">{product?.attribute_sets?.[0]?.name || "عادي"}</span>
        </div>
      </td>

      {/* الكميات المشروطة */}
      {activeType !== "سايب" && (
        <td className="px-6 py-4 text-center">
          <span className={`text-sm font-black ${lowStock ? 'text-red-500 animate-pulse' : 'text-zinc-700'}`}>
            {product.quantity ?? '---'}
          </span>
        </td>
      )}
      
      {activeType !== "جركن" && (
        <td className="px-6 py-4 text-center">
          <span className={`text-sm font-black ${product.bulk_quantity < 10 ? 'text-orange-500' : 'text-zinc-700'}`}>
            {product.bulk_quantity ?? '---'}
          </span>
        </td>
      )}

      {/* الباركود */}
      <td className="px-6 py-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-50 rounded-lg text-zinc-400 border border-zinc-100">
          <Barcode size={12} />
          <span className="text-[10px] font-mono font-bold">{product.barcode || 'N/A'}</span>
        </div>
      </td>

      {/* الإجراءات */}
      <td className="px-4 py-4">
        <div className="flex justify-center gap-1.5">
          <button onClick={() => onEdit(product.documentId)} className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
            <Edit2 size={14} />
          </button>
          <button onClick={() => onDelete(product.documentId)} className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm">
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
};