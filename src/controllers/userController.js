import { createUser } from "../services/userService.js";
import ApiError from "../utils/ApiError.js";

export const registerUser = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    const status = error instanceof ApiError ? error.statusCode : 500;
    res.status(status).json({ error: error.message });
  }
};
