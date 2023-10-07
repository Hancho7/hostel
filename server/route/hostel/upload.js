import multer from "multer";
import express from 'express'
import {upload} from '../../controllers/hostel/upload.js'

const router = express.Router()
const mult = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 4,
  },
  // Other options and file filters here
  
});

router.post("/upload-hostel", mult.array("files", 4),upload );

export default router