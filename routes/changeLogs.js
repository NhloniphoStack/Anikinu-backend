import express from 'express'
import { addLog, getChangeLogs, editLog, getLog, deleteLog } from '../controller/changeLogController.js'
import { requireAuth } from '../middleware/requireAuth.js'
export const changeLogsRouter = express.Router()

changeLogsRouter.get('', getChangeLogs)

changeLogsRouter.post('', requireAuth, addLog)

changeLogsRouter.patch('/:id', requireAuth, editLog)

changeLogsRouter.get('/:id', getLog)

changeLogsRouter.delete('/:id', requireAuth, deleteLog)

