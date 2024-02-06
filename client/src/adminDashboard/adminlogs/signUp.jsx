import { useFormik } from "formik";
import { useState, useRef } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { BiLogoAdobe } from "react-icons/bi";
import { validationSchema } from "../schemas/adminSignupSchema";
import { useNavigate } from "react-router-dom";
import { adminSignUpAction } from "../../features/admin/signup";
import { useDispatch, useSelector } from "react-redux";
// import FadeLoader from "react-spinners/FadeLoader";

function AdminSignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, error, status, message, code } = useSelector(
    (state) => state.adminSignUp
  );
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [logoName, setLogoName] = useState("");
  const profilePictureInput = useRef();
  const logoInput = useRef();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      contact: "",
      profilePicture: [],
      hostelLogo: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(adminSignUpAction(values));
      console.log(values);
    },
  });

  const handleProfilePictureChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("profilePicture", file);
    setSelectedImage(file);
    setImageName(file.name);
  };

  const handleLogoChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("hostelLogo", file);
    setSelectedLogo(file);
    setLogoName(file.name);
  };

  console.log("success", success);
  
  
  return (
    <div className="flex items-center justify-center h-screen bg-[#1C2841]">
      <div className="flex flex-row mx-20 bg-slate-50 rounded-2xl shadow-md">
        <div className="flex items-center flex-1 py-16 bg-[#31475E] text-slate-300 rounded-tr-3xl rounded-br-3xl">
          <div className="flex flex-col gap-y-9 justify-center px-6 py-2 ">
            <div>
              <h1 className="font-semibold text-lg">
                Welcome to Home of Hostels
              </h1>
              <hr className="w-16 border-2 mt-1 bg-red-600" />
            </div>
            <p>
              &quot;A closed door gathers dust, but an open heart gathers the
              world.&quot; In today&apos;s hyper-connected world, the walls of
              traditional hotel management crumble like sandcastles against the
              tide. Just as hearts flourish with openness, so too do hotels that
              embrace the boundless opportunities of online presence. We got
              you!!
              <br />
              Sign up for that presence &#128513;
            </p>
            <button
              onClick={() => navigate("/admin/sign-in")}
              name="signInButton"
              className="border-2 py-1 hover:bg-gray-400 font-semibold"
            >
              Sign In
            </button>
          </div>
        </div>
        <div className="flex items-center flex-col justify-center flex-[2] px-10">
          <h1 className="text-xl font-semibold">Create Your Account</h1>
          {success && <div className="text-green-500 mt-2">{message}</div>}
          {loading && (
            <div className=" text-green-500">
              <p>signing up...</p>
            </div>
          )}

          {error && (
            <div className="text-red-500 mt-2">
              {status === "error" && message
                ? `${message} (Code: ${code})`
                : "An unexpected error occurred."}
            </div>
          )}
          <form
            onSubmit={formik.handleSubmit}
            encType="multipart/form-data"
            className=" w-[65%] flex flex-col gap-y-4"
          >
            <div className="flex flex-col">
              <label htmlFor="name">Name </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className=" border-2 p-1 rounded"
              />
              <span className="font-normal text-sm text-red-600">
                {formik.errors.name &&
                  formik.touched.name &&
                  formik.errors.name}
              </span>
            </div>
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
              <label htmlFor="contact">contact </label>
              <input
                type="text"
                id="contact"
                name="contact"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className=" border-2 p-1 rounded"
              />
              <span className="font-normal text-sm text-red-600">
                {formik.errors.contact &&
                  formik.touched.contact &&
                  formik.errors.contact}
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
            <div className="flex flex-row gap-x-2 justify-between items-center">
              {/* LOGO */}
              <div className="flex flex-col flex-1">
                <div>
                  <label htmlFor="hostelLogo">
                    <div className="flex gap-x-3  flex-row items-center hover:cursor-pointer">
                      <span className="text-2xl w-4">
                        <BiLogoAdobe />
                      </span>
                      <span>Logo</span>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      id="hostelLogo"
                      accept="image/*"
                      name="hostelLogo"
                      onChange={handleLogoChange}
                      onBlur={formik.handleBlur}
                      ref={logoInput}
                    />
                  </label>
                </div>
                {selectedLogo && <p>{logoName}</p>}
                <span className="font-normal text-sm text-red-600">
                  {formik.errors.hostelLogo &&
                    formik.touched.hostelLogo &&
                    formik.errors.hostelLogo}
                </span>
              </div>

              {/* PROFILE PICTURE */}
              <div className="flex flex-col flex-1">
                <div>
                  <label htmlFor="profilePicture">
                    <div className="flex gap-x-3 flex-row items-center hover:cursor-pointer">
                      <span className="text-2xl w-4">
                        <AiOutlinePicture />
                      </span>
                      <span>Profile picture</span>
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
                {selectedImage && <p>{imageName}</p>}
                <span className="font-normal text-sm text-red-600">
                  {formik.errors.profilePicture &&
                    formik.touched.profilePicture &&
                    formik.errors.profilePicture}
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="font-semibold text-white bg-slate-900 border-2 p-1 rounded hover:cursor-pointer hover:bg-slate-500"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminSignUp;
