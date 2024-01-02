import express from 'express'
import { homeGetHostels, getHostel } from '../../controllers/hostel/hostel.js'

const router = express.Router()

router.get('/home', homeGetHostels)
router.get('/:hostelID', getHostel )

export default router;