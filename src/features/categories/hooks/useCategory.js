import { useQuery } from "@tanstack/react-query"
import { catServices } from "../services/catServices"

export const useCategory = () => {
    const getCategories = useQuery({
        queryKey: ["categories"],
        queryFn: () => catServices.getCategorise(),
        staleTime: 1000 * 60 * 5,
    });
    return {
        categories: getCategories.data,
        isLoading: getCategories.isLoading,
        error: getCategories.error,
    }
}