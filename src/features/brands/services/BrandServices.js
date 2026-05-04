import BaseApi from "../../../api/baseApi"

export const BrandServices = {

    getBrands: async () => {
        const { data } = await BaseApi.getAll("/brands?populate=*");
        return data
    }

}