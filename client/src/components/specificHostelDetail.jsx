import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import HostelExactLocation from "./hostelLocation";
import { specificHostelDetailAction } from "../features/hostels/specificHostelDetail";
import { useEffect } from "react";

function HostelDetail() {
  const { hostelID } = useParams();
  const dispatch = useDispatch();

  const { loading, message, error, data, success, fail } = useSelector(
    (state) => state.specificHostelDetail
  );

  console.log("hostelID", hostelID);

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
    <div className="hostel-detail relative">
      <HostelExactLocation
        latitude={parseFloat(data?.address?.latitude)}
        longitude={parseFloat(data?.address?.longitude)}
      />

      {/* Display other hostel details */}
      <h2>Name: {data?.name}</h2>
      <p>Description: {data?.description}</p>
      <p>Phone: {data?.phone}</p>
      <p>Formatted Address: {data?.formattedAddress}</p>
      <p>Admin ID: {data?.adminID}</p>
      <p>Manager: {data?.manager?.name}</p>
      <p>Email: {data?.manager?.email}</p>
      <p>Profile Picture: {data?.manager?.profilePic}</p>
      <p>Images: {data?.images.join(", ")}</p>
      {/* Display other hostel details */}

    </div>
  );
}

export default HostelDetail;
