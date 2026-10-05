import express from 'express'
import { getUser, getUserList, addAnime, getStats, editList, getItem, removeItem } from '../controller/meController.js'
import { requireAuth } from '../middleware/requireAuth.js'

export const meRouter = express.Router()

meRouter.get('', requireAuth, getUser)

meRouter.get('/list/:animeid', requireAuth, getItem)

meRouter.delete('/list/:animeid', requireAuth, removeItem)

meRouter.get('/list', requireAuth, getUserList)

meRouter.post('/list', requireAuth, addAnime)

meRouter.patch('/list', requireAuth, editList)

meRouter.get('/stats', getStats)