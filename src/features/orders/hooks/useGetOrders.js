
import { useQuery } from '@tanstack/react-query'
import { servicesOrders } from '../servicesOrders/ServicesOrders';
import { useState } from 'react';
export const useOrders = (id) => {
    const [searchItem, setSearchitem] = useState("");
    const [status, setStatus] = useState("الكل");
    const today1 = new Intl.DateTimeFormat('sv-SE').format(new Date());
    

    const [selectedDate, setSelectedDate] = useState(today1);

    const { data: orders, isLoading, isFetching } = useQuery({
        queryKey: ["orders", searchItem, status, selectedDate],
        queryFn: () => servicesOrders.getOrders(searchItem, status, selectedDate),
        keepPreviousData: true,
    });

    const {
        data: orderById, // بنفكك data ونسميها orderById
        isLoading: isLoadingSingle, // بنغير الاسم عشان ميتعارضش مع الـ Loading بتاع الـ orders
        isError
    } = useQuery({
        queryKey: ["order", id],
        queryFn: () => servicesOrders.getOrderById(id),
        enabled: !!id, // دي ممتازة عشان ميبعتش Request والـ id فاضي
    });
    return {
        orders,
        meta: orders?.meta,
        isLoading: isLoading || isFetching,
        searchItem, setSearchitem,
        status, setStatus,
        setSelectedDate,
        selectedDate,
        orderById,
        isLoadingSingle,
        isError

    };
};