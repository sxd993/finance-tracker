export const formatMoney = (amount) => {
    return new Intl.NumberFormat('ru-RU').format(amount);
};
