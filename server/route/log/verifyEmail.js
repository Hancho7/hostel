import express from 'express'
import { verifyEmail } from "../../controllers/log/verifyEmail.js";

const router = express.Router()

router.get('/verify/:id/:token', verifyEmail);

export default router