import express from 'express'
import { login, logout, signup } from '../controller/authController.js'
export const authRouter = express.Router()
import { requireAuth } from '../middleware/requireAuth.js'


authRouter.post('/login', login)

authRouter.post('/signup', signup)

authRouter.post('/logout', requireAuth, logout)