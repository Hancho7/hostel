import  express  from 'express';
import { signUp } from '../../controllers/log/signUp.js'

const router = express.Router();

router.post('/sign-Up', signUp)

export default router;