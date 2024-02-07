import { NavBarLayout } from "../components/Layouts";
import { CiSearch } from "react-icons/ci";
function Hostels() {
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
        <div>No hostels yet</div>
      </div>
      \
    </NavBarLayout>
  );
}

export default Hostels;
