import {
  createCategoryService,
  getCategoriesService,
  updateCategoryService,
  removeCategoryService,
} from "../services/categoriesService.js";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.userId;
    const category = await createCategoryService(name, userId);
    return res.status(201).json(category);
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({ message: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const userId = req.user.userId;
    const categories = await getCategoriesService(userId);
    return res.json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar categoria" });
  }
};

export const updateCategories = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.userId;
    const { id } = req.params;

    await updateCategoryService(id, userId, name);
    return res
      .status(200)
      .json({ message: "Categoria atualizada com sucesso!" });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

export const removeCategory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    await removeCategoryService(id, userId);
    return res.status(200).json({ message: "Categoria excluída com sucesso!" });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};
