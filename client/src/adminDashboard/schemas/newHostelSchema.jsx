import * as yup from "yup";

export const validationSchema = yup.object({
  nameOfHostel: yup
    .string()
    .matches(/^[a-zA-Z0-9\s]+$/, "Only letters and numbers are allowed")
    .required("Name is required"),
  phoneNumber: yup
    .string()
    .matches(
      /^\+233[1-9][0-9]{8}$/,
      "Phone number must start with +233, followed by ten digits, and the second digit must not be zero"
    )
    .required("Phone number is required"),
  images: yup
    .array()
    .required("At least four images are required")
    .min(4, "At least four images are required")
    .test("fileSize", "Images must be smaller than 5MB", (value) =>
      value.every((file) => file.size <= 5 * 1024 * 1024)
    )
    .test(
      "fileType",
      "Unsupported file type. Only images are allowed",
      (value) => value.every((file) => file.type.startsWith("image/"))
    ),
  description: yup.array().of(yup.string()),
  address: yup.object({
    Latitude: yup.number().required(),
    Longitude: yup.number().required(),
    formattedAddress: yup.string().required(),
  }),
});
