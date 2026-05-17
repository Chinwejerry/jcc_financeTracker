import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const MonthlyChart = ({ transactions }) => {
  const monthlyData = {};

  transactions.forEach((t) => {
    const month = new Date(t.date).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    if (!monthlyData[month]) {
      monthlyData[month] = { income: 0, expense: 0 };
    }

    monthlyData[month][t.type] += t.amount;
  });

  const labels = Object.keys(monthlyData);

  const incomeData = labels.map((m) => monthlyData[m].income);
  const expenseData = labels.map((m) => monthlyData[m].expense);

  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "#16a34a",
      },
      {
        label: "Expense",
        data: expenseData,
        backgroundColor: "#dc2626",
      },
    ],
  };

  if (!labels.length) {
    return (
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold mb-3">Monthly Overview</h3>
        <p className="text-sm text-gray-500">No transactions yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h3 className="font-semibold mb-3">Monthly Overview</h3>

      <div className="h-72">
        <Bar data={data} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default MonthlyChart;
