import express from 'express'
import {
  createCategory,
  getCategories,
  updateCategories,
  removeCategory,
} from '../controllers/categoriesController.js'
import { authenticateUser } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/', authenticateUser, createCategory)
router.get('/', authenticateUser, getCategories)
router.put('/:id', authenticateUser, updateCategories)
router.delete('/:id', authenticateUser, removeCategory)

export default router
