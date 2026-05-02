import React, { createContext, useMemo } from 'react'
import { useGetProducts } from '../../features/products/hooks/UseGetProducts'

export const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const { data: products } = useGetProducts()

  const lowStockProducts = useMemo(() => {
    if (!products || products.length === 0) return []
    return products.filter(product => product.quantity < 5 && product.parent_id !== null  && product.bulk_quantity < 10 && product.category?.name !== "خدمة" &&product.category?.name !== "غسيل"  )
  }, [products])

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
