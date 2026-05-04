import BaseApi from "../../../api/baseApi";

export const catServices = {
    getCategorise: async ()=>{
     const {data} = await BaseApi.getAll('/categories?populate=*');
     return data;
    },
      
};