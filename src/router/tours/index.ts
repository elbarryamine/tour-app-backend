import * as express from 'express'
import * as toursController from '../../controllers/tours'

const router = express.Router({ caseSensitive: true, strict: true })
router.post('/tours', toursController.createTour)

export default router
