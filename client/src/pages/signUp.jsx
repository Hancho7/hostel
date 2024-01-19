/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import signUpImg from "../assets/signIn.png";
import { useSelector } from "react-redux/es/hooks/useSelector";
// import animationData from "../assets/correct.json";
// import loadingGif from "../assets/loading.json";
// import Lottie from "lottie-react";
import ClipLoader from "react-spinners/ClipLoader";
import { useFormik } from "formik";
import { userValidationSchema } from "../schemas/signupSchema";
import { signup } from "../features/logs/signupSlice";
import { useDispatch } from "react-redux";
export default function SignUp() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: userValidationSchema,
    onSubmit: (values) => {
      dispatch(signup(values));
      console.log(values);
    },
  });
  const { loading, success, error, status, message, code } = useSelector(
    (state) => state.signup
  );

  return (
    <div className="flex items-center mt-6 mb-6">
      <div className="flex-1 m-auto md:w-1/2">
        <form
          onSubmit={formik.handleSubmit}
          className={`flex flex-col items-center w-full gap-3 ${
            success ? "border-green-500" : error ? "border-red-500" : ""
          }`}
        >
          <div>
            <p className=" ">Welcome to</p>
            <h4 className="text-[#476faf] font-semibold">NICE HOME</h4>
          </div>

          <p>Create your account</p>
          {success && (
            <div className="text-green-500 mt-2">
              {message}
            </div>
          )}

          {error && (
            <div className="text-red-500 mt-2">
              {status === "error" && message
                ? `${message} (Code: ${code})`
                : "An unexpected error occurred."}
            </div>
          )}

          {/* Taking the inputs */}
          <input
            type="text"
            id="firstName" // Added id attribute
            name="firstName" // Added name attribute
            autoComplete="off"
            placeholder="First Name"
            className="common-input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <span className=" font-normal text-sm text-red-600 ">
            {formik.errors.firstName &&
              formik.touched.firstName &&
              formik.errors.firstName}
          </span>

          <input
            type="text"
            id="lastName" // Added id attribute
            name="lastName" // Added name attribute
            placeholder="Last Name"
            autoComplete="off"
            className="common-input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <span className=" font-normal text-sm text-red-600 ">
            {formik.errors.lastName &&
              formik.touched.lastName &&
              formik.errors.lastName}
          </span>

          <input
            type="email"
            id="email" // Added id attribute
            name="email" // Added name attribute
            placeholder="Email Address"
            className="common-input"
            autoComplete="off"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <span className=" font-normal text-sm text-red-600 ">
            {formik.errors.email && formik.touched.email && formik.errors.email}
          </span>

          <input
            type="tel"
            id="phone" // Added id attribute
            name="phone" // Added name attribute
            placeholder="Telephone Number"
            className="common-input"
            autoComplete="off"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <span className=" font-normal text-sm text-red-600 ">
            {formik.errors.phone && formik.touched.phone && formik.errors.phone}
          </span>
          <input
            type="password"
            id="password" // Added id attribute
            name="password" // Added name attribute
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
            className="w-10/12 h-10 gap-2 text-white bg-[#476faf] font-semibold hover:bg-[#7a90b3]"
            disabled={loading}
          >
            {loading && (
              <ClipLoader
                size="1.5rem"
                className=" mt-auto mb-auto mr-2 inline-block"
              />
            )}
            <span className=" mt-auto mb-auto inline-block">Sign Up</span>
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
      <div className="hidden md:block md:w-1/2">
        <img src={signUpImg} alt="...sign-up image loading" />
      </div>
    </div>
  );
}
