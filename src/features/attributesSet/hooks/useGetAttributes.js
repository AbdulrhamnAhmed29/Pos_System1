import { useQuery } from "@tanstack/react-query";
import { AtributeSetServices } from "../services/attributesSetServices";

export const useGetAttributeSet = () => {
    // قمنا بتغيير اسم المتغير ليكون أكثر دقة
    const query = useQuery({
        queryKey: ["attributesSet"],
        queryFn: () => AtributeSetServices.getAtributeSet(),
        staleTime: 1000 * 60 * 5, 
    });

    return {
        attributeSet: query.data, 
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch 
    };
};