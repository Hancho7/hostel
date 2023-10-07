import express from 'express'
import { hostelDelete } from '../../controllers/hostel/hostelDelete.js'
const router = express.Router()

router.delete('/delete-hostel', hostelDelete)

export default router;