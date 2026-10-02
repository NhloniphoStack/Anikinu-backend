import express from 'express'
import { login, logout } from '../controller/authController.js'
export const authRouter = express.Router()
import { requireAuth } from '../middleware/requireAuth.js'


authRouter.post('/login', login)

authRouter.post('/logout', requireAuth, logout)