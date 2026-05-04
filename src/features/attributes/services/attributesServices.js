import BaseApi from "../../../api/baseApi";

export const AtributeServices = {
    getAtributes :async()=>{
        const { data} = await BaseApi.getAll("/attributes?populate=*");
        return data;
    }
}