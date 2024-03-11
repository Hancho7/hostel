import { useFormik } from "formik";
import { validationSchema } from "../schemas/uniSchema";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { nameOfHostelAction } from "../../features/hostels/nameOfHostelForAdmin";

function Unit() {
  const dispatch = useDispatch;
  let { data } = useSelector((state) => state.adminSignIn);
  const formik = useFormik({
    initialValues: {
      nameOfHostel: "",
      unitName: "",
      roomType: "",
      numberInRoom: "",
      gender: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    dispatch(nameOfHostelAction(data.secondID));
    // console.log(data)
  }, [data.secondID, dispatch]);
  const { names } = useSelector((state) => state.namesOfHostel);
  const handleSelectChange = (event) => {
    formik.handleChange(event);
    formik.setFieldTouched("nameOfHostel", true);
  };

  return (
    <form
      className="space-y-4 flex flex-col gap-y-5"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex gap-x-4 ">
        <div className="flex-1">
          <label htmlFor="nameOfHostel">name Of Hostel</label>
          <select
            name="nameOfHostel"
            id="nameOfHostel"
            className="flex-1 border-2 rounded p-1 hover:cursor-pointer"
            onChange={handleSelectChange}
            onBlur={formik.handleBlur}
            value={formik.values.nameOfHostel}
          >
            <option value="">Select the hostel</option>
            {names?.map((name, index) => (
              <option key={index} value={index}>
                {name}
              </option>
            ))}
          </select>

          <span className=" font-normal text-sm text-red-600 ">
            {formik.errors.nameOfHostel &&
              formik.touched.nameOfHostel &&
              formik.errors.nameOfHostel}
          </span>
        </div>
        <div className="flex-1">
          <label
            htmlFor="unitName"
            className="block text-sm font-medium text-gray-700"
          >
            Unit name
          </label>
          <input
            id="unitName"
            name="unitName"
            type="text"
            autoComplete="unitName"
            value={formik.values.unitName}
            onChange={formik.handleChange}
            className="mt-1 h-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <span className=" font-normal text-sm text-red-600 ">
            {formik.errors.unitName &&
              formik.touched.unitName &&
              formik.errors.unitName}
          </span>
        </div>
      </div>
      <div className="flex gap-x-4">
        <div className="flex-1">
          <label
            htmlFor="roomType"
            className="block text-sm font-medium text-gray-700"
          >
            Unit type
          </label>
          <select
            id="roomType"
            name="roomType"
            value={formik.values.roomType}
            onChange={formik.handleChange}
            className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select a unit type</option>
            <option value="all">All</option>
            <option value="booked">Booked Units</option>
            <option value="unbooked">Unbooked Units</option>
            {/* Add more options as needed */}
          </select>
          <span className=" font-normal text-sm text-red-600 ">
            {formik.errors.roomType &&
              formik.touched.roomType &&
              formik.errors.roomType}
          </span>
        </div>
        <div className="flex-1">
          <label
            htmlFor="numberInRoom"
            className="block text-sm font-medium text-gray-700"
          >
            Number in a room
          </label>
          <input
            id="numberInRoom"
            name="numberInRoom"
            type="number"
            autoComplete="numberInRoom"
            value={formik.values.numberInRoom}
            onChange={formik.handleChange}
            className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <span className=" font-normal text-sm text-red-600 ">
            {formik.errors.numberInRoom &&
              formik.touched.numberInRoom &&
              formik.errors.numberInRoom}
          </span>
        </div>
      </div>

      <div>
        <label
          htmlFor="gender"
          className="block text-sm font-medium text-gray-700"
        >
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          value={formik.values.gender}
          onChange={formik.handleChange}
          className="mt-1 block w-[30%] h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select a gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          {/* Add more options as needed */}
        </select>
        <span className=" font-normal text-sm text-red-600 ">
          {formik.errors.gender &&
            formik.touched.gender &&
            formik.errors.gender}
        </span>
      </div>

      <button
        type="submit"
        className="w-full hover:bg-slate-500 bg-slate-900 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2  text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm"
      >
        Add Unit
      </button>
    </form>
  );
}

export default Unit;
