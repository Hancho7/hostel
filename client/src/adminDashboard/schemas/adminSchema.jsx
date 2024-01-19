import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .matches(/^[a-zA-z]+$/, "Names must only contain letters"),

  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Names must only contain letters"
    ),

  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password must contain at least 8 characters, one lowercase letter, one uppercase letter, and one number"
    ),

  role: yup.string().required("Role is required"),

  file: yup
    .mixed()
    .test("fileType", "Invalid file type", (file) => {
      if (!file || !file.type || !file.type.startsWith("image/")) return false;
      return true;
    })
    .nullable(),
});
