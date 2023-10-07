/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import signUpImg from "../assets/signIn.png";
import { useSelector } from "react-redux/es/hooks/useSelector";
import ClipLoader from "react-spinners/ClipLoader"

export default function SignIn({ onSubmit, onChange, error }) {
  const loading = useSelector(state=> state.user.loading)
  return (
    <div className="flex items-center mt-6 mb-6">
      <div className=" w-10/12 m-auto md:w-1/2">
        <form
          className="flex flex-col items-center w-full gap-3"
          onSubmit={onSubmit}
        >
          <div>
            <p className=" ">Welcome to</p>
            <h4 className="text-[#476faf] font-semibold">NICE HOME</h4>
          </div>

          <p>Login your account</p>

          {/* Taking the inputs */}
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            className="common-input"
            onChange={onChange}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="common-input"
            onChange={onChange}
          />

          {/* ERROR IF ANY */}
          <p>{error}</p>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            title="Submit Form"
            className="flex flex-row justify-center gap-2 w-10/12 h-10 text-white bg-[#476faf] font-semibold hover:bg-[#7a90b3]"
          >
            {loading? <ClipLoader size='1.5rem'/>: <></>}
            Login
          </button>

          <div className="w-10/12 mt-8">
            <p>
              Don't have an account{" "}
              <Link to="/sign-up" className="text-[#476faf]">
                Sign Up
              </Link>
            </p>
            <p>Click "Login" to agree to access your hostels</p>
          </div>
        </form>
      </div>
      <div className="hidden md:block md:w-1/2">
        <img src={signUpImg} alt="...sign-up image loading" />
      </div>
    </div>
  );
}
