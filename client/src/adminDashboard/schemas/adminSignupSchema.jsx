import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup
    .string()
    .matches(/^[a-zA-Z ]*$/, "Name should contain only letters")
    .required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  contact: yup
    .string()
    .matches(
      /^\+233[1-9][0-9]{8}$/,
      "Invalid contact format! Contact must start with +233"
    )
    .required("Contact is required"),

  profilePicture: yup
    .mixed(),
    // .test("fileType", "Invalid file type", (file) => {
    //   if (!file || !file.name) return false; // No file selected or no name
    //   const validTypes = ["png", "jpeg", "jpg"]; // Add more valid types if needed
    //   const fileType = file.name.split(".").pop().toLowerCase();
    //   return validTypes.includes(fileType);
    // })
    // .nullable(),

  hostelLogo: yup
    .mixed()
    // .test("fileType", "Invalid file type", (file) => {
    //   if (!file || !file.name) return false; // No file selected or no name
    //   const validTypes = ["png", "jpeg", "jpg"]; // Add more valid types if needed
    //   const fileType = file.name.split(".").pop().toLowerCase();
    //   return validTypes.includes(fileType);
    // })
    // .nullable(),
});
