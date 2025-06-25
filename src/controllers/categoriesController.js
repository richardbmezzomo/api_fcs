import db from "../models/index.js";

const { Category } = db;

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(req.user);
    const userId = req.user.userId;

    if (!name) {
      return res
        .status(400)
        .json({ message: "O nome da categoria é obrigatório." });
    }

    const existingCategory = await Category.findOne({
      where: { name, userId },
    });

    if (existingCategory) {
      return res
        .status(409)
        .json({ message: "Esta categoria já existe para o usuário." });
    }

    const newCategory = await Category.create({ name, userId });

    return res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao criar a categoria...." });
  }
};

export const getCategories = async (req, res) => {
  try {
    const userId = req.user.userId;

    const categories = await Category.findAll({
      where: { userId },
      attributes: ["id", "name"],
    });

    return res.json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ messagem: "Erro ao buscar categoria" });
  }
};

export const updateCategories = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.userId;
    const { id } = req.params;

    const category = await Category.findOne({ where: { id, userId } });

    console.log("Resultado da busca:", category);

    if (!category) {
      return res.status(404).json({ message: "Categoria não encontrada." });
    }

    category.name = name;
    await category.save();

    return res
      .status(200)
      .json({ message: "Categoria atualizada com sucesso!" });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao atualizar categoria!" });
  }
};

export const removeCategory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const category = await Category.findOne({ where: { id, userId } });

    if (!category) {
      return res.status(404).json({ message: "Categoria não encontrada." });
    }

    await category.destroy();

    return res
      .status(200)
      .json({ messagem: "Categoria excluída com sucesso!" });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao excluir categoria!" });
  }
};
