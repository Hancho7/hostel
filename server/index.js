const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");

const adminRoute = require("./route/adminLogs")
const userRoute = require("./route/userLogs")
const deleteExpiredUsers = require("./utils/backgroundJob")
const {adminHostel, studentHostel} = require("./route/hostel")

// constING DATA
// const hostelRoute = require( './route/hostel/hostel.js');
// const signUpRoute = require("./route/log/signUp.js");
// const signInRoute = require("./route/log/logIn.js");
// const verifyEmailRoute = require( './route/log/verifyEmail.js');

// HOSTEL MANAGEMENT
// const uploadRoute = require( './route/hostel/upload.js');
// const displayHostelRoute = require( './route/hostel/hostel.js');
// const deleteHostelRoute = require( './route/hostel/delete.js');

// // ADMIN HOSTEL ROUTE
// const adminDisplayHostelRoute = require( "./route/hostel/adminHostels.js")

// //ROOM MANAGEMENT
// const roomRoute = require( './route/hostelRooms/createHostelRoomRoute.js')
// const bookingRoute = require( './route/hostelRooms/booking.js')

// // RESET PASSWORD
// const emailForResetRoute = require( './route/reset/resetPwd.js');
// const newPasswordRoute = require( './route/reset/newPassword.js');

// //COMMENTS
// const createCommentRoute = require( './route/comments/createComments.js')
// const readCommentRoute = require( './route/comments/getComments.js')

// CONFIGURING THE ENVIRONMENT VARIABLES AND EXPRESS APPLICATION
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// setInterval(deleteExpiredUsers, 60 * 1000);


// ADMIN ROUTE
app.use("/admin", adminRoute)

//ADMIN HOSTEL ROUTE
app.use("/admin/hostel", adminHostel)

//STUDENT HOSTEL ROUTE
app.use("/student-hostel", studentHostel)

//USER ROUTES
app.use("/student-logs",userRoute)

// ROUTES
// app.post("/sign-Up", signUpRoute);
// app.post("/log-In", signInRoute);
// app.get('/verify/:id/:token', verifyEmailRoute);

// // RESET ROUTE
// app.post('/forgotten-password', emailForResetRoute);
// app.post('/forgotten-password/id/verify/token', newPasswordRoute);

// // ROUTES HOSTEL
// app.use('/hostel', hostelRoute);
// app.get('/admin/add-rooms/:userID', adminDisplayHostelRoute);
// app.post('/upload-hostel', uploadRoute);
// app.delete('/delete-hostel', deleteHostelRoute);

// // HOSTEL ROOMS ROUTE
// app.use("/admin", roomRoute)
// app.use('/hostelRoom', bookingRoute)

// //COMMENTS
// app.post('/create-comments', createCommentRoute)
// app.get('/read-comments', readCommentRoute)



// MONGOOSE SETUP
const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`app listening at port ${PORT}`));
  })
  .catch((err) => console.log(`${err} could not connect`));
