import { Modal } from "../../components/Modal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addIncome, addTransaction, getCategories } from "../../api/transactionApi";
import { useForm } from "react-hook-form";
import { useCallback } from "react";

export const AddTransaction = ({ handleClose }) => {
    const { register, handleSubmit, watch, reset, setValue, formState: { errors, isValid } } = useForm({
        defaultValues: {
            amount: "",
            category_id: "",
            description: "Пополнение дохода",
            type: "income",
        },
        mode: "onChange"
    });
    const type = watch("type");
    const queryClient = useQueryClient();

    // Получаем категории с backend
    const { data: categories, isLoading: isCategoriesLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    const transactionMutation = useMutation({
        mutationFn: (data) => addTransaction(data),
        onSuccess: () => {
            queryClient.invalidateQueries(["transactions"]);
            handleClose();
            reset();
        },
        onError: (error) => {
            alert("Ошибка при добавлении транзакции");
            console.log(error);
        },
    });

    const incomeMutation = useMutation({
        mutationFn: (data) => addIncome(data),
        onSuccess: () => {
            queryClient.invalidateQueries(["transactions"]);
            handleClose();
            reset();
        },
        onError: (error) => {
            alert("Ошибка при добавлении дохода");
            console.log(error);
        },
    });

    // При смене типа транзакции сбрасываем/устанавливаем значения по умолчанию
    const handleTypeChange = useCallback((e) => {
        const value = e.target.value;
        setValue("type", value);
        if (value === "income") {
            setValue("category_id", "8");
            setValue("description", "Пополнение дохода");
        } else {
            setValue("category_id", "");
            setValue("description", "");
        }
    }, (setValue));

    const onSubmit = (data) => {
        if (data.type === "income") {
            incomeMutation.mutate({ amount: data.amount });
        } else {
            transactionMutation.mutate({
                ...data,
                date: new Date().toISOString().slice(0, 10),
                category_id: Number(data.category_id),
            });
        }
    };

    return (
        <Modal onClose={handleClose}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 p-4 bg-white rounded-xl min-w-[300px] max-w-[90vw] transition-all"
            >
                <h2 className="text-xl font-bold text-center mb-2">Добавить транзакцию</h2>
                <label className="flex flex-col gap-1">
                    <span className="font-medium">Тип</span>
                    <select
                        {...register("type")}
                        onChange={handleTypeChange}
                        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    >
                        <option value="income">Доход</option>
                        <option value="expense">Расход</option>
                    </select>
                </label>
                {/* Сумма всегда отображается */}
                <label className="flex flex-col gap-1">
                    <span className="font-medium">Сумма</span>
                    <input
                        type="number"
                        placeholder="Введите сумму"
                        {...register("amount", { required: "Введите сумму", min: { value: 1, message: "Минимум 1" } })}
                        className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${errors.amount ? "border-red-400" : "focus:ring-orange-400"}`}
                    />
                    {errors.amount && <span className="text-red-500 text-xs">{errors.amount.message}</span>}
                </label>
                {type === "expense" && (
                    <>
                        <label className="flex flex-col gap-1">
                            <span className="font-medium">Категория</span>
                            <select
                                {...register("category_id", { required: "Выберите категорию" })}
                                disabled={isCategoriesLoading}
                                className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${errors.category_id ? "border-red-400" : "focus:ring-orange-400"}`}
                            >
                                <option value="">Выберите категорию</option>
                                {categories && categories.filter(cat => cat.id !== 8).map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            {errors.category_id && <span className="text-red-500 text-xs">{errors.category_id.message}</span>}
                        </label>
                        <label className="flex flex-col gap-1">
                            <span className="font-medium">Описание</span>
                            <input
                                type="text"
                                placeholder="Описание"
                                {...register("description", { required: "Введите описание" })}
                                className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${errors.description ? "border-red-400" : "focus:ring-orange-400"}`}
                            />
                            {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
                        </label>
                    </>
                )}
                <button
                    type="submit"
                    disabled={!isValid || incomeMutation.isLoading || transactionMutation.isLoading}
                    className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 rounded-md transition-colors disabled:opacity-60"
                >
                    {incomeMutation.isLoading || transactionMutation.isLoading ? "Добавление..." : "Добавить"}
                </button>
            </form>
        </Modal>
    );
};  