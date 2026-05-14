
import { useQuery } from '@tanstack/react-query'
import { servicesOrders } from '../servicesOrders/ServicesOrders';
import { useState } from 'react';
export const useOrders = (id) => {
    const [searchItem, setSearchitem] = useState("");
    const [status, setStatus] = useState("الكل");
    const today1 = new Intl.DateTimeFormat('sv-SE').format(new Date());
    const [selectedDate, setSelectedDate] = useState(today1);
    const [startDay, setStartDay] = useState();
    const [endDay, setEndDay] = useState();

    const { data: orders, isLoading, isFetching } = useQuery({
        queryKey: ["orders", searchItem, status, selectedDate ,startDay ,endDay],
        queryFn: () => servicesOrders.getOrders(searchItem, status, selectedDate),
        keepPreviousData: true,
    });

    const {
        data: orderById,
        isLoading: isLoadingSingle,
        isError
    } = useQuery({
        queryKey: ["order", id],
        queryFn: () => servicesOrders.getOrderById(id),
        enabled: !!id,
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
        isError,
        setStartDay,
        setEndDay

    };
};