import { apiClient } from "./api_client";

export const getListOfTransactions = async () => {
    const response = await apiClient.get('/transaction/get-transactions');
    return response.data;
};

export const addIncome = async (income) => {
    const response = await apiClient.put("/transaction/add-income", income);
    return response.data;
};

export const addTransaction = async (transaction) => {
    const response = await apiClient.put("/transaction/add-transaction", transaction);
    return response.data;
};

export const getCategories = async () => {
    const response = await apiClient.get("/transaction/get-categories");
    return response.data;
};
