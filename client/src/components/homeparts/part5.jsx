import {  useRef } from "react";
import { useTransition, animated } from "react-spring";
import "./part.css"

function Part5() {
  const stepRef = useRef();

  const transitions = useTransition(true, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <div className=" min-h-screen bg-[#18223C] p-1 md:p-5 md:flex md:flex-row">
      <div className="md:flex-1 my-4 md:my-0 font-semibold self-center text-white text-2xl">Follow the steps <br/> to book the hostel of your choice</div>
      {transitions((style, item) =>
        item ? (
          <animated.div
            ref={stepRef}
            className="md:flex-1 relative flex flex-col justify-between  lg:gap-0 my-4 md:my-0"
            style={{ ...style }}
          >
            <div className="timeline"></div>
            <div className="Cont w-1/2">
              <div className=" p-8 bg-slate-400 flex gap-2 ">
                <span>1</span>
                <p>Go to the page</p>
              </div>
            </div>
            <div className="Cont w-1/2 ml-[50%]">
              <div className=" p-8 bg-slate-400 flex gap-2 ">
                <span>2</span>
                <p>Go to the page</p>
              </div>
            </div>
            <div className="Cont w-1/2">
              <div className=" p-8 bg-slate-400 flex gap-2 ">
                <span>3</span>
                <p>Go to the page</p>
              </div>
            </div>
            <div className="Cont w-1/2 ml-[50%]">
              <div className=" p-8 bg-slate-400 flex gap-2">
                <span>4</span>
                <p>Go to the page</p>
              </div>
            </div>
          </animated.div>
        ) : null
      )}
    </div>
  );
}

export default Part5;
