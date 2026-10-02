import express from 'express'
import { getTrendingAnime } from '../controller/trendingController.js'
export const trendingRouter = express.Router()

trendingRouter.get('/', getTrendingAnime)