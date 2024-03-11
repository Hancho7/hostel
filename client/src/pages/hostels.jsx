import { useDispatch, useSelector } from "react-redux";
import { NavBarLayout } from "../components/Layouts";
import { CiSearch } from "react-icons/ci";
import { allHostelsForUserAction } from "../features/hostels/getAllHostelsForUser";
import { useEffect } from "react";
import Cliploader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
function Hostels() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, success, loading } = useSelector(
    (state) => state.allHostelsForUser
  );
  console.log("Data", data);

  useEffect(() => {
    dispatch(allHostelsForUserAction());
  }, [dispatch]);

  const handleHostelClick = (e, hostelID) => {
    e.preventDefault();
    navigate(`/hostels/${hostelID}`);
  };
  return (
    <NavBarLayout bgColor="#18223C">
      <div className="flex flex-col gap-y-8 p-8">
        <h1 className="text-3xl font-semibold text-center">Featured Hostels</h1>
        <div className="flex flex-row-reverse w-full">
          <div className="flex flex-row h-10">
            <input
              className="px-2 rounded-tl-sm rounded-bl-sm border-[0.5px] border-r-0 border-slate-950"
              type="text"
              placeholder="Search hostel"
            />
            <button className=" bg-[#fad505] text-white w-10 font-semibold flex items-center justify-center">
              <CiSearch />
            </button>
          </div>
        </div>

        {/* ALL HOSTELS CREATED */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
          {success ? (
            <>
              {data?.map((hostel) => {
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
                          className="rounded-md w-full h-full"
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
    </NavBarLayout>
  );
}

export default Hostels;
