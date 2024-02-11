/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import signUp from "../assets/signUp.jpg";
import { useSelector } from "react-redux";
import { NavBarLayout } from "../components/Layouts";
import ClipLoader from "react-spinners/ClipLoader";
import { CgProfile } from "react-icons/cg";
import { useFormik } from "formik";
import { userValidationSchema } from "../schemas/signupSchema";
import { signup } from "../features/logs/signupSlice";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";

export default function SignUp() {
  const [selectedImage, setSelectedImage] = useState(null);
  const profilePictureInput = useRef();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      gender: "",
      profilePicture: [],
    },
    validationSchema: userValidationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(signup(values));
      console.log(values);
      resetForm(); // Reset the form after successful submission
    },
  });

  const { success, error, status, message, code, loading } = useSelector(
    (state) => state.signup
  );

  const handleProfilePictureChange = (event) => {
    const file = event.currentTarget.files[0];
    const imageUrl = URL.createObjectURL(file);

    formik.setFieldValue("profilePicture", file);
    setSelectedImage(imageUrl);
  };

  useEffect(() => {
    if (success) {
      formik.resetForm();
    }
  }, [formik, success]);

  return (
    <NavBarLayout bgColor="#18223C">
      <div className="flex flex-col-reverse md:flex-row gap-10 md:gap-0 items-center py-8">
        <div className="flex-1 m-auto md:w-1/2">
          <form
            encType="multipart/form-data"
            onSubmit={formik.handleSubmit}
            className={`flex flex-col items-center w-full gap-3 ${
              formik.touched.profilePicture && formik.errors.profilePicture
                ? "border-red-500"
                : ""
            }`}
          >
            <div>
              <p className=" ">Welcome to</p>
              <h4 className="text-[#476faf] font-semibold">NICE HOME</h4>
            </div>

            <p>Create your account</p>
            {success && <div className="text-green-500 mt-2">{message}</div>}

            {error && (
              <div className="text-red-500 mt-2">
                {status === "error" && message
                  ? `${message} (Code: ${code})`
                  : "An unexpected error occurred."}
              </div>
            )}

            {/* PROFILE PICTURE */}
            <div className="flex flex-col flex-1">
              <div>
                <label htmlFor="profilePicture">
                  <div className="flex gap-x-3 flex-col items-center hover:cursor-pointer">
                    <span className="text-2xl">
                      {selectedImage ? (
                        <img
                          className="w-16 h-16 rounded-full"
                          src={selectedImage}
                          alt="Selected Image"
                        />
                      ) : (
                        <CgProfile className="w-16 h-16" />
                      )}
                    </span>
                    <span>Add Picture</span>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    id="profilePicture"
                    accept="image/*"
                    name="profilePicture"
                    onChange={handleProfilePictureChange}
                    onBlur={formik.handleBlur}
                    ref={profilePictureInput}
                  />
                </label>
              </div>
              <span className="font-normal text-sm text-red-600">
                {formik.errors.profilePicture &&
                  formik.touched.profilePicture &&
                  formik.errors.profilePicture}
              </span>
            </div>

            {/* Taking the inputs */}
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="off"
              placeholder="First Name"
              className="common-input"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <span className=" font-normal text-sm text-red-600 ">
              {formik.errors.name && formik.touched.name && formik.errors.name}
            </span>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              className="common-input"
              autoComplete="off"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className=" font-normal text-sm text-red-600 ">
              {formik.errors.email &&
                formik.touched.email &&
                formik.errors.email}
            </span>
            <div>
              <div className="flex gap-x-3 items-center">
                <span>For gender</span>
                <div>
                  <input
                    type="radio"
                    name="gender" // Make sure the name matches the key in initialValues
                    value="Male"
                    checked={formik.values.gender === "Male"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />{" "}
                  Male
                </div>
                <div>
                  <input
                    type="radio"
                    name="gender" // Make sure the name matches the key in initialValues
                    value="Female"
                    checked={formik.values.gender === "Female"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />{" "}
                  Female
                </div>
              </div>
              <span className=" font-normal text-sm text-red-600 ">
                {formik.errors.gender &&
                  formik.touched.gender &&
                  formik.errors.gender}
              </span>
            </div>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="common-input"
              autoComplete="off"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className=" font-normal text-sm text-red-600 ">
              {formik.errors.password &&
                formik.touched.password &&
                formik.errors.password}
            </span>
            <input
              type="password"
              id="repassword"
              name="repassword"
              placeholder="Confirm Password"
              className="common-input"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="font-normal text-sm text-red-600">
              {formik.errors.repassword &&
                formik.touched.repassword &&
                formik.errors.repassword}
            </span>

            <button
              type="submit"
              className={`${
                loading
                  ? "flex items-center justify-center w-10/12 h-10 gap-2"
                  : ""
              }w-10/12 h-10 gap-2 text-white bg-[#476faf] font-semibold hover:bg-[#7a90b3]`}
              disabled={loading}
            >
              {loading && (
                <ClipLoader
                  size="1.5rem"
                  className="mt-auto mb-auto mr-2 inline-block"
                />
              )}
              <span className="mt-auto mb-auto inline-block">Sign Up</span>
            </button>

            <div className="w-10/12 mt-8">
              <p>
                Already have an account?{" "}
                <Link to="/sign-in" className="text-[#476faf]">
                  Login
                </Link>
              </p>
              <p>
                Click "Sign Up" to agree to Nice Home's Terms of Services and
                acknowledge that Nice Home's Privacy Policy applies to you.
              </p>
            </div>
          </form>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <img
            className="h-60 w-60 rounded-[50%]"
            src={signUp}
            alt="...sign-up image loading"
          />
        </div>
      </div>
    </NavBarLayout>
  );
}
