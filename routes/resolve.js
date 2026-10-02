import express from 'express'
import { resolveAnime } from '../controller/resolveController.js'

export const resolveRouter = express.Router()

resolveRouter.post("/", resolveAnime)