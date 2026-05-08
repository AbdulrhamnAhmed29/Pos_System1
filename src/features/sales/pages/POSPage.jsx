import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { useNotifications } from '../../../shared/context/NotificationContext';
import SearchAndFilters from '../components/SearchAndFilters';
import ProductCard from '../components/ProductGrid';
import ChildProductView from '../components/ChildProductView';
import CartSidebar from '../components/CartSidebar';

const POSPage = () => {
  const { allProducts } = useNotifications();
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [selectedSubFilter, setSelectedSubFilter] = useState("الكل");
  const [selectedParent, setSelectedParent] = useState(null);
  const [selectedAttribute, setSelectedAttribute] = useState('الكل');
  const searchRef = useRef(null);

  // --- Logic (Memoized) ---
  const categories = useMemo(() => {
    if (!allProducts) return ['الكل'];
    const cats = new Set(allProducts.map(p => p.category?.name).filter(Boolean));
    return ['الكل', ...Array.from(cats).sort()];
  }, [allProducts]);

  const subFilters = useMemo(() => {
    if (!allProducts) return [];
    const filteredByCat = selectedCategory === 'الكل' ? allProducts : allProducts.filter(p => p.category?.name === selectedCategory);
    const brands = new Set();
    filteredByCat.forEach(p => {
      const brandName = Array.isArray(p.brand) ? p.brand[0]?.name : p.brand?.name;
      if (brandName) brands.add(brandName);
    });
    return brands.size > 0 ? ['الكل', ...Array.from(brands).sort()] : [];
  }, [allProducts, selectedCategory]);

  const mainParents = useMemo(() => {
    if (!allProducts) return [];
    return allProducts.filter(product => {
      const isParent = !product.parent_id;
      const matchesCat = selectedCategory === 'الكل' || product.category?.name === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || String(product.barcode || '').includes(searchTerm);
      const brandName = Array.isArray(product.brand) ? product.brand[0]?.name : product.brand?.name;
      const matchesSubFilter = selectedSubFilter === 'الكل' || brandName === selectedSubFilter;
      return isParent && matchesCat && matchesSearch && matchesSubFilter;
    });
  }, [allProducts, searchTerm, selectedCategory, selectedSubFilter]);

  const childProducts = useMemo(() => {
    if (!selectedParent || !allProducts) return [];
    return allProducts.filter(p => 
      p.parent_id === selectedParent.documentId && 
      (selectedAttribute === 'الكل' || p.attribute_sets?.[0]?.name === selectedAttribute)
    );
  }, [selectedParent, allProducts, selectedAttribute]);

  const availableAttributes = useMemo(() => {
    if (!selectedParent || !allProducts) return [];
    const children = allProducts.filter(p => p.parent_id === selectedParent.documentId);
    const attrs = new Set(children.map(c => c.attribute_sets?.[0]?.name).filter(Boolean));
    return ['الكل', ...Array.from(attrs)];
  }, [selectedParent, allProducts]);

  const cartTotal = useMemo(() => cart.reduce((s, i) => s + (Number(i.cost_price) * i.quantity), 0), [cart]);

  // --- Callbacks ---
  const addToCart = useCallback((product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
    setSearchTerm('');
  }, []);

  // --- Effects ---
  useEffect(() => {
    const keepFocus = () => searchRef.current?.focus();
    keepFocus();
    document.addEventListener('click', keepFocus);
    return () => document.removeEventListener('click', keepFocus);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 text-right" dir="rtl">
      <div className="flex h-screen overflow-hidden">
        
        {/* الجانب الأيمن: المنتجات */}
        <div className="flex-1 flex flex-col p-6 overflow-hidden">
          <SearchAndFilters 
            searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchRef={searchRef}
            categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
            subFilters={subFilters} selectedSubFilter={selectedSubFilter} setSelectedSubFilter={setSelectedSubFilter}
          />

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {selectedParent ? (
              <ChildProductView 
                selectedParent={selectedParent} setSelectedParent={setSelectedParent}
                childProducts={childProducts} availableAttributes={availableAttributes}
                selectedAttribute={selectedAttribute} setSelectedAttribute={setSelectedAttribute}
                addToCart={addToCart}
              />
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
                {mainParents.map(product => (
                  <ProductCard key={product.id} product={product} onSelect={setSelectedParent} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* الجانب الأيسر: السلة */}
        <CartSidebar cart={cart} setCart={setCart} cartTotal={cartTotal} />
      </div>
    </div>
  );
};

export default POSPage;