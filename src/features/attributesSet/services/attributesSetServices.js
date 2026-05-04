import BaseApi from "../../../api/baseApi"

export const AtributeSetServices = {
    getAtributeSet : async()=>{
        const {data} = await BaseApi.getAll("/attribute-sets?populate=*");
        return data
    }
}