import * as yup from "yup";

export const validationSchema = yup.object({
  nameOfHostel: yup.string().required("You must choose the hostel"),
  unitName: yup.string().required("Unit name is required"),
  roomType: yup.string().required("Room type is required"),
  numberInRoom: yup.string().required("Number in room is required"),
  gender: yup.string().required("You must choose a gender"),
});
