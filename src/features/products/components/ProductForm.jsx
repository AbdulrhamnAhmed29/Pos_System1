import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

export default function ProductForm({ categories, brands, Mutate, attributeSet, attribute }) {

  // 1. إعداد الفورم (تأكد من مطابقة الأسماء هنا مع الـ register)
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      category_id: '',
      brand_id: '',
      variants: [{ attribute_id: '', buying_price: 0, cost_price: 0, quantity: 0, barcode: '', attributeSet: '' }]
    }
  });
  console.log(errors);

  // 2. إدارة المصفوفة
  const { fields } = useFieldArray({
    control,
    name: "variants"
  });

  const onSubmit = (data) => {
    // التحويل لمنتجات مستقلة
    const finalProductsArray = data.variants.map((variant) => {
      return {
        name: `${data.name} - ${attribute.find(a => String(a.id) === String(variant.attribute_id))?.name || ''}`,
        category: data.category_id, // نستخدم الاسم الصحيح من الـ register
        brand: data.brand_id,     // نستخدم الاسم الصحيح من الـ register
        attribute: variant.attribute_id,
        buying_price: Number(variant.buying_price),
        cost_price: Number(variant.cost_price),
        quantity: Number(variant.quantity),
        barcode: variant.barcode,
        attributeSet: variant.attributeSet,
      };
    });

    Mutate(finalProductsArray[0]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6 bg-white rounded-xl shadow-md">

      {/* القسم الأساسي - تأكد من الـ register هنا */}
      <div className="grid grid-cols-3 gap-4 p-4 border-b">
        <input {...register("name")} placeholder="اسم الصنف الأساسي" className="border p-2 text-black rounded" />

        <select {...register("category_id")} className="border p-2 rounded text-black">
          <option value="">اختر القسم</option>
          {categories?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <select {...register("brand_id")} className="border p-2 rounded text-black">
          <option value="">اختر البراند</option>
          {brands?.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
      </div>

      {/* قسم الأحجام - التصحيح الجوهري هنا */}
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-5 gap-2 items-end p-4 bg-gray-50 rounded-lg">

            {/* لازم تستخدم index عشان الـ array يتبني صح */}
            <select {...register(`variants.${index}.attribute_id`)} className="border p-2 rounded text-black">
              <option value="">الحجم</option>
              {attribute?.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
            {/* لازم تستخدم index عشان الـ array يتبني صح */}
            <select {...register(`variants.${index}.attributeSet`)} className="border p-2 rounded text-black">
              <option value=""> نوع المنتج </option>
              {attributeSet?.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>

            <input type="number" {...register(`variants.${index}.buying_price`)} placeholder="شراء" className="border p-2 rounded text-black" />
            <input type="number" {...register(`variants.${index}.cost_price`)} placeholder="بيع" className="border p-2 rounded text-black" />
            <input type="number" {...register(`variants.${index}.quantity`)} placeholder="كمية" className="border p-2 rounded text-black" />
            <input type="text" {...register(`variants.${index}.barcode`)} placeholder="الباركود" className="border p-2 rounded text-black" />

          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button type="submit" className="bg-green-600 text-white px-8 py-2 rounded font-bold text-lg hover:bg-green-700 transition-colors">
          حفظ الكل كمنتجات منفصلة
        </button>
      </div>

    </form>
  );
}