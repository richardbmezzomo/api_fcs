import db from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const { User } = db;

export const loginService = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    const error = new Error("Credenciais inválidas!");
    error.status = 401;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    const error = new Error("Credenciais inválidas!");
    error.status = 401;
    throw error;
  }

  if (!user.isEmailConfirmed) {
    const error = new Error("Confirme seu e-mail para fazer login!");
    error.status = 403;
    throw error;
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  return {
    message: "Login bem-sucedido!",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};
