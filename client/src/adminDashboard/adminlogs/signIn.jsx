import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminSignIn } from "../../features/admin/signin";
import { useEffect, useState } from "react";

function AdminSignIn() {
  const { loading, success, message } = useSelector(
    (state) => state.adminSignIn
  );
  const [btnText, setBtnText] = useState("Sign in");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(adminSignIn(values));
      console.log(values);
    },
  });

  useEffect(() => {
    if (loading) {
      setBtnText("Signing in...");
    } else if (success) {
      navigate("/admin");
      window.location.reload();
    
    } else {
      setBtnText("Sign in");
    }
  }, [loading, success, navigate]);
  

  return (
    <div className="flex items-center justify-center h-screen bg-[#1C2841]">
      <div className="flex flex-row-reverse mx-20 bg-slate-50 rounded-2xl shadow-md">
        <div className="flex items-center flex-1 py-16 bg-[#31475E] text-slate-300 rounded-tl-3xl rounded-bl-3xl">
          <div className="flex flex-col gap-y-9 justify-center px-6 py-2 ">
            <div>
              <h1 className="font-semibold text-lg">
                Welcome to Home of Hostels
              </h1>
              <hr className="w-16 border-2 mt-1 bg-red-600" />
            </div>
            <p>
              A symphony of accents, laughter, and crumpled maps, a hostel is a
              passport to shared adventures and unexpected connections.
              <br />
              &#129505;&#127976;
            </p>
            <button
              onClick={() => navigate("/admin/sign-up")}
              name="signInButton"
              className="border-2 py-1 hover:bg-gray-400 font-semibold"
            >
              Sign Up
            </button>
          </div>
        </div>
        <div className="flex items-center flex-col justify-center flex-[2] px-10">
          <h1 className="text-xl font-semibold">Sign in to your account</h1>
          {message}
          <form
            onSubmit={formik.handleSubmit}
            className=" w-[65%] flex flex-col gap-y-4"
          >
            <div className="flex flex-col">
              <label htmlFor="email">email </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className=" border-2 p-1 rounded"
              />
              <span className="font-normal text-sm text-red-600">
                {formik.errors.email &&
                  formik.touched.email &&
                  formik.errors.email}
              </span>
            </div>

            <div className="flex flex-col">
              <label htmlFor="password">password </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className=" border-2 p-1 rounded"
              />
              <span className="font-normal text-sm text-red-600">
                {formik.errors.password &&
                  formik.touched.password &&
                  formik.errors.password}
              </span>
            </div>

            <button
              type="submit"
              className="font-semibold text-white bg-slate-900 border-2 p-1 rounded hover:cursor-pointer hover:bg-slate-500"
            >
              {btnText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminSignIn;
