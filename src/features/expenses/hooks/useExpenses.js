import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ExpensesServises } from "../services/servicesExpenses";
import { useState } from 'react';

export const useExpenses = (id) => {
    const today1 = new Intl.DateTimeFormat('sv-SE').format(new Date());
    const [ExpensesDay, setExpensesDay] = useState(today1);
    const queryClient = useQueryClient();
    const [searchItem, setSearchitem] = useState("");
    const [status, setStatus] = useState("الكل");

    const { data: expesnse, isLoading: loadingData, isError: errordata } = useQuery({
        queryKey: ["expenses", ExpensesDay, status, searchItem],
        queryFn: () => ExpensesServises.getExpenses(ExpensesDay, status, searchItem),
    });

    const deleteExpenses = useMutation({
        mutationFn: (id) => ExpensesServises.removeExpenses(id),
        onError: (error) => {
            console.log(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
        }
    });


    const addExpenses = useMutation({
        mutationFn: (payload) => ExpensesServises.addExpenses({
            data: {
                Person: payload.Person,
                notes: payload.notes,
                price: payload.price,
                type: payload.category
            }
        })

    })

    const { data: expense, isLoading, isPending } = useQuery({
        queryKey: ["expense", id],
        queryFn: () => ExpensesServises.getById(id),
        enabled: !!id,
    })

    const updateExpense = useMutation({
        mutationFn: ({ id, data }) => ExpensesServises.updateExpenses(id, {
            data: {
                type: data.category,
                price: data.price,
                Person: data.Person,
                notes: data.notes
            },

        })
    })

    return {
        // get data 
        expesnse,
        loadingData,
        errordata,
        // ____________
        remove: deleteExpenses.mutate,
        // ____________
        add: addExpenses.mutate,
        // ____________
        // update:expense.mutate,
        byId: expense,
        update: updateExpense.mutate,
        isLoading,
        isPending,
        // ____________

        // filtration 
        // ____________
        setExpensesDay,
        ExpensesDay,
        setSearchitem,
        searchItem,
        status,
        setStatus
    }
}