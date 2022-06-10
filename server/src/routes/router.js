import { Router } from 'express'
import TaskController from '../controllers/TaskController.js'

const router = new Router()

router.post('/task', TaskController.create)
router.get('/task', TaskController.getAll)
router.put('/task', TaskController.update)
router.delete('/task/:id', TaskController.delete)

export default router
