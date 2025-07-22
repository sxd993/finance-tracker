import { apiClient } from "./api_client";

export const addIncome = async (income) => {
  const response = await apiClient.put("/dashboard/add-income", income);
  return response.data;
};