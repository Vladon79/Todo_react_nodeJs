import { Router } from 'express'
import TaskController from '../controllers/TaskController.js'

const router = new Router()

router.post('/task', TaskController.create)
router.post('/task/file', TaskController.createFile)
router.get('/task', TaskController.getAll)
router.put('/task', TaskController.update)
router.delete('/task/:id', TaskController.delete)
router.get('/task/file/download', TaskController.downloadFile)

export default router
