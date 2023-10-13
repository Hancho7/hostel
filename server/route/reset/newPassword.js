import express from 'express'
import {  newPassword} from '../../controllers/reset/newPassword.js';

const router = express.Router()

router.post('/forgotten-password/:id/verify/:token', newPassword);

export default router