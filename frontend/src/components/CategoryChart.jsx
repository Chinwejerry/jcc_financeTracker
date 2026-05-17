import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryChart = ({ transactions }) => {
  const categoryTotals = {};

  transactions.forEach((t) => {
    if (t.type !== "expense") return;

    if (!categoryTotals[t.category]) {
      categoryTotals[t.category] = 0;
    }

    categoryTotals[t.category] += t.amount;
  });

  const labels = Object.keys(categoryTotals);
  const dataValues = Object.values(categoryTotals);

  if (!labels.length) {
    return (
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold mb-3">Expense Categories</h3>
        <p className="text-sm text-gray-500">No expense data available.</p>
      </div>
    );
  }

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: [
          "#ef4444",
          "#f97316",
          "#eab308",
          "#22c55e",
          "#3b82f6",
          "#8b5cf6",
        ],
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h3 className="font-semibold mb-3">Expense Categories</h3>

      <div className="h-72">
        <Pie data={data} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default CategoryChart;
