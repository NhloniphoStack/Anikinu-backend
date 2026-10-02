import express from 'express'
import { getUser, getUserList, addAnime } from '../controller/meController.js'
import { requireAuth } from '../middleware/requireAuth.js'

export const meRouter = express.Router()

meRouter.get('', requireAuth, getUser)

meRouter.get('/list', requireAuth, getUserList)

meRouter.post('/list', requireAuth, addAnime)