import * as svc from "../services/transactionsService.js";

export const createTransaction = async (req, res) => {
  console.log(req)
  try {
    const userId = req.user.userId;
    console.log(userId)
    const tx = await svc.createTransaction(userId, req.body);
    return res.status(201).json(tx);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

export const listTransactions = async (req, res) => {
  try {
    const userId = req.user.userId;
    const result = await svc.listTransactions(userId, req.query);
    return res.json(result);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

export const getTransaction = async (req, res) => {
  try {
    const userId = req.user.userId;
    const tx = await svc.getTransaction(userId, req.params.id);
    return res.json(tx);
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const userId = req.user.userId;
    const tx = await svc.updateTransaction(userId, req.params.id, req.body);
    return res.json(tx);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const userId = req.user.userId;
    await svc.deleteTransaction(userId, req.params.id);
    return res.status(204).send();
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};
