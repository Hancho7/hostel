import { getComments } from "../../controllers/comments/getComments.js";
import express from 'express'

const router = express.Router()

router.get('/read-comments', getComments)
export default router 