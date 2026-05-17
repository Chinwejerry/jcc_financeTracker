import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const IncomeExpenseChart = ({ transactions }) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  if (income === 0 && expense === 0) {
    return (
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold mb-3">Income vs Expense</h3>
        <p className="text-gray-500 text-sm">
          No data yet. Add a transaction to see the chart.
        </p>
      </div>
    );
  }

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: ["#805fcf", "#c73840"],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h3 className="font-semibold mb-3">Income vs Expense</h3>

      {/* 👇 THIS DIV IS THE FIX */}
      <div className="h-64">
        <Pie data={data} options={options} />
      </div>

      <p className="text-sm text-gray-600 mt-2">
        Income: ${income} | Expense: ${expense}
      </p>
    </div>
  );
};

export default IncomeExpenseChart;
