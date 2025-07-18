import db from "../models/index.js";
import jwt from "jsonwebtoken";

const { User } = db;

export const confirmEmailService = async (token) => {
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    const error = new Error("Token inválido ou expirado.");
    error.status = 400;
    throw error;
  }

  const user = await User.findByPk(decoded.userId);

  if (!user) {
    const error = new Error("Usuário não encontrado.");
    error.status = 404;
    throw error;
  }

  user.isEmailConfirmed = true;
  await user.save();

  return "E-mail confirmado com sucesso!";
};
