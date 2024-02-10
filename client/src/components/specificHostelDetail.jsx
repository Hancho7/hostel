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
      {/* Add other hostel details like description, prices, etc. */}
    </div>
  );
}

export default HostelDetail;
