import BaseApi from "../../../api/baseApi";

export const servicesOrders = {
    createOrder: async (payload) => {
        const { data } = await BaseApi.create("/orders", payload);
        return data
    },

    createOrdersItems: async (payload) => {
        const  {data}  = await BaseApi.create("/order-items", payload);
        return data
    }
}