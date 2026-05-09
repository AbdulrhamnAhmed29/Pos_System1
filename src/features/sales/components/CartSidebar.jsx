import React from 'react';
import { ShoppingCart, Trash2, Plus, Minus, CheckCircle } from 'lucide-react';

const CartSidebar = ({ cart, setCart, cartTotal }) => {
  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("catr");
  }



  return (
    <div className="w-[380px] h-[480px] pb-2 bg-white border-r border-zinc-100 shadow-2xl flex flex-col">
      <div className="p-5 bg-zinc-900 text-white rounded-bl-[4rem] shadow-lg">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-black flex items-center gap-2">
            <ShoppingCart size={24} className="text-[#D4AF37]" /> قائمة الطلبات
          </h2>
          <span className="bg-[#D4AF37] text-zinc-900 px-2 py-1 rounded-full text-xs font-black">{cart.length}</span>
        </div>
        <div className="space-y-1">
          <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">الإجمالي النهائي</p>
          <p className="text-5xl font-black text-[#D4AF37]">{cartTotal.toFixed(2)} <span className="text-sm">ج.م</span></p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-zinc-300 opacity-40">
            <ShoppingCart size={60} strokeWidth={1} />
            <p className="mt-4 font-bold">لا توجد أصناف في السلة</p>
          </div>
        ) : (
          cart.map(item => (
            <div key={item.id} className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-zinc-100 hover:shadow-md transition-all">
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-zinc-900 truncate">{item.name}</h4>
                <p className={`font-black text-[12px] ${item.attributes?.[0]?.name === "خدمة" ? "hidden" : ""}  `}>{item.attribute_sets?.[0].name} <span>{item.attributes?.[0].name}</span></p>
                <p className="text-sm font-black text-[#D4AF37] mt-1">
                  {(item.cost_price * item.quantity).toFixed(2)} ج.م
                </p>

              </div>
              <div className="flex items-center gap-1 bg-zinc-50 rounded-xl p-1 border border-zinc-100">
                <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 flex items-center justify-center bg-white rounded-lg text-zinc-500 shadow-sm"><Minus size={12} /></button>
                <span className="text-xs font-black w-7 text-center">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 flex items-center justify-center bg-zinc-900 rounded-lg text-white shadow-sm"><Plus size={12} /></button>
              </div>
              <button onClick={() => removeItem(item.id)} className="p-1.5 text-zinc-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
            </div>
          ))
        )}
      </div>

        <div className="flex gap-3 ps-2 pe-2 border-t border-zinc-300 shadow-[0_-4px_10px_-1px_rgba(0,0,0,0.1)] pt-4">
          <button className="w-full bg-[#D4AF37] hover:bg-zinc-900 hover:text-[#D4AF37] text-zinc-900 py-2 rounded-[2rem] font-black text-base flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95">
            <CheckCircle size={24} /> إتمام ودفع الفاتورة
          </button>
          <button
            onClick={clearCart}
            className="w-full bg-[#D4AF37] hover:bg-zinc-900 hover:text-[#D4AF37] text-zinc-900 py-2 rounded-[2rem] font-black text-base flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95">
            الغاء العملية
          </button>
        </div>

   
    </div>
  );
};

export default CartSidebar;