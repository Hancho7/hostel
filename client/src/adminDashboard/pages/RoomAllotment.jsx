

function RoomAllotment() {
  return (
    <div>
      Room Allocation
    </div>
  )
}

export default RoomAllotment


// import { GrFormAdd } from "react-icons/gr";

// export function CreateHostel({
//   handleInputChange,
//   addDescription,
//   addPrice,
//   handleDescriptionChange,
//   handleImageChange,
//   handlePriceChange,
//   handleUpload,
//   formData,
// }) {
//   return (
//     <div>
//       <h2 className=" text-base md:text-lg lg:text-3xl my-4 font-semibold text-center">
//         Upload New Hostel
//       </h2>
//       <form
//         encType="multipart/form-data"
//         className="flex flex-col  gap-4 w-[100%] md:w-[80%] lg:w-[60%] md:m-auto p-5 rounded-md "
//         onSubmit={handleUpload}
//       >
//         <input
//           className=" common-input2 bg-[#E1E1E1]"
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={formData.name}
//           onChange={handleInputChange}
//         />
//         <input
//           className=" common-input2 bg-[#E1E1E1]"
//           type="text"
//           name="location"
//           placeholder="Location"
//           value={formData.location}
//           onChange={handleInputChange}
//         />
//         <div className="flex items-center flex-row sm:flex-row gap-3">
//           <div className="flex flex-col gap-y-2 w-full sm:w-auto">
//             {formData.hostelDescription.map((description, index) => (
//               <div key={index} className="flex gap-y-2">
//                 <input
//                   className="common-input2 w-full md:w-auto bg-[#E1E1E1]"
//                   type="text"
//                   placeholder="Hostel Description"
//                   value={description}
//                   onChange={(e) =>
//                     handleDescriptionChange(index, e.target.value)
//                   }
//                   key={index}
//                 />
//               </div>
//             ))}
//           </div>
//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               addDescription();
//             }}
//             className="bg-slate-200 ml-0 mt-2 md:ml-1 text-white"
//           >
//             <GrFormAdd className="text-white" />
//           </button>
//         </div>

//         {/* Prices */}
//         <div className="flex flex-row gap-5">
//           <div className="flex flex-col gap-3">
//             {formData.prices.map((price, index) => (
//               <div key={index} className="flex gap-x-2 flex-row">
//                 <div className="flex flex-col md:flex-row md:gap-2">
//                   <input
//                     className="common-input2 my-2 w-full md:w-auto bg-[#E1E1E1]"
//                     type="text"
//                     placeholder="Number in Room"
//                     value={price.numberInRoom}
//                     onChange={(e) =>
//                       handlePriceChange(index, "numberInRoom", e.target.value)
//                     }
//                   />
//                   <input
//                     className="common-input2 my-2 w-full md:w-auto bg-[#E1E1E1]"
//                     type="number"
//                     placeholder="Price"
//                     value={price.price}
//                     onChange={(e) => {
//                       handlePriceChange(index, "price", e.target.value);
//                     }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Add button */}
//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               addPrice();
//             }}
//             className="bg-slate-200 m-auto text-white h-8 self-end md:self-center"
//           >
//             <GrFormAdd />
//           </button>
//         </div>

//         {/* Add file input for image uploads */}
//         <div>
//           <input
//             className="hidden"
//             type="file"
//             name="files"
//             accept="image/*"
//             multiple
//             id="file-input" // Connect this input to the label using the "for" attribute
//             onChange={handleImageChange}
//           />
//           <label
//             htmlFor="file-input"
//             className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-slate-500"
//           >
//             <span>Upload Images</span>
//           </label>
//         </div>
//         <input
//           className=" common-input2 bg-[#E1E1E1]"
//           type="text"
//           name="phone"
//           placeholder="Phone"
//           value={formData.phone}
//           onChange={handleInputChange}
//         />
//         <button
//           type="submit"
//           onClick={handleUpload}
//           className=" cursor-pointer text-white hover:bg-slate-500 h-9 w-28 bg-[#3B82F6] font-semibold rounded m-auto"
//         >
//           Upload Hostel
//         </button>
//       </form>
//     </div>
//   );
// }

