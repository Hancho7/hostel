import { useParams } from "react-router-dom";
import { addRoomAction } from "../../features/hostels/rooms/addRooms";
import { useState } from "react";
import { useDispatch } from "react-redux";
function Room() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    hostelID: id,
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(formData)
    dispatch(addRoomAction(formData))
  }

  return (
    <div>
      <div></div>
      <h1>ADD A ROOM</h1>
      <div>
        <form onSubmit={handleSubmit} className=" text-black">
          <input
            type="text"
            placeholder="room name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <br />
          <input
            type="text"
            placeholder="Number per room"
            name="capacity"
            value={formData.capacity}
            onChange={handleInputChange}
          />
          <button type="submit">ADD ROOM</button>
        </form>
      </div>
    </div>
  );
}

export default Room;
