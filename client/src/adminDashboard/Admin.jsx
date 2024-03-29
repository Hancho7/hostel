/* eslint-disable react/prop-types */
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { IoIosArrowBack } from "react-icons/io";
import { MdAdminPanelSettings, MdOutlinePayment } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { FaHotel } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { GoCodeReview } from "react-icons/go";
import { GrOverview } from "react-icons/gr";
import { FaPeopleArrows } from "react-icons/fa6";
import { TfiWrite } from "react-icons/tfi";
import { PiStudentBold } from "react-icons/pi";
import { BiLogOut } from "react-icons/bi";
import DropdownMenu from "./dropdownMenu";

export default function Admin() {
  const { pathname } = useLocation();
  const { data } = useSelector((state) => state.adminSignIn);
  const navigate = useNavigate();
  console.log(data);
  const [open, setOpen] = useState(true);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleResize(); // Check on initial render

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const pages = [
    {
      title: "Overview",
      icons: <GrOverview />,
      path: "/admin/Overview",
    },
    {
      title: "Staffs",
      icons: <MdAdminPanelSettings />,
      path: "/admin/Add",
    },
    {
      title: "Rooms",
      icons: <IoAdd />,
      path: "/admin/Rooms",
    },
    {
      title: "New Hostel",
      icons: <FaHotel />,
      path: "/admin/Add-New-hostel",
    },
    {
      title: "Units",
      icons: <FaPeopleArrows />,
      path: "/admin/Unit",
    },
    {
      title: "Bookings",
      icons: <TbBrandBooking />,
      path: "/admin/Bookings",
    },
    {
      title: "Payments",
      icons: <MdOutlinePayment />,
      path: "/admin/Payments",
    },
    {
      title: "Room Allotment",
      icons: <TfiWrite />,
      path: "/admin/Room-Allotment",
    },
    {
      title: "Students",
      icons: <PiStudentBold />,
      path: "/admin/Student",
    },
    {
      title: "Review",
      icons: <GoCodeReview />,
      path: "/admin/Review",
    },
    {
      title: "",
      icons: null,
    },
    {
      title: "Profile",
      icons: <CgProfile />,
      path: "/admin/Profile",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        height: "100vh",
        gridTemplateAreas: `"sidebar header" "sidebar props"`,
        gridTemplateColumns: "auto 1fr",
        gridTemplateRows: "auto 1fr",
        color: "#636363",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          gridArea: "header",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          minHeight: "4rem",
          gap: "1rem",
          padding: "1rem",
          backgroundColor: "#E1E1E1",
        }}
      >
        <div className="flex justify-end gap-3">
          <h1
            onClick={(e) => [e.preventDefault(), navigate("/admin/Profile")]}
            className=" self-center md:self-auto hover:cursor-pointer font-semibold duration-500"
          >
            {data.name}
          </h1>
          {isSmallScreen && (
            <DropdownMenu pages={pages} navigate={navigate} user={data} />
          )}
        </div>
      </div>

      {/* SIDEBAR */}
      <div
        className={`${
          open ? " w-60" : " w-20"
        } h-screen overflow-y-auto overflow-x-hidden bg-[#E1E1E1] duration-500 p-4 md:flex flex-col justify-between hidden`}
        style={{ gridArea: "sidebar", position: "relative" }}
      >
        <IoIosArrowBack
          className={`${
            !open && "rotate-180"
          } absolute text-[#18428f] w-4 -right-3 top-7 duration-500 hover:cursor-pointer`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex items-center justify-center text-white gap-2">
          <img
            src={`${data?.newHostelLogo}`}
            className="w-11 h-11 rounded-full"
          />

          <span
            className={`${
              !open && " hidden"
            } duration-700 font-semibold text-[#636363]`}
          >
            Nice home
          </span>
        </div>

        <div>
          {pages.map(({ title, icons, path }) => {
            if (!icons) {
              return (
                <h1
                  className={`${
                    !open && "hidden"
                  } font-semibold text-lg pt-2 pb-1 px-6`}
                  key={title}
                >
                  {title}
                </h1>
              );
            }
            return (
              <Link
                key={title}
                to={path}
                className={`flex gap-x-4 py-2 px-6 items-center font-semibold rounded-md ${
                  pathname === path
                    ? "bg-slate-400"
                    : "hover:bg-slate-400 active:bg-slate-400 duration-500"
                } ${!open && "justify-center"}`}
              >
                <span>{icons}</span>
                <p className={`${!open && "hidden"} duration-500`}>{title}</p>
              </Link>
            );
          })}
        </div>

        <div
          className={`${
            !open && "justify-center"
          } flex gap-x-4 py-2 px-6 items-center font-semibold rounded-md hover:bg-slate-400 hover:cursor-pointer`}
          onClick={() => {
            navigate("/");
          }}
        >
          <span>
            <BiLogOut />
          </span>
          <p className={`${!open && "hidden"}`}>Return</p>
        </div>
      </div>

      {/* CHILDREN */}
      <div
        style={{
          gridArea: "props",
          overflow: "auto",
        }}
        className="p-4 md:p-8"
      >
        <Outlet />
      </div>
    </div>
  );
}
