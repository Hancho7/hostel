import Lottie from "lottie-react";
import animationOne from "../../assets/animationOne.json";
import animationTwo from "../../assets/animationTwo.json";
import animationThree from "../../assets/animationThree.json";
const Part1 = () => {
  return (
    <div className="lg:h-screen px-4 py-8 flex flex-col justify-around items-center">
      <h1 className="text-2xl lg:text-3xl lg:font-bold font-semibold">What We Offer</h1>
      <div className="md:flex md:justify-around w-full">
        <div className="flex items-center flex-col md:flex-1 my-12 md:my-0 ">
          <Lottie animationData={animationOne} className="w-[50%] border-2 rounded-[50%]" />
          <h1 className=" font-semibold text-lg">Automated bookings</h1>
        </div>
        <div className="flex items-center flex-col md:flex-1 my-12 md:my-0">
          <Lottie animationData={animationTwo} className="w-[50%] border-2 rounded-[50%] overflow-hidden" />
          <h1 className=" font-semibold text-lg">Direct contact with managers</h1>
        </div>
        <div className="flex items-center flex-col md:flex-1 my-12 md:my-0">
          <Lottie animationData={animationThree} className="w-[50%] border-2 rounded-[50%]" />
          <h1 className=" font-semibold text-lg">Mobile compatible</h1>
        </div>
      </div>
    </div>
  );
};

export default Part1;
