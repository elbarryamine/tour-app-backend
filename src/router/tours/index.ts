import * as express from 'express'
import * as toursController from '../../controllers/tours'

const router = express.Router({ caseSensitive: true, strict: true })
router.post('/tour/image-upload', toursController.addTourImage)

export default router
