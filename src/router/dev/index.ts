import * as express from 'express'
import * as devController from '../../controllers/dev'

const router = express.Router({ caseSensitive: true, strict: true })
router.post('/dev', devController.migrate)

export default router
