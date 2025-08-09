import db from "../models/index.js";
const { Transaction, Account, Category, Transaction_type } = db;

export async function createTransaction(userId, data) {
  const { amount, description, categoryId, accountId, typeId, createdAt } =
    data;

    console.log('caiu aqui?')

  if (!amount || Number(amount) <= 0) {
    throw new Error("amount inválido");
  }

  // valida FKs (opcional, mas recomendado)
  if (accountId) {
    const acc = await Account.findOne({ where: { id: accountId, userId } });
    if (!acc) throw new Error("accountId inválido");
  }
  if (categoryId) {
    const cat = await Category.findOne({ where: { id: categoryId, userId } });
    if (!cat) throw new Error("categoryId inválido");
  }
  if (typeId) {
    const t = await Transaction_type.findByPk(typeId);
    if (!t) throw new Error("typeId inválido");
  }

  return Transaction.create({
    userId,
    amount,
    description,
    categoryId: categoryId ?? null,
    accountId: accountId ?? null,
    typeId: typeId ?? null,
    createdAt: createdAt ?? undefined,
  });
}

export async function listTransactions(
  userId,
  { page = 1, limit = 20, ...filters } = {}
) {
  const where = { userId };

  if (filters.typeId) where.typeId = filters.typeId;
  if (filters.accountId) where.accountId = filters.accountId;
  if (filters.categoryId) where.categoryId = filters.categoryId;
  if (filters.from || filters.to) {
    where.createdAt = {};
    if (filters.from) where.createdAt["$gte"] = new Date(filters.from);
    if (filters.to) where.createdAt["$lte"] = new Date(filters.to);
  }

  const offset = (page - 1) * limit;
  const { rows, count } = await Transaction.findAndCountAll({
    where,
    order: [
      ["createdAt", "DESC"],
      ["id", "DESC"],
    ],
    limit,
    offset,
  });
  return {
    items: rows,
    total: count,
    page: Number(page),
    limit: Number(limit),
  };
}

export async function getTransaction(userId, id) {
  const tx = await Transaction.findOne({ where: { id, userId } });
  if (!tx) throw new Error("Transação não encontrada");
  return tx;
}

export async function updateTransaction(userId, id, data) {
  const tx = await getTransaction(userId, id);

  // validações básicas (mesmas do create quando campo vier)
  if (data.amount !== undefined && Number(data.amount) <= 0) {
    throw new Error("amount inválido");
  }

  // valida FKs se vierem
  const { accountId, categoryId, typeId } = data;
  if (accountId) {
    const acc = await db.Account.findOne({ where: { id: accountId, userId } });
    if (!acc) throw new Error("accountId inválido");
  }
  if (categoryId) {
    const cat = await db.Category.findOne({
      where: { id: categoryId, userId },
    });
    if (!cat) throw new Error("categoryId inválido");
  }
  if (typeId) {
    const t = await db.Transaction_type.findByPk(typeId);
    if (!t) throw new Error("typeId inválido");
  }

  await tx.update({
    amount: data.amount ?? tx.amount,
    description: data.description ?? tx.description,
    accountId: data.accountId ?? tx.accountId,
    categoryId: data.categoryId ?? tx.categoryId,
    typeId: data.typeId ?? tx.typeId,
    createdAt: data.createdAt ?? tx.createdAt,
  });
  return tx;
}

export async function deleteTransaction(userId, id) {
  const tx = await getTransaction(userId, id);
  await tx.destroy();
  return { success: true };
}
