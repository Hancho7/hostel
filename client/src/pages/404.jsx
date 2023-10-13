import Lottie from "lottie-react";
import notFound from "../assets/notFound.json";
import { AiOutlineHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const Navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row items-center m-9">
      <div>
        <h1 className=" font-bold text-3xl text-[#de0758] lg:text-5xl">OH NO</h1>
        <h1 className=" font-semibold text-xl text-[#de0758] lg:text-3xl">
          SEEMS THE PAGE YOU ARE LOOKING FOR DOES NOT HAVE A HOME HERE
        </h1>
        <h1 className="flex items-center gap-3 ">
          <span className="font-semibold text-xl text-[#de0758] lg:text-3xl">RETURN</span>
          <button
            className="flex items-center bg-[#476faf] h-8 w-24 justify-center gap-1 rounded font-bold text-white hover:bg-[#7a95c7] lg:h-12 lg:w-32"
            onClick={() => Navigate("/")}
          >
            <AiOutlineHome className="" />
            HOME
          </button>
        </h1>
      </div>

      <div>
        <Lottie className="w-full" animationData={notFound} />
      </div>
    </div>
  );
};

export default NotFound;
