import { useQuery } from '@tanstack/react-query'
import productService from '../services/Services'

export const useGetProducts = () => {
  const {data = [],isLoading,error, refetch, } = useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getProducts(),
    staleTime: 1000 * 60 * 5,   
  })

  return {
    data,
    isLoading,
    error,
    refetch,
  }
}
