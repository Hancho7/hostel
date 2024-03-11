const {
  addNewStaff,
  getAllStaffs,
  deleteStaff,
} = require("../controllers/staffs/staffs");
const express = require("express");

const router = express.Router();

router.post("/add-new-staff", addNewStaff);
router.get("/get-all-staffs/:adminID", getAllStaffs);
router.post("/delete-staff/:staffID", deleteStaff);

module.exports = router;
