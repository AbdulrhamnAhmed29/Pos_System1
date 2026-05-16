import { useQuery } from '@tanstack/react-query'
import productService from '../services/Services'

export const useGetProducts = (id) => {
  // 1- Get all products 
  const { data = [], isLoading, error, refetch, } = useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getProducts(),
    staleTime: 1000 * 60 * 5,
  });

  return {
    // get all products data 
    data,
    isLoading,
    error,
    refetch,

  }
}
