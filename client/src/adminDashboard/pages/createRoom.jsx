import { useDispatch, useSelector } from "react-redux";
import { getHostels } from "../../features/hostels/displayHostels";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreateRooms() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hostels = useSelector((state) => state.hostel.hostel);
  const user = useSelector((state) => state.user.user);
  const myHostels = hostels.filter((hostel) => hostel.admin === user._id);
  const numberOfHostels = hostels.length || 0;

  // Check if myHostel is not undefined before accessing its length
  const numberOfMyHostels = myHostels.length || 0;

  useEffect(() => {
    dispatch(getHostels());
  }, [dispatch]);
  console.log(myHostels);

  const handleRoomRoute= (id)=>{
    navigate(`/admin/add-rooms/${id}`)
  }

  return (
    <div>
      <div className="flex gap-4 mb-7">
        <div className="w-40 h-16 text-center shadow-md bg-[#183244] rounded font-semibold">
          <h1>number of hostels</h1>
          <h1 className="text-2xl">{numberOfHostels}</h1>
        </div>

        <div className="w-40 h-16 text-center shadow-md bg-[#183244] rounded font-semibold">
          <h1>Your hostels</h1>
          <h1 className="text-2xl">{numberOfMyHostels}</h1>
        </div>
      </div>

      {/* HOSTELS BUILT BY THE ADMIN */}

      {!myHostels ? (
        <div>
          <p>You do not have any hostels yet...</p>
        </div>
      ) : (
        <div className="grid">
          {myHostels.map((hostel) => (
            <div
              key={hostel._id}
              className="w-[13rem] text-center font-semibold rounded"
            >
              <section>
                <img
                  src={hostel.imageUrl[0]}
                  alt={hostel.name}
                  className=" w-full h-96"
                />
              </section>
              <p className=" relative -top-8">{hostel.name}</p>
              <section className="relative top-[-1.5rem]">
                <button className="bg-[#7752FE] w-full h-10 hover:bg-slate-400" onClick={()=>handleRoomRoute(hostel._id)}>ADD A ROOM</button>
              </section>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CreateRooms;
