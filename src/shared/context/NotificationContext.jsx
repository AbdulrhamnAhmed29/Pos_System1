import React, { createContext, useMemo } from 'react'
import { useGetProducts } from '../../features/products/hooks/UseGetProducts'

export const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const { data: products } = useGetProducts()

  const lowStockProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    return products.filter(product => {
      const isLowBulk = (product.parent_id === null && product.bulk_quantity > 0 && product.bulk_quantity < 30);
      const isLowQuantity = (product.quantity !== null && product.quantity > 0 && product.quantity < 21);
      return isLowBulk || isLowQuantity;
    });
  }, [products]); 





  const value = {
    lowStockProducts,
    lowStockCount: lowStockProducts.length,
    allProducts: products || [],
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => {
  const context = React.useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider')
  }
  return context
}
