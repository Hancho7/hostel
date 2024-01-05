/* eslint-disable react/prop-types */
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { IoIosArrowBack } from "react-icons/io";
import logo from "../assets/Logo.png";
import { FaHotel } from "react-icons/fa";
import { AiFillDelete, AiFillRead } from "react-icons/ai";
import { MdOutlineAddHome } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { BiLogOut } from "react-icons/bi";
import DropdownMenu from "./dropdownMenu.jsx";

export default function Admin() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  console.log(user);
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
      title: "Hostel",
      icons: null,
    },
    {
      title: "Add Hostel",
      icons: <FaHotel />,
      path: "/admin/create-hostel",
    },
    {
      title: "Delete",
      icons: <AiFillDelete />,
      path: "/admin/delete-hostel",
    },
    {
      title: "Read",
      icons: <AiFillRead />,
      path: "/admin/",
    },
    {
      title: "Rooms",
      icons: null,
    },
    {
      title: "Add",
      icons: <MdOutlineAddHome />,
      path: `/admin/add-rooms/${user._id}`,
    },
    // navigate(`/${hostel}`);
    {
      title: "Booking",
      icons: <TbBrandBooking />,
      path: `/admin/bookings/${user._id}`,
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
          justifyContent: "space-between",
          gap: "1rem",
          padding: "1rem",
          backgroundColor: "#E1E1E1",
        }}
      >
        <div className="hidden md:block"></div>

        <img src={logo} className=" rounded-full w-11" />
        <div className="flex justify-end gap-3">
          <h1 className=" self-center md:self-auto">{user.firstName}</h1>
          {!isSmallScreen && <div>Admin</div>}
          {isSmallScreen && (
            <DropdownMenu pages={pages} navigate={navigate} user={user} />
          )}
        </div>
      </div>

      {/* SIDEBAR */}
      <div
        className={`${
          open ? " w-60" : " w-20"
        } h-screen bg-[#E1E1E1] duration-500 p-4 md:flex flex-col justify-between hidden`}
        style={{ gridArea: "sidebar", position: "relative" }}
      >
        <IoIosArrowBack
          className={`${
            !open && "rotate-180"
          } absolute text-[#18428f] w-4 -right-3 top-7 duration-500 hover:cursor-pointer`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex items-center justify-center text-white gap-2">
          <img src={logo} className="w-8" />
          <span className={`${!open && " hidden"} duration-700 font-semibold text-[#636363]`}>
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
                className={`${
                  !open && "justify-center"
                } flex gap-x-4 py-2 px-6 items-center font-semibold rounded-md hover:bg-slate-400 active:bg-slate-400 duration-500`}
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
