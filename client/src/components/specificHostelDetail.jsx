import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import HostelExactLocation from "./hostelLocation";
import { specificHostelDetailAction } from "../features/hostels/specificHostelDetail";
import RoomList from "./roomsAvailable";
import ManagerInfo from "./managerInfo";
import Carousel from "./carousel";
import { useEffect } from "react";

function HostelDetail() {
  const { hostelID } = useParams();
  const dispatch = useDispatch();

  const { loading, message, error, data, success, fail } = useSelector(
    (state) => state.specificHostelDetail
  );

  const { user } = useSelector((state) => state.user);

  console.log("hostelID", hostelID);
  console.log("user", user);

  useEffect(() => {
    dispatch(specificHostelDetailAction(hostelID));
  }, [dispatch, hostelID]);

  console.log("loading", loading);
  console.log("message", message);
  console.log("error", error);
  console.log("data", data);
  console.log("success", success);
  console.log("fail", fail);

  return (
    <div className="hostel-detail relative flex flex-col gap-y-6">
      {/* Display images in a carousel */}
      <Carousel
        images={data?.imageUrl || []}
        hostelID={hostelID}
        loading={loading}
      />
      <h2 className=" text-center text-2xl font-semibold"> {data?.name}</h2>

      <ManagerInfo manager={data?.manager} />
      <RoomList rooms={data?.rooms} userID={user._id} />
      <div className="md:self-end w-full">
        <HostelExactLocation
          latitude={parseFloat(data?.address?.latitude)}
          longitude={parseFloat(data?.address?.longitude)}
        />
      </div>

      {/* Display other hostel details */}

      <p>Description: {data?.description}</p>

      <p>Manager: {data?.manager?.name}</p>
      {/* Display other hostel details */}
    </div>
  );
}

export default HostelDetail;
