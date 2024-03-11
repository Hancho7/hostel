import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import Cliploader from "react-spinners/ClipLoader";
import { specificHostelImagesAction } from "../features/hostels/specificHostelImages";

function SpecificHostelImages() {
  const dispatch = useDispatch();
  const { hostelID } = useParams();
  const navigate = useNavigate();

  const { loading, data } = useSelector((state) => state.specificHostelImages);

  const handleNavigateBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  useEffect(() => {
    dispatch(specificHostelImagesAction(hostelID));
  }, [dispatch, hostelID]);

  return (
    <>
      {loading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <Cliploader />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-4">
          <button className=" self-start text-2xl" onClick={handleNavigateBack}>
            <IoIosArrowRoundBack />
          </button>
          {data.map((image, index) => (
            <div className="my-2" key={index}>
              <img key={index} src={image} alt="hostel" />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default SpecificHostelImages;
