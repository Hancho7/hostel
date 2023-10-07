import express from 'express'
import { getHostels } from '../../controllers/hostel/hostel.js'

const router = express.Router()

router.get('/hostel', getHostels)

export default router;