import { useMutation, useQueryClient } from '@tanstack/react-query'
import productService from '../services/Services'
import Swal from 'sweetalert2'

export const useMutationProduct = () => {
  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: (payload) => productService.addProduct(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      Swal.fire({
        icon: 'success',
        title: 'نجح!',
        text: 'تم إضافة المنتج بنجاح',
        confirmButtonColor: '#D4AF37',
      })
      
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'خطأ!',
        text: error.response?.data?.message || 'حدث خطأ أثناء إضافة المنتج',
        confirmButtonColor: '#D4AF37',
      })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => productService.updateProduct(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      Swal.fire({
        icon: 'success',
        title: 'نجح!',
        text: 'تم تحديث المنتج بنجاح',
        confirmButtonColor: '#D4AF37',
      })
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'خطأ!',
        text: error.response?.data?.message || 'حدث خطأ أثناء تحديث المنتج',
        confirmButtonColor: '#D4AF37',
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => productService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      Swal.fire({
        icon: 'success',
        title: 'نجح!',
        text: 'تم حذف المنتج بنجاح',
        confirmButtonColor: '#D4AF37',
      })
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'خطأ!',
        text: error.response?.data?.message || 'حدث خطأ أثناء حذف المنتج',
        confirmButtonColor: '#D4AF37',
      })
    },
  })

  return {
   mutate :  addMutation.mutate,
    updateMutation,
    deleteMutation,
  }
}
