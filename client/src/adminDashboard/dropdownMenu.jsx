import { useState } from "react";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

const DropdownMenu = ({ pages, navigate, user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-200"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
        >
          Admin
        </button>
      </div>

      {isDropdownOpen && (
        <div
          className="absolute right-0 mt-2 bg-black border border-gray-300 rounded-md shadow-lg w-32"
          onClick={closeDropdown}
        >
          <div className="py-1">
            {pages.map(({ title, icons, path }) => (
              <Link
                key={title}
                to={path}
                className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-slate-700 duration-500"
              >
                {icons && <span className="mr-2">{icons}</span>}
                {title}
              </Link>
            ))}
            <Link
              to="/"
              className="flex px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-slate-700 duration-500 border-t-2"
              onClick={() => {
                navigate("/");
                closeDropdown();
              }}
            >
              <span className="mr-2">
                <BiLogOut />
              </span>
              Return
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
