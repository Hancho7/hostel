import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminGetHostels } from "../../features/hostels/adminHostels.jsx";
import { useParams } from "react-router-dom";

function CreateRooms() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userID } = useParams();
  const hostels = useSelector((state) => state.adminHostel);
  const { hostel } = hostels;
  const { adminHostelsCount, totalHostelsCount, adminHostels } = hostel;

  useEffect(() => {
    console.log("userID:", userID);
    dispatch(adminGetHostels({ userID }));
  }, [dispatch, userID]);

  const handleRoomRoute = (id) => {
    // Replace :userID with the actual userID value
    navigate(`/admin/add-rooms/${userID}/${id}`);
  };

  return (
    <div>
      {adminHostels && (
        <div className="flex gap-4 mb-7">
          <div className="h-16 text-center shadow-md bg-[#183244] rounded font-semibold">
            <h1>Number of Hostels</h1>
            <h1 className="text-2xl">{totalHostelsCount}</h1>
          </div>

          <div className="h-16 text-center shadow-md bg-[#183244] rounded font-semibold">
            <h1>Your Hostels</h1>
            <h1 className="text-2xl">{adminHostelsCount}</h1>
          </div>
        </div>
      )}

      {!adminHostels || adminHostels.length === 0 ? (
        <div>
          <p>You do not have any hostels yet...</p>
        </div>
      ) : (
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(236px, 1fr))",
          }}
        >
          {adminHostels.map((hostel) => (
            <div
              key={hostel._id}
              className="w-[13rem] text-center font-semibold rounded"
            >
              <section>
                <img
                  src={hostel.imageUrl[0]}
                  alt={hostel.name}
                  className="w-full h-36"
                />
              </section>
              <p className="relative -top-8">{hostel.name}</p>
              <section className="relative top-[-1.5rem]">
                <button
                  className="bg-[#7752FE] w-full h-10 hover:bg-slate-400"
                  onClick={() => handleRoomRoute(hostel._id)}
                >
                  ADD A ROOM
                </button>
              </section>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CreateRooms;
