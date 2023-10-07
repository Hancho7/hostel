import express from 'express'
import { logIn } from '../../controllers/log/logIn.js'

const router = express.Router()

router.post('/log-In', logIn)

export default router