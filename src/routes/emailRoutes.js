import { Router } from 'express'
import { confirmEmail } from '../controllers/emailController.js'

const router = Router()

router.get('/confirm-email', confirmEmail)

export default router
