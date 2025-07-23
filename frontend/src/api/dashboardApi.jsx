import { apiClient } from "./api_client";

export const getExpensesByLogin = async () => {
  const response = await apiClient.get("/dashboard/get-expenses");
  return response.data;
};
