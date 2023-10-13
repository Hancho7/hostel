/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import signUpImg from "../assets/signIn.png";
import { useSelector } from "react-redux/es/hooks/useSelector";
import animationData from "../assets/correct.json";
import loadingGif from "../assets/loading.json";
import Lottie from "lottie-react";

export default function SignUp({ onSubmit, onChange, error }) {
  const loading = useSelector((state) => state.signup.loading);
  const user = useSelector((state) => state.signup.user);
  return (
    <div className="flex items-center mt-6 mb-6">
      <div className=" w-10/12 m-auto md:w-1/2">
        {loading && (
          <div className="flex flex-col bg-[rgba(240,248,255,0.7)] items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 px-8">
            <Lottie className=" w-40" animationData={loadingGif} size={20} />
            <p className=" font-semibold">Sending E-mail for verification</p>
          </div>
        )}
        {user === "checkEmail" && (
          <div className="flex flex-col bg-[rgba(240,248,255,0.7)] items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <Lottie className=" w-48" animationData={animationData} />
            <p className=" font-semibold">Please proceed to check your email for verification </p>
          </div>
        )}
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center w-full gap-3"
        >
          <div>
            <p className=" ">Welcome to</p>
            <h4 className="text-[#476faf] font-semibold">NICE HOME</h4>
          </div>

          <p>Create your account</p>
          {/* Taking the inputs */}
          <input
            type="text"
            id="firstName" // Added id attribute
            name="firstName" // Added name attribute
            placeholder="First Name"
            className="common-input"
            onChange={onChange}
          />
          <input
            type="text"
            id="lastName" // Added id attribute
            name="lastName" // Added name attribute
            placeholder="Last Name"
            className="common-input"
            onChange={onChange}
          />
          <input
            type="email"
            id="email" // Added id attribute
            name="email" // Added name attribute
            placeholder="Email Address"
            className="common-input"
            onChange={onChange}
          />
          <input
            type="tel"
            id="phone" // Added id attribute
            name="phone" // Added name attribute
            placeholder="Telephone Number"
            className="common-input"
            onChange={onChange}
          />
          <input
            type="password"
            id="password" // Added id attribute
            name="password" // Added name attribute
            placeholder="Password"
            className="common-input"
            onChange={onChange}
          />
          <input
            type="password"
            id="repassword" // Added id attribute
            name="repassword" // Added name attribute
            placeholder="Confirm Password"
            className="common-input"
            onChange={onChange}
          />
          <div>{error}</div>
          <button
            type="submit"
            className="w-10/12 h-10 text-white bg-[#476faf] font-semibold hover:bg-[#7a90b3]"
          >
            
            Sign Up
          </button>
          <div className="w-10/12 mt-8">
            <p>
              Already have an account?{" "}
              <Link to="/sign-in" className="text-[#476faf]">
                Login
              </Link>
            </p>
            <p>
              Click "Sign Up" to agree to Nice Home's Terms of Services and
              acknowledge that Nice Home's Privacy Policy applies to you.
            </p>
          </div>
        </form>
      </div>
      <div className="hidden md:block md:w-1/2">
        <img src={signUpImg} alt="...sign-up image loading" />
      </div>
    </div>
  );
}
