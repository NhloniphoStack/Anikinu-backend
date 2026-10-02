

import express from 'express'
import { getUpcoming } from '../controller/upComingController.js'

export const upcomingRouter = express.Router()

upcomingRouter.get("/", getUpcoming)