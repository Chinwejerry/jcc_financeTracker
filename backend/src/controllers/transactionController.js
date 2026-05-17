import Transaction from "../models/Transaction.js";

export const getTransactions = async (req, res) => {
  const transactions = await Transaction.find({
    user: req.user._id,
  }).sort({ date: -1 });

  res.status(200).json(transactions);
};

export const createTransaction = async (req, res) => {
  const { type, amount, category, date, note } = req.body;

  const transaction = await Transaction.create({
    user: req.user._id,
    type,
    amount,
    category,
    date,
    note,
  });

  res.status(201).json(transaction);
};

export const deleteTransaction = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    return res.status(404).json({ message: "Not found" });
  }

  if (transaction.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  await transaction.deleteOne();

  res.status(200).json({ message: "Transaction removed" });
};
