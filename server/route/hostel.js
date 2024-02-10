const upload = require("../utils/multer");
const { pushHostel } = require("../controllers/hostel/push-hostel");
const {getNamesOfHostelForthisAdmin,getSpecificHostelDetails,retrieveHostelsForHomePage} = require("../controllers/hostel/retrieve")
const express = require("express");

const adminRouter = express.Router();
const studentRouter = express.Router();

adminRouter.post("/add-new-hostel", upload.array("images"), pushHostel);
adminRouter.get("/get-admin-hostel-names/:secondID", getNamesOfHostelForthisAdmin);


//STUDENT ROUTES
studentRouter.post("/get-specific-hostel/:hostelID", getSpecificHostelDetails);
studentRouter.get("/get-hostels-for-homepage", retrieveHostelsForHomePage);

module.exports={
    adminHostel: adminRouter,
    studentHostel : studentRouter
}
