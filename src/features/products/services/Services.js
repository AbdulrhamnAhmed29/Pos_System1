import BaseApi from '../../../api/baseApi';

const productService = {
  getProducts: async (params = {}) => {
    const { data } = await BaseApi.getAll('/products?pagination[pageSize]=2000&populate=*', { params });
    
    return data
  },

  addProduct: async (payload) => {

    const { data } = await BaseApi.create('/products?=*', payload);
    return data
  },

  updateProduct: async (id, payload) => {
    const { data } = await BaseApi.update(`/products`, id , payload)
    return data
  },

  deleteProduct: async (id) => {
    const { data } = await BaseApi.remove(`/products`, id)
    return data
  },
}

export default productService
