import BaseApi from '../../../api/baseApi';

const productService = {
  getProducts: async (params = {}) => {
    const { data } = await BaseApi.getAll('/products?populate=*', { params });
    return data
  },

  addProduct: async (payload) => {

    const { data } = await BaseApi.create('/products', {

      data: {
        name: payload.name,
        category: payload.category,
        brand: payload.brand,
        buying_price: payload.buying_price,
        cost_price: payload.cost_price,
        quantity: payload.quantity,
        barcode: payload.barcode
      },
    });
    return data
  },

  updateProduct: async (id, payload) => {
    const { data } = await BaseApi.update(`/products/${id}`, payload)
    return data
  },

  deleteProduct: async (id) => {
    const { data } = await BaseApi.remove(`/products`, id)
    return data
  },
}

export default productService
