import express from 'express'
import { getAllAnime, getAnime, getRandom} from '../controller/animeController.js'

export const animeRouter = express.Router()

animeRouter.get('/', getAllAnime)

animeRouter.get('/random', getRandom)

animeRouter.get('/:animeid', getAnime)

