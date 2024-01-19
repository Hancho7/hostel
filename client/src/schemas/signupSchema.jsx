import * as yup from "yup";

export const userValidationSchema = yup.object({
  firstName: yup
    .string("First name must be letters only")
    .required("This field is required"),

  lastName: yup
    .string("Last name must be letters only")
    .required("This field is required"),

  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Names must only contain letters"
    ),

  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),

  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password must contain at least 8 characters, one lowercase letter, one uppercase letter, and one number"
    ),

  repassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
