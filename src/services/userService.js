import db from "../models/index.js";
import jwt from "jsonwebtoken";
import { sendConfirmationEmail } from "../utils/emailService.js";
import ApiError from "../utils/ApiError.js";

const { User } = db;

export const createUser = async (body) => {
  const { name, email, password } = body;

  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    throw new ApiError("Usuário já cadastrado!", 409); // 409 = Conflict
  }

  const user = await User.create({
    name,
    email,
    password,
    isEmailConfirmed: false,
  });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const confirmationUrl = `${process.env.BASE_URL}/confirm-email?token=${token}`;

  try {
    await sendConfirmationEmail(email, confirmationUrl);
  } catch (emailError) {
    console.error("Erro ao enviar e-mail:", emailError);
    throw new ApiError(
      "Usuário cadastrado, mas não foi possível enviar o e-mail de confirmação.",
      500
    );
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

export const confirmEmailService = async (token) => {
  if (!token) {
    throw { status: 400, message: "Token não fornecido." };
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decode.userId);

    if (!user) {
      throw { status: 404, message: "Usuário não encontrado." };
    }

    user.isEmailConfirmed = true;
    await user.save();

    return { message: "E-mail confirmado com sucesso!" };
  } catch (err) {
    throw { status: 400, message: "Token inválido ou expirado." };
  }
};
