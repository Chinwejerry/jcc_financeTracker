import { apiRequest } from "../services/api";

const TransactionList = ({ transactions, onDelete }) => {
  const handleDelete = async (id) => {
    await apiRequest(`/transactions/${id}`, "DELETE");
    onDelete(id);
  };

  return (
    <div className=" text-slate-100">
      {transactions.map((t) => (
        <div
          key={t._id}
          className="flex justify-between items-center border p-2 mb-2"
        >
          <div>
            <p className="font-medium">{t.category}</p>
            <p className="text-sm text-slate-300">
              {t.type} — ${t.amount}
            </p>
          </div>

          <button
            onClick={() => handleDelete(t._id)}
            className="text-red-500 text-sm"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
