import { loginService } from "../services/authService.js";

export const loginUser = async (req, res) => {
  try {
    const result = await loginService(req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res
      .status(error.status || 500)
      .json({ message: error.message || "Erro ao fazer login" });
  }
};
