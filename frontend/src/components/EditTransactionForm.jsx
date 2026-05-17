import { useState } from "react";

const EditTransactionForm = ({ transaction, onSave, onCancel }) => {
  const [amount, setAmount] = useState(transaction.amount);
  const [category, setCategory] = useState(transaction.category);

  const submitHandler = (e) => {
    e.preventDefault();
    onSave({
      ...transaction,
      amount,
      category,
    });
  };

  return (
    <form onSubmit={submitHandler} className="bg-white p-4 rounded shadow mb-4">
      <h3 className="font-semibold mb-3">Edit Transaction</h3>

      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <div className="flex gap-2">
        <button className="bg-black text-white px-4 py-2">Save</button>

        <button type="button" onClick={onCancel} className="border px-4 py-2">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditTransactionForm;
