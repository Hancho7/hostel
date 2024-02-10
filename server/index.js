const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");

const adminRoute = require("./route/adminLogs");
const { AdminRoomsRouter } = require("./route/rooms");
const userRoute = require("./route/userLogs");
const deleteExpiredUsers = require("./utils/backgroundJob");
const { adminHostel, studentHostel } = require("./route/hostel");

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
app.use("/admin", adminRoute);

//ADMIN HOSTEL ROUTE
app.use("/admin/hostel", adminHostel);

// ADMIN HOSTEL ROOM ROUTE
app.use("/admin/hostel/room", AdminRoomsRouter);

//STUDENT HOSTEL ROUTE
app.use("/student-hostel", studentHostel);

//USER ROUTES
app.use("/student-logs", userRoute);

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
