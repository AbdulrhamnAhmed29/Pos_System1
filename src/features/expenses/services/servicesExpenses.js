import BaseApi from "../../../api/baseApi"
import qs from 'qs';


export const ExpensesServises = {
    addExpenses: async (payload) => {
        const { data } = await BaseApi.create("expenses", payload);
        return data;
    },

    updateExpenses: async (id, data) => {
        const res = await BaseApi.update("expenses", id, data);
        return res.data;
    },

    removeExpenses: async (id) => {
        const { data } = await BaseApi.remove("expenses", id);
        return data
    },
    getExpenses: async (ExpensesDay, status, searchItem) => {
        const filters = { $and: [] };
        // 1. search filter 
        if (searchItem.trim() !== "") {
            filters.$and.push({
                $or: [
                    { Person: { $contains: searchItem } },
                ]
            });
        }

        // 2. status filter 
        if (status && status !== "الكل") {
            filters.$and.push({ category: { $eq: status } });
        }

        if (ExpensesDay) {

            filters.$and.push({
                createdAt: {
                    $gte: `${ExpensesDay}T00:00:00.000+03:00`,
                    $lte: `${ExpensesDay}T23:59:59.999+03:00`
                }
            });
        }
        const query = qs.stringify({
            filters: filters.$and.length > 0 ? filters : {},
            populate: '*',
            sort: ['createdAt:desc'],
            pagination: {
                limit: 2000,
            },
        }, { encodeValuesOnly: true });
        const { data } = await BaseApi.getAll(`expenses?${query}`);

        return data
    },
    getExpensesToReports: async ( startDay,endDay ) => {
        const filters = { $and: [] };
        
        if (startDay&&endDay) {
            filters.$and.push({
                createdAt: {
                    $gte: `${startDay}T00:00:00.000+03:00`,
                    $lte: `${endDay}T23:59:59.999+03:00`
                }
            });
        }
        const query = qs.stringify({
            filters: filters.$and.length > 0 ? filters : {},
            populate: '*',
            sort: ['createdAt:desc'],
            pagination: {
                limit: 2000,
            },
        }, { encodeValuesOnly: true });
        const { data } = await BaseApi.getAll(`expenses?${query}`);

        return data
    },

    getById: async (id, query = "") => {
        const { data } = await BaseApi.getById("expenses", id, query);
        return data
    }
}