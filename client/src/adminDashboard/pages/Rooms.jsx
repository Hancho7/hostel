import { useFormik } from "formik";
import { validationSchema } from "../schemas/roomsSchema";
import { nameOfHostelAction } from "../../features/hostels/nameOfHostelForAdmin";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewHostelRoomAction } from "../../features/rooms/adminAddRooms";

function Rooms() {
  const dispatch = useDispatch();
  let { data, loading } = useSelector((state) => state.adminSignIn);
  const formik = useFormik({
    initialValues: {
      nameOfHostel: "",
      numberInRoom: "",
      roomsAvailable: "",
      secondID: data.secondID,
      pricePerIndividual: "",
      upgradeDescription: "",
      gender: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(addNewHostelRoomAction(values));
      console.log(values);
    },
  });

  const handleSelectChange = (event) => {
    formik.handleChange(event);
    formik.setFieldTouched("role", true);
  };

  useEffect(() => {
    dispatch(nameOfHostelAction(data.secondID));
    // console.log(data)
  }, [data.secondID, dispatch]);

  const { names } = useSelector((state) => state.namesOfHostel);
  console.log("namesOfHostel", names);
  function handleOnclickAll() {}
  function handleEachHostelOnclick() {}
  return (
    <div className="flex flex-col gap-y-9">
      {/* First CONTAINER OF NUMBER OF ROOMS FOR SPECIFIC HOSTEL */}
      <div className="flex flex-row justify-between">
        <div className=" border-l-red-800  border-l-2 p-3">
          <h1 className=" font-bold">Total Rooms</h1>
          <p></p>
        </div>
        <div className=" border-l-red-800 border-l-2 p-3">
          <h1 className=" font-bold">Total rooms for Jed House</h1>
          <p></p>
        </div>
        <div className=" border-l-red-800 border-l-2 p-3">
          <h1 className=" font-bold">Total rooms for Glass Hostel</h1>
          <p></p>
        </div>
      </div>

      {/* FORMS FOR ADDING NEW ROOMS*/}
      <form
        className=" flex flex-col gap-y-4 p-4"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-row gap-x-2">
          <div className="flex-1 flex flex-col">
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
                <option key={index} value={name}>
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
          <div className="flex-1 flex flex-col">
            <input
              type="text"
              name="numberInRoom"
              id="numberInRoom"
              placeholder="number in room"
              className="flex-1 border-2 rounded p-1"
              value={formik.values.numberInRoom}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className=" font-normal text-sm text-red-600 ">
              {formik.errors.numberInRoom &&
                formik.touched.numberInRoom &&
                formik.errors.numberInRoom}
            </span>
          </div>
        </div>

        <div className="flex flex-row gap-x-2">
          <div className="flex-1 flex flex-col">
            <input
              type="text"
              name="roomsAvailable"
              id="roomsAvailable"
              placeholder="Rooms Available"
              className="flex-1 border-2 rounded p-1"
              value={formik.values.roomsAvailable}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className=" font-normal text-sm text-red-600 ">
              {formik.errors.roomsAvailable &&
                formik.touched.roomsAvailable &&
                formik.errors.roomsAvailable}
            </span>
          </div>

          <div className="flex-1">
            <div>
              <div className="flex flex-row items-center">
                <span className="border-2 p-1 border-r-0 bg-gray-400 text-black font-semibold">
                  GHc
                </span>
                <input
                  type="text"
                  placeholder="Price per individual"
                  name="pricePerIndividual"
                  id="pricePerIndividual"
                  className="flex-1 border-2 rounded-tr rounded-br p-1"
                  value={formik.values.pricePerIndividual}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <span className=" font-normal text-sm text-red-600 ">
                {formik.errors.pricePerIndividual &&
                  formik.touched.pricePerIndividual &&
                  formik.errors.pricePerIndividual}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-x-2">
          <div className="flex flex-col flex-1">
            <select
              name="upgradeDescription"
              id="hostel"
              className="flex-1 border-2 rounded p-1 hover:cursor-pointer"
              onChange={handleSelectChange}
              onBlur={formik.handleBlur}
              value={formik.values.upgradeDescription}
            >
              <option value="more">Upgrade Description</option>
              <option value="good">good</option>
              <option value="better">better</option>
            </select>
            <span className=" font-normal text-sm text-red-600 ">
              {formik.errors.upgradeDescription &&
                formik.touched.upgradeDescription &&
                formik.errors.upgradeDescription}
            </span>
          </div>

          <div className="flex-1">
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
        </div>
        <button
          type="submit"
          className=" text-white bg-slate-900 border-2 p-1 rounded hover:cursor-pointer hover:bg-slate-500"
        >{loading ? "Adding..." : "Add"}
          Add
        </button>
      </form>

      {/* ARRANGE ROOMS IN TERMS OF SPECIFIC HOSTELS */}
      <div className="flex flex-row justify-between">
        <div
          className="flex-1 active:border-b-2 active:border-b-red-700 text-center hover:border-b-red-700 hover:border-b-2 hover:cursor-pointer"
          onClick={handleOnclickAll}
        >
          All
        </div>
        <div
          className="flex-1 active:border-b-2 active:border-b-red-700 text-center hover:border-b-red-700 hover:border-b-2 hover:cursor-pointer"
          onClick={handleEachHostelOnclick()}
        >
          Jed House
        </div>
        <div
          className="flex-1 active:border-b-2 active:border-b-red-700 text-center hover:border-b-red-700 hover:border-b-2 hover:cursor-pointer"
          onClick={handleEachHostelOnclick()}
        >
          Glass Hostel
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>House/Hostel</th>
            <th>Gender</th>
            <th>Available</th>
            <th>Price</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default Rooms;

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getBookingsAction } from "../../features/hostels/rooms/getBookings";

// function Bookings() {
//   const user = useSelector((state) => state.user.user);
//   const bookings = useSelector((state) => state.Bookings.bookingData);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getBookingsAction(user._id));
//   }, [dispatch, user._id]);

//   console.log("bookings", bookings);

//   // Check if bookings is null or undefined before using forEach
//   const groupedBookings = {};
//   bookings?.forEach((booking) => {
//     const hostelName = booking.hostel.name;
//     if (!groupedBookings[hostelName]) {
//       groupedBookings[hostelName] = [];
//     }
//     groupedBookings[hostelName].push(booking);
//   });

//   return (
//     <div>
//       <h1 className="text-4xl font-semibold text-center">Bookings</h1>
//       {Object.keys(groupedBookings).map((hostelName, index) => (
//         <div key={index} className=" mt-10">
//           <h2 className="text-center text-lg font-semibold mb-4">{hostelName}</h2>
//           <table className="m-auto">
//             <thead>
//               <tr className="bg-[#1D1E60] border text-left px-8 py-6">
//                 <th className=" text-center">#</th>
//                 <th className=" text-center">User</th>
//                 <th className=" text-center">Phone</th>
//                 <th className=" text-center">Email</th>
//                 <th className=" text-center">Room</th>
//                 <th className=" text-center">Payment</th>
//               </tr>
//             </thead>
//             <tbody>
//               {groupedBookings[hostelName].map((booking, subIndex) => (
//                 <tr key={subIndex} className="border px-8 py-4">
//                   <td className="border px-8 py-4">{subIndex + 1}</td>
//                   <td className="border px-8 py-4">{`${booking.user.firstName} ${booking.user.lastName}`}</td>
//                   <td className="border px-8 py-4">{booking.user.phone}</td>
//                   <td className="border px-8 py-4">{booking.user.email}</td>
//                   <td className="border px-8 py-4">{booking.room.name}</td>
//                   <td className="border px-8 py-4">{booking.paid ? "Paid" : "Pending..."}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Bookings;
