import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import HashLoader from "react-spinners/HashLoader";
import { getHostels } from "../../features/hostels/displayHostels.jsx";
import { Link } from "react-router-dom";
import { GrLinkNext } from "react-icons/gr";
import { addID } from "../../features/hostels/hostelID.jsx";

function Part2() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the hostel data from the Redux store
  const loading = useSelector((state) => state.hostel.loading);
  const hostels = useSelector((state) => state.hostel.hostel);
  const error = useSelector((state) => state.hostel.error);

  // Authenticate user
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(getHostels());
  }, [dispatch]);

  const handleLearnMore = (hostel, currentLocation) => {
    console.log("currentLocation", currentLocation);
    if (!user) {
      navigate("/sign-in", { state: { from: currentLocation } });
      return;
    }

    dispatch(addID(hostel));
    navigate(currentLocation);
  };

  console.log(hostels);
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl mb-6 text-center">Available Hostels</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {!error ? (
          hostels && hostels.length > 0 ? (
            hostels.map((hostel) => (
              <div className="text-white text-center" key={hostel._id}>
                {loading ? (
                  <section className="flex items-center justify-center w-44 m-auto h-44">
                    <HashLoader color="#18428f" className="m-[50%]" />
                  </section>
                ) : (
                  <section className="flex items-center justify-center">
                    <img
                      src={hostel.firstImageUrl}
                      alt={hostel.name}
                      className=" rounded-tr-lg rounded-tl-lg w-full h-44 object-fill"
                    />
                  </section>
                )}

                <section className="flex flex-col items-center gap-y-2 bg-[#18428f] p-2 rounded-bl-lg rounded-br-lg">
                  <h2 className="font-semibold text-2xl">{hostel.name}</h2>
                  <p>{hostel.location}</p>
                  <button
                    onClick={() =>
                      handleLearnMore(
                        hostel._id,
                        `${window.location.pathname}${hostel._id}`
                      )
                    }
                  >
                    <i>
                      <Link className="flex flex-row text-[#466d7d]">
                        Learn More
                        <GrLinkNext className="my-[5px]" />
                      </Link>
                    </i>
                  </button>
                </section>
              </div>
            ))
          ) : (
            <p>No hostels available</p>
          )
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Part2;
