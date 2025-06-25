import express from 'express'
import { registerUser } from '../controllers/userController.js'
import { loginUser } from '../controllers/authController.js'
import { hashPassword } from '../middlewares/hashedPassword.js'

const router = express.Router()

router.post('/signup', hashPassword, registerUser)

router.post('/signin', loginUser)

export default router
