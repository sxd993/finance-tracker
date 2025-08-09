import { useQuery } from "@tanstack/react-query"
import { getExpensesByLogin } from "../api/dashboardApi"

export const useExpenses = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['expenses'],
        queryFn: getExpensesByLogin
    })
    return { expenses: data?.expenses || [], isLoading, error };
}