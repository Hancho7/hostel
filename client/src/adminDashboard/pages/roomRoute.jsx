import { useParams } from "react-router-dom";

function Room() {
    const {id} = useParams()
    console.log("room", id)
  return (
    <div>
      
    </div>
  )
}

export default Room;
