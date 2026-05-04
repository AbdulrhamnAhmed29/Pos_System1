import { useQuery } from "@tanstack/react-query"
import { BrandServices } from "../services/BrandServices"

export const useGetBrands = () => {
    const useQueryBrands = useQuery({
        queryKey: ["brands"],
        queryFn: () => BrandServices.getBrands(),
        staleTime: 1000 * 60 * 5,
    });

    return {
        brands: useQueryBrands.data,
        isloading: useQueryBrands.isLoading,
        Error: useQueryBrands.error,
    }
}