import { useRef, useState } from "react";
import { useFormik } from "formik";
import { validationSchema } from "../schemas/adminSchema";
import { AiOutlinePicture } from "react-icons/ai";
import { BiLogoAdobe } from "react-icons/bi";

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [logoName, setLogoName] = useState("");
  const profilePictureInput = useRef();
  const logoInput = useRef();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      contact: "",
      password: "",
      profilePicture: [],
      hostelLogo: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      setIsEditingName(false);
      setIsEditingEmail(false);
      setIsEditingPassword(false);
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

  const handleEdit = (field) => {
    switch (field) {
      case "name":
        setIsEditingName(true);
        break;
      case "email":
        setIsEditingEmail(true);
        break;
      case "password":
        setIsEditingPassword(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      <form
        className="space-y-4 flex flex-row gap-x-4"
        encType="multipart/form-data"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex-1 flex flex-col gap-y-6 bg-[#ececec] p-6 rounded-md">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <div className="flex flex-row h-8 items-center justify-center">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                className="h-full bg-slate-100 block w-full rounded-tl-sm rounded-bl-sm border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={formik.handleChange}
                value={formik.values.name}
                disabled={!isEditingName}
              />
              <button
                type="button"
                onClick={() => handleEdit("name")}
                className="text-center px-2 h-full border border-transparent text-sm font-medium rounded-br-sm rounded-tr-sm text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isEditingName ? "Save" : "Edit"}
              </button>
            </div>

            <span className=" font-normal text-sm text-red-600">
              {formik.errors.name && formik.touched.name && formik.errors.name}
            </span>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="flex flex-row h-8 items-center justify-center">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="h-full bg-slate-100 block w-full rounded-tl-sm rounded-bl-sm border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={formik.handleChange}
                value={formik.values.email}
                disabled={!isEditingEmail}
              />
              <button
                type="button"
                onClick={() => handleEdit("email")}
                className="inline-flex justify-center h-full px-2 py-1 border border-transparent text-sm font-medium rounded-br-sm rounded-tr-sm text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isEditingEmail ? "Save" : "Edit"}
              </button>
            </div>

            <span className=" font-normal text-sm text-red-600">
              {formik.errors.email &&
                formik.touched.email &&
                formik.errors.email}
            </span>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="flex flex-row h-8 items-center justify-center">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                className="h-full bg-slate-100 block w-full rounded-tl-sm rounded-bl-sm border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={formik.handleChange}
                value={formik.values.email}
                disabled={!isEditingEmail}
              />
              <button
                type="button"
                onClick={() => handleEdit("password")}
                className="inline-flex justify-center px-2 py-1 border border-transparent text-sm font-medium rounded-br-sm rounded-tr-sm text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isEditingPassword ? "Save" : "Edit"}
              </button>
            </div>

            <span className=" font-normal text-sm text-red-600">
              {formik.errors.email &&
                formik.touched.email &&
                formik.errors.email}
            </span>
          </div>

          {/* Similarly, implement for other fields like name and password */}

          <div>
            <button
              type="submit"
              className="w-full hover:bg-slate-500 bg-slate-900 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2  text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm"
            >
              Save Changes
            </button>
          </div>
        </div>
        <div className="flex-1 bg-[#ececec] p-6 rounded-md h-fit">
          <h1 className=" text-center text-xl font-semibold">Images</h1>
          <div className="flex flex-row justify-around mt-8 gap-x-2">
            <div className="flex-1 flex justify-center flex-col items-center">
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
            <div className="flex-1 flex justify-center flex-col items-center">
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
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
