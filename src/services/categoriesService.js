import db from "../models/index.js";
const { Category } = db;

export const createCategoryService = async (name, userId) => {
  if (!name) {
    const error = new Error("O nome da categoria é obrigatório.");
    error.status = 400;
    throw error;
  }

  const existingCategory = await Category.findOne({ where: { name, userId } });

  if (existingCategory) {
    const error = new Error("Esta categoria já existe para o usuário.");
    error.status = 409;
    throw error;
  }

  const newCategory = await Category.create({ name, userId });
  return newCategory;
};

export const getCategoriesService = async (userId) => {
  return await Category.findAll({
    where: { userId },
    attributes: ["id", "name"],
  });
};

export const updateCategoryService = async (id, userId, name) => {
  const category = await Category.findOne({ where: { id, userId } });

  if (!category) {
    const error = new Error("Categoria não encontrada.");
    error.status = 404;
    throw error;
  }

  category.name = name;
  await category.save();
};

export const removeCategoryService = async (id, userId) => {
  const category = await Category.findOne({ where: { id, userId } });

  if (!category) {
    const error = new Error("Categoria não encontrada.");
    error.status = 404;
    throw error;
  }

  await category.destroy();
};
