import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { getCategoryColor } from '../utils/chartColors';

export const ExpensesChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-gray-500 text-lg font-medium">
        Нет данных для отображения
      </div>
    );
  }

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="name"
            cx="50%"
            cy="45%"
            outerRadius="65%"
            fill="#8884d8"
            animationDuration={800}
            stroke="none"
            label={false}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${entry.id || index}`} fill={getCategoryColor(entry.id)} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${value} ₽`, 'Сумма']}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              fontSize: '14px',
              padding: '8px 12px',
            }}
            wrapperStyle={{
              outline: 'none',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Легенда */}
      <div className="flex flex-wrap justify-center gap-4">
        {data.map((entry, index) => (
          <div key={`legend-${entry.id || index}`} className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-sm"
              style={{ backgroundColor: getCategoryColor(entry.id) }}
            />
            <span className="text-sm text-gray-700">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};