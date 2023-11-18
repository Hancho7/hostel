import express from 'express'
import { adminGetHostels } from '../../controllers/hostel/hostel.js'

const router = express.Router()

router.get('/admin/add-rooms/:userID', adminGetHostels);

export default router;