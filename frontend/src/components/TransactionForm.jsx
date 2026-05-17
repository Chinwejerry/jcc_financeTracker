import { useState } from "react";
import { apiRequest } from "../services/api";

const TransactionForm = ({ onAdd }) => {
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTransaction = await apiRequest("/transactions", "POST", {
      type,
      amount: Number(amount),
      category,
      date,
    });

    onAdd(newTransaction);

    setAmount("");
    setCategory("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 mb-6 rounded shadow">
      <h3 className="font-semibold mb-3">Add Transaction</h3>

      <select
        className="w-full mb-2 border p-2"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input
        className="w-full mb-2 border p-2"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />

      <input
        type="number"
        className="w-full mb-2 border p-2"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <input
        type="date"
        className="w-full mb-3 border p-2"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <button className="w-full bg-linear-to-r from-slate-600 via-sky-700 to-indigo-800 shadow text-white p-2">
        Add
      </button>
    </form>
  );
};

export default TransactionForm;
