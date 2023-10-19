import { useDispatch, useSelector } from "react-redux";
import { getHostels } from "../../features/hostels/displayHostels";
import { useEffect } from "react";

function CreateRooms() {
  const dispatch = useDispatch();
  const hostels = useSelector((state) => state.hostel.hostel);
  // const user = useSelector((state)=> state.user.user)
  // const myHostel = hostels.find((hostel)=>hostel.admin === user._id)

  useEffect(() => {
    dispatch(getHostels()); 
  }, [dispatch]);

  const numberOfHostels = hostels.length || 0;
  
  // const numberOfMyHostels = myHostel.length || 0;
  console.log(hostels);
  return (
    <div className="flex gap-4">
      <div className=" w-40 h-16 text-center shadow-md bg-[#183244] rounded font-semibold">
        <h1>number of hostels</h1>
        <h1 className=" text-2xl">{numberOfHostels}</h1>
      </div>

      <div className=" w-40 h-16 text-center shadow-md bg-[#183244] rounded font-semibold">
        <h1>Your hostels</h1>
        <h1>{0}</h1>
      </div>
    </div>
  );
}

export default CreateRooms;
