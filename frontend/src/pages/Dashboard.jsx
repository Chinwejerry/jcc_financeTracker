import { useEffect, useState, useMemo } from "react";
import { apiRequest } from "../services/api";
import { useAuth } from "../context/AuthContext";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import TransactionsTable from "../components/TransactionsTable";
import EditTransactionForm from "../components/EditTransactionForm";

import IncomeExpenseChart from "../components/IncomeExpenseChart";
import MonthlyChart from "../components/MonthlyChart";
import CategoryChart from "../components/CategoryChart";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const { logout } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [editingTx, setEditingTx] = useState(null);

  const months = [
    "all",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    apiRequest("/transactions").then(setTransactions).catch(console.error);
  }, []);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t._id !== id));
  };
  const filteredTransactions = useMemo(() => {
    if (selectedMonth === "all") return transactions;

    return transactions.filter((t) => {
      const monthIndex = new Date(t.date).getMonth();
      return months[monthIndex + 1] === selectedMonth;
    });
  }, [transactions, selectedMonth]);
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this transaction?")) return;

    await fetch(`${API_URL}/transactions/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTransactions((prev) => prev.filter((t) => t._id !== id));
  };
  const handleEdit = (tx) => {
    setEditingTx(tx);
  };

  const handleSaveEdit = async (updatedTx) => {
    const res = await fetch(`${API_URL}/transactions/${updatedTx._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedTx),
    });

    const data = await res.json();

    setTransactions((prev) => prev.map((t) => (t._id === data._id ? data : t)));

    setEditingTx(null);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-linear-to-r from-slate-600 via-sky-700 to-indigo-800 shadow">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold  text-slate-100">Dashboard</h2>
        <button onClick={logout} className="text-red-500 text-sm">
          Logout
        </button>
      </div>
      {editingTx && (
        <EditTransactionForm
          transaction={editingTx}
          onSave={handleSaveEdit}
          onCancel={() => setEditingTx(null)}
        />
      )}

      <TransactionsTable
        transactions={filteredTransactions}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <div className="mb-6 flex items-center gap-4  text-slate-100">
        <label className="font-medium  text-slate-100">Filter by Month:</label>

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border rounded px-3 py-2"
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month === "all" ? "All Months" : month}
            </option>
          ))}
        </select>
      </div>

      <MonthlyChart transactions={filteredTransactions} />
      <CategoryChart transactions={filteredTransactions} />
      <IncomeExpenseChart transactions={filteredTransactions} />

      <TransactionForm onAdd={addTransaction} />
      <TransactionList
        transactions={transactions}
        onDelete={deleteTransaction}
      />
    </div>
  );
};

export default Dashboard;
