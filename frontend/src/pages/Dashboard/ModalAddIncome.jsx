export const ModalAddIncome = ({ incomeValue, handleIncomeChange, handleSaveIncome, isLoading, isError }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 animate-fade-in !p-10">
      <h1 className="text-2xl font-semibold mb-2">Изменить доход</h1>
      <input
        type="number"
        value={incomeValue}
        onChange={handleIncomeChange}
        min={0}
        className="border border-gray-300 rounded px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all w-48 text-center"
        disabled={isLoading}
      />
      <button
        onClick={handleSaveIncome}
        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded transition-all shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed"
        disabled={isLoading || isNaN(Number(incomeValue)) || Number(incomeValue) < 0}
      >
        {isLoading ? 'Сохраняем...' : 'Сохранить'}
      </button>
      {isError && (
        <div className="text-red-500 text-sm text-center">Ошибка при сохранении дохода. Попробуйте ещё раз.</div>
      )}
    </div>
  );
};