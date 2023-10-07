import  express  from "express";
import { reset } from "../../controllers/reset/resetPwd.js";

const router = express.Router()

router.post('/resetPassword', reset)

export default router;