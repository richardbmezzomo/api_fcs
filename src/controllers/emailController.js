// controllers/confirmEmailController.js
import { confirmEmailService } from "../services/confirmEmailService.js";

export const confirmEmail = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "Token não fornecido." });
  }

  try {
    const result = await confirmEmailService(token);
    return res.status(200).json({ message: result });
  } catch (error) {
    return res.status(error.status || 400).json({ message: error.message });
  }
};
