import api from '../../../api/axiosConfig'

const productService = {
  getProducts: async (params = {}) => {
    const { data } = await api.get('/products?populate=*', { params });    
    return data.data
  },

  addProduct: async (payload) => {
    const { data } = await api.post('/products', payload)
    return data
  },

  updateProduct: async (id, payload) => {
    const { data } = await api.put(`/products/${id}`, payload)
    return data
  },

  deleteProduct: async (id) => {
    const { data } = await api.delete(`/products/${id}`)
    return data
  },
}

export default productService
