const TransactionsTable = ({ transactions, onDelete, onEdit }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Transactions</h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Date</th>
            <th className="text-left">Type</th>
            <th className="text-left">Category</th>
            <th className="text-right">Amount</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((t) => (
            <tr key={t._id} className="border-b">
              <td className="py-2">{new Date(t.date).toLocaleDateString()}</td>

              <td
                className={
                  t.type === "income" ? "text-green-600" : "text-red-600"
                }
              >
                {t.type}
              </td>

              <td>{t.category}</td>

              <td className="text-right">€{t.amount}</td>

              <td className="text-right space-x-2">
                <button
                  onClick={() => onEdit(t)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(t._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!transactions.length && (
        <p className="text-sm text-gray-500 mt-3">No transactions yet.</p>
      )}
    </div>
  );
};

export default TransactionsTable;
