import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cliploader from "react-spinners/ClipLoader";
import { homePageGetHostelsAction } from "../../features/hostels/homePageHostels";
// import { addID } from "../../features/hostels/hostelID.jsx";

function Part2() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the hostel data from the Redux store
  const { success, loading, data } = useSelector(
    (state) => state.homePageHostels
  );

  // Authenticate user
  // const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(homePageGetHostelsAction());
  }, [dispatch]);

  // const handleLearnMore = (hostel, currentLocation) => {
  //   console.log("currentLocation", currentLocation);
  //   if (!user) {
  //     navigate("/sign-in", { state: { from: currentLocation } });
  //     return;
  //   }

  //   dispatch(addID(hostel));
  //   navigate(currentLocation);
  // };

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/hostels");
  };

  const handleHostelClick = (e, hostelID) => {
    e.preventDefault();
    navigate(`/hostels/${hostelID}`);
  };

  console.log("data", data);
  console.log("loading", loading);
  return (
    <div className="flex flex-col justify-around py-12 px-6 min-h-screen">
      <h1 className="font-bold text-3xl mb-6 text-center">Featured Hostels</h1>
      <div className="flex flex-col gap-y-4">
        <button
          onClick={handleClick}
          className=" bg-amber-600 self-end transition duration-300 hover:bg-amber-400 w-fit font-semibold py-3 px-8 rounded-sm"
        >
          See more
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
          {/* {!error ? (
            hostels && hostels.length > 0 ? (
              hostels.map((hostel) => (
                <div
                  className="text-white text-center hover:cursor-pointer"
                  onClick={handleLearnMore(
                    hostel._id,
                    `${window.location.pathname}${hostel._id}`
                  )}
                  key={hostel._id}
                >
                  {loading ? (
                    <section className="flex items-center justify-center w-44 m-auto h-44">
                      <HashLoader color="#18428f" className="m-[50%]" />
                    </section>
                  ) : (
                    <section className="flex items-center justify-center">
                      <img
                        src={hostel.firstImageUrl}
                        alt={hostel.name}
                        className="rounded-md w-full h-44 object-fill"
                      />
                    </section>
                  )}

                  <section className="flex flex-col items-center gap-y-2 p-2 rounded-bl-lg rounded-br-lg">
                    <h2 className="font-bold text-black text-2xl">
                      {hostel.name}
                    </h2>
                    <p className=" text-[#535353c8f]">{hostel.location}</p>
                  </section>
                </div>
              ))
            ) : (
              <p>No hostels available</p>
            )
          ) : (
            <div></div>
          )} */}

          {success ? (
            <>
              {data.map((hostel) => {
                // Add curly braces here
                return (
                  // Add return statement here
                  <div
                    key={hostel._id}
                    onClick={(e) => handleHostelClick(e, hostel._id)}
                    className="hover:cursor-pointer"
                  >
                    <section>
                      {loading ? (
                        <section className="flex items-center justify-center h-56">
                          <Cliploader className=" text-[]" />
                        </section>
                      ) : (
                        <img
                          src={hostel.firstImageUrl}
                          alt={hostel.name}
                          className="rounded-md w-full"
                        />
                      )}
                    </section>
                    <section className="flex flex-col items-center">
                      <h1 className=" text-lg font-medium">{hostel.name}</h1>
                      <p className=" text-xl font-semibold">{hostel.address}</p>
                    </section>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="h-screen">
              No Hostels Available At The Moment...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Part2;
