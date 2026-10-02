import express from 'express'
import { getrecentlyCompleted } from '../controller/recentlyController.js'

export const recentlyRouter = express.Router()

recentlyRouter.get("", getrecentlyCompleted)