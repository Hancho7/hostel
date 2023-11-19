import { useParams } from "react-router-dom";
import { addRoomAction } from "../../features/hostels/rooms/addRooms";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminGetRooms } from "../../features/hostels/rooms/adminGetRooms";

function Room() {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.adminGetRoom.rooms);
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
  };

  useEffect(() => {
    dispatch(adminGetRooms({ userID, id }));
  }, [dispatch, userID, id]);

  console.log("rooms", rooms);

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
          gridTemplateAreas: `"rooms form"`,
          gridTemplateColumns: "auto 0fr",
          gridTemplateRows: "auto 1fr",
        }) ||
          (displayStyle === "flex" && {
            flexDirection: "column-reverse",
            alignItems: "center",
          })),
      }}
      className="flex flex-col gap-4 md:grid"
    >
      {/* ROOMS OF THIS HOSTEL */}
      <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
                gridTemplateRows: "auto",
                gridGap: "10px",
                gridAutoFlow: "row",
                gridArea: "rooms"
              }}
              className="mx-auto shadow-lg mb-11 mt-7 p-4" >
        {rooms ? (
          rooms.map((room) => (
            <div key={room.name}>
              <h1>{room.name}</h1>
              <p>{room.capacity} x 1</p>
            </div>
          ))
        ) : (
          <div>No rooms available</div>
        )}
      </div>
      <div style={{ gridArea: "form" }} className="md:w-[20%] sticky top-0 text-center">
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
              className=" h-8 p-2"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
            />
            <button className=" bg-[#0d2266] h-8" type="submit">ADD ROOM</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Room;
