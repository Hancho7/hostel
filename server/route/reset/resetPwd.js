import  express  from "express";
import { reset } from "../../controllers/reset/resetPwd.js";

const router = express.Router()

router.post('/forgotten-password', reset)

export default router;