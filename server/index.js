import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { S3Client } from '@aws-sdk/client-s3'; // Updated import

// IMPORTING DATA
import hostelRoute from './route/hostel/hostel.js';
import signUpRoute from './route/log/signUp.js';
import signInRoute from './route/log/logIn.js';
import verifyEmailRoute from './route/log/verifyEmail.js';

// HOSTEL MANAGEMENT
import uploadRoute from './route/hostel/upload.js';
import displayHostelRoute from './route/hostel/hostel.js';
import deleteHostelRoute from './route/hostel/delete.js';

//ROOM MANAGEMENT
import roomUploadRoute from './route/hostelRooms/createHostelRoomRoute.js'

// RESET PASSWORD
import emailForResetRoute from './route/reset/resetPwd.js';
import newPasswordRoute from './route/reset/newPassword.js';

//COMMENTS
import createCommentRoute from './route/comments/createComments.js'
import readCommentRoute from './route/comments/getComments.js'

// CONFIGURING THE ENVIRONMENT VARIABLES AND EXPRESS APPLICATION
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// ROUTES
app.post('/sign-Up', signUpRoute);
app.post('/log-In', signInRoute);
app.get('/verify/:id/:token', verifyEmailRoute);

// RESET ROUTE
app.post('/forgotten-password', emailForResetRoute);
app.post('/forgotten-password/:id/verify/:token', newPasswordRoute);

// ROUTES HOSTEL
app.get('/hostel', hostelRoute);
app.post('/upload-hostel', uploadRoute);
// app.get('/hostel-images', displayHostelRoute);
app.delete('/delete-hostel', deleteHostelRoute);

// HOSTEL ROOMS ROUTE
app.post("/add-Rooms", roomUploadRoute)

//COMMENTS
app.post('/create-comments', createCommentRoute)
app.get('/read-comments', readCommentRoute)

// AMAZON WEB SERVICE
export const s3 = new S3Client({
    region: process.env.BUCKET_REGION, // Use BUCKET_REGION environment variable
    credentials: {
      accessKeyId: process.env.ACCESS_KEY, // Use ACCESS_KEY environment variable
      secretAccessKey: process.env.SECRET_ACCESS_KEY, // Use SECRET_ACCESS_KEY environment variable
    },
  });
  

// MONGOOSE SETUP
const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`app listening at port ${PORT}`));
    // Hostel.insertMany(hostel)
  })
  .catch((err) => console.log(`${err} could not connect`));
