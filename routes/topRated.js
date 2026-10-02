import express from 'express'
import { getTopRatedAnime } from '../controller/topRatedController.js'
export const topRatedRouter = express.Router()

topRatedRouter.get('/', getTopRatedAnime)