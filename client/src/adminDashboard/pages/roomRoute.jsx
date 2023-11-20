import { useParams } from "react-router-dom";
import { addRoomAction } from "../../features/hostels/rooms/addRooms";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminGetRooms } from "../../features/hostels/rooms/adminGetRooms";
import ClipLoader from "react-spinners/ClipLoader";

function Room() {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.adminGetRoom.rooms);
  const loading = useSelector((state) => state.addRoom.loading);
  const addRoomSuccess = useSelector(state => state.addRoom.success);
  const { userID, id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    hostelID: id,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(addRoomAction(formData));
    console.log('loading', loading)
    if(!addRoomSuccess){
      alert("error occured")
    }
    alert(`${formData.name} has successfully been added`)
    
  };

  useEffect(() => {
    dispatch(adminGetRooms({ userID, id }));
  }, [dispatch, userID, id]);

  // MANAGING THE MEDIA QUERY
  const [displayStyle, setDisplayStyle] = useState("grid"); // Add this state

  // MANAGING THE MEDIA QUERY
  const handleMediaQueryChange = (e) => {
    if (e.matches) {
      setDisplayStyle("flex");
    } else {
      setDisplayStyle("grid");
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    // Initial check and state setting
    handleMediaQueryChange(mediaQuery);

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <div
      style={{
        display: displayStyle,
        ...((displayStyle === "grid" && {
          gap: "2rem",
          margin: "2rem",
          gridTemplateColumns: "70% 30%",
        }) ||
          (displayStyle === "flex" && {
            flexDirection: "column-reverse",
            alignItems: "center",
          })),
      }}
    >
      {/* ROOMS OF THIS HOSTEL */}
      <div className="w-[100%] text-center mt-12 md:mt-0">
        <h1>ROOMS ADDED</h1>
        <div
          style={{
            display: "grid",
            gridGap: "10px",
            gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
            width: "100%",
          }}
          className="shadow-lg p-4"
        >
          {rooms ? (
            rooms.map((room) => (
              <div
                className=" w-12 h-12 bg-slate-500 text-center rounded-md mx-auto"
                key={room.name}
              >
                <h1>{room.name}</h1>
                <p>{room.capacity} x 1</p>
              </div>
            ))
          ) : (
            <div>No rooms available</div>
          )}
        </div>
      </div>

      <div className="text-center">
        <h1 className=" font-semibold my-5">ADD A ROOM</h1>
        <div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 text-black "
          >
            <input
              type="text"
              placeholder="room name"
              className=" h-8 p-2"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />

            <input
              type="text"
              placeholder="Number per room"
              className=" h-8 p-2 w-full"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
            />
            <button className="flex flex-row justify-center gap-2 bg-[#0d2266] h-8" type="submit">
              {loading ? (
                <ClipLoader size="1.5rem" className=" mt-auto mb-auto" />
              ) : (
                <></>
              )}
              <span className=" mt-auto mb-auto"> ADD ROOM</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Room;
