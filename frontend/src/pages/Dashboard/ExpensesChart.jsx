import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { getCategoryColor } from '../../utils/chartColors';

export const ExpensesChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500 text-lg font-medium">
        Нет данных для отображения
      </div>
    );
  }

  // Общая сумма трат
  const totalExpenses = data.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-2xl mx-auto py-8 md:py-12">
      <PieChart
        width={400}
        height={320}
        className="w-full h-auto max-w-[90vw] sm:max-w-[400px] sm:h-[320px]"
      >
        <Pie
          data={data}
          dataKey="total"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          stroke="#fff"
          strokeWidth={2}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${entry.id || index}`} fill={getCategoryColor(entry.id)} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value} ₽`} />
        <Legend />
      </PieChart>

    </div>
  );
};