import { useQuery } from "@tanstack/react-query"
import { AtributeServices } from "../services/attributesServices"

export const useGetAttribute = () => {

    const Attributes = useQuery({
        queryKey: ["attributes"],
        queryFn: AtributeServices.getAtributes,
        staleTime: 1000 * 60 * 5,
    });

    return {
        attributes: Attributes.data,
        isLoading: Attributes.isLoading,
        isError: Attributes.isError,
        error: Attributes.error,
        refetch: Attributes.refetch
    }
}  