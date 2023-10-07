import {createComments} from '../../controllers/comments/createComments.js'
import express from 'express'

const router = express.Router()
router.post('/create-comments', createComments)
export default router;