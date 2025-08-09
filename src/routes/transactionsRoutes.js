import { Router } from "express";
import {
  createTransaction,
  listTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionsController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", authenticateUser, createTransaction);
router.get("/", listTransactions);
router.get("/:id", getTransaction);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

export default router;
