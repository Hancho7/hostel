/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import signUpImg from "../assets/signIn.png";
import { useSelector } from "react-redux/es/hooks/useSelector";
import ClipLoader from "react-spinners/ClipLoader"

export default function SignUp({onSubmit, onChange, error}) {
  const loading = useSelector(state=> state.signup.loading)
  return (
    <div className="flex items-center mt-6 mb-6">
      <div className=" w-10/12 m-auto md:w-1/2">
        <form onSubmit={onSubmit}
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
            id="firstName"  // Added id attribute
            name="firstName"  // Added name attribute
            placeholder="First Name"
            className="common-input"
            onChange={onChange}
            
          />
          <input
            type="text"
            id="lastName"  // Added id attribute
            name="lastName"  // Added name attribute
            placeholder="Last Name"
            className="common-input"
            onChange={onChange}
            
          />
          <input
            type="email"
            id="email"  // Added id attribute
            name="email"  // Added name attribute
            placeholder="Email Address"
            className="common-input"
            onChange={onChange}
            
          />
          <input
            type="tel"
            id="phone"  // Added id attribute
            name="phone"  // Added name attribute
            placeholder="Telephone Number"
            className="common-input"
            onChange={onChange}
            
          />
          <input
            type="password"
            id="password"  // Added id attribute
            name="password"  // Added name attribute
            placeholder="Password"
            className="common-input"
            onChange={onChange}
            
          />
          <input
            type="password"
            id="repassword"  // Added id attribute
            name="repassword"  // Added name attribute
            placeholder="Confirm Password"
            className="common-input"
            onChange={onChange}
            
          />
          <div>{error}</div>
          <button
            type="submit"
            className="flex flex-row justify-center gap-2 w-10/12 h-10 text-white bg-[#476faf] font-semibold hover:bg-[#7a90b3]"
          >
            {loading? <ClipLoader size='1.5rem'/>: <></>}
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
