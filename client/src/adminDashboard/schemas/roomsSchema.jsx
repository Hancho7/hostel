import * as yup from "yup";

export const validationSchema = yup.object({
  nameOfHostel: yup.string().required("You must choose the hostel"),
  numberInRoom: yup
    .number()
    .required("Number of individuals per room must be given")
    .positive("Number must be positive")
    .integer("Number must be an integer")
    .moreThan(0, "Number must be greater than zero"),
  roomsAvailable: yup
    .number()
    .required("Number of rooms available must be given")
    .positive("Number must be positive")
    .integer("Number must be an integer")
    .moreThan(0, "Number must be greater than zero"),
  pricePerIndividual: yup
    .number()
    .required("Price per individual in a room must be given")
    .positive("Number must be positive")
    .moreThan(0, "Number must be greater than zero"),
  upgradeDescription: yup
    .string()
    .required("Upgrade description must be provided"),
  gender: yup.string().required("You must choose a gender"),
});
