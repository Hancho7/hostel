/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import signUp from "../assets/signUp.jpg";
import { useSelector } from "react-redux/es/hooks/useSelector";
import ClipLoader from "react-spinners/ClipLoader";
import { NavBarLayout } from "../components/Layouts";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import {startLogin} from "../features/logs/loginSlice"

export default function SignIn() {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues:{
      email:"",
      password: ""
    },
    onSubmit:(values)=>{
      console.log(values)
      dispatch(startLogin(values))
      
    }
  })
  const {loading, error ,message}= useSelector((state)=>state.user)
  return (
    <NavBarLayout bgColor="#18223C">
      <div className="flex flex-col-reverse gap-y-8 md:gap-y-0 md:flex-row items-center py-8 md:h-screen">
        <div className=" w-10/12 m-auto md:w-1/2">
          <form
            className="flex flex-col items-center w-full gap-3"
            onSubmit={formik.handleSubmit}
          >
            <div>
              <p className=" ">Welcome to</p>
              <h4 className="text-[#476faf] font-semibold">NICE HOME</h4>
            </div>

            <p>Login your account</p>
            {error&&(<p>{message}</p>)}
            

            {/* Taking the inputs */}
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              className="common-input"
              onChange={formik.handleChange}
            />
            <div className="flex flex-col w-10/12">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="text-[#7b7979] h-9 border-none w-auto shadow-md"
                onChange={formik.handleChange}
              />
              {!error ? (
                <></>
              ) : (
                <Link
                  className=" w-fit self-end text-right font-semibold"
                  to="/forgotten-password"
                >
                  Forgotten password?
                </Link>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              title="Submit Form"
              className="flex flex-row justify-center gap-2 w-10/12 h-10 text-white bg-[#476faf] font-semibold hover:bg-[#7a90b3]"
            >
              {loading ? (
                <ClipLoader size="1.5rem" className=" mt-auto mb-auto" />
              ) : (
                <></>
              )}
              <span className=" mt-auto mb-auto">Login</span>
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
        <div className="flex-1 flex items-center justify-center">
          <img
            className=" h-60 w-60 rounded-[50%]"
            src={signUp}
            alt="...sign-in image loading"
          />
        </div>
      </div>
    </NavBarLayout>
  );
}
