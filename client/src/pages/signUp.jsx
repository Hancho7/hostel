/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { FaCircleInfo } from "react-icons/fa6";
import signUpImg from "../assets/signIn.png";
import { useSelector } from "react-redux/es/hooks/useSelector";
import animationData from "../assets/correct.json";
import loadingGif from "../assets/loading.json";
import Lottie from "lottie-react";
import ClipLoader from "react-spinners/ClipLoader";

export default function SignUp({
  onSubmit,
  onChange,
  error,
  firstName,
  lastName,
  email,
  phone,
  password,
  repassword,
  errRef,
  // VALIDATING ENTRIES
  validateFirstname,
  validateLastname,
  validateEmail,
  validatePhone,
  validatePassword,
  matchPassword,

  // PUTTING FOCUS ON ENTRIES
  firstnameFocus,
  lastnameFocus,
  emailFocus,
  phoneFocus,
  passwordFocus,
  matchPasswordFocus,
  setFirstnameFocus,
  setLastnameFocus,
  setEmailFocus,
  setPhoneFocus,
  setPasswordFocus,
  setmatchPasswordFocus,
}) {
  const loading = useSelector((state) => state.signup.loading);
  const user = useSelector((state) => state.signup.user);

  return (
    <div className="flex items-center mt-6 mb-6">
      {loading && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(5px)",
            zIndex: "49",
          }}
        ></div>
      )}
      <div className=" w-10/12 m-auto md:w-1/2">
        {loading && (
          <div className="flex flex-col bg-[rgba(240,248,255,0.7)] items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 px-8">
            <Lottie className=" w-40" animationData={loadingGif} size={20} />
            <p className=" font-semibold">Sending E-mail for verification</p>
          </div>
        )}
        {user === "checkEmail" &&
          setTimeout(() => {
            <div className="flex flex-col bg-[rgba(240,248,255,0.7)] items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
              <Lottie className="w-48" animationData={animationData} />
              <p className="font-semibold">
                Please proceed to check your email for verification
              </p>
            </div>;
          }, 5000)}
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center w-full gap-3"
        >
          <div>
            <p className=" ">Welcome to</p>
            <h4 className="text-[#476faf] font-semibold">NICE HOME</h4>
          </div>

          <p>Create your account</p>
          <p
            ref={errRef}
            className={error ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {error}
          </p>
          {/* Taking the inputs */}
          <input
            type="text"
            id="firstName" // Added id attribute
            name="firstName" // Added name attribute
            required
            autoComplete="off"
            placeholder="First Name"
            className="common-input"
            onChange={onChange}
            aria-invalid={validateFirstname ? "false" : "true"}
            aria-describedby="firstnameNote"
            onFocus={() => setFirstnameFocus(true)}
            onBlur={() => setFirstnameFocus(false)}
          />
          <p
            id="firstnameNote"
            className={
              firstnameFocus && firstName && !validateFirstname
                ? "text-xs rounded-md bg-[#f7db4e] text-white p-1 relative px-8"
                : "absolute left-[-9999px]"
            }
          >
            <FaCircleInfo />
            4 to 24 characters. <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>

          <input
            type="text"
            id="lastName" // Added id attribute
            name="lastName" // Added name attribute
            placeholder="Last Name"
            autoComplete="off"
            required
            className="common-input"
            onChange={onChange}
            aria-invalid={validateLastname ? "false" : "true"}
            aria-describedby="lastnameNote"
            onFocus={() => setLastnameFocus(true)}
            onBlur={() => setLastnameFocus(false)}
          />
          <p
            id="lastnameNote"
            className={
              lastnameFocus && lastName && !validateLastname
                ? "text-xs rounded-md bg-[#f7db4e] text-white p-1 relative "
                : "absolute left-[-9999px]"
            }
          >
            <FaCircleInfo />
            4 to 24 characters. <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>
          <input
            type="email"
            required
            id="email" // Added id attribute
            name="email" // Added name attribute
            placeholder="Email Address"
            className="common-input"
            autoComplete="off"
            onChange={onChange}
            aria-invalid={validateEmail ? "false" : "true"}
            aria-describedby="emailnote"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          <p
            id="emailnote"
            className={
              emailFocus && email && !validateEmail
                ? "text-xs rounded-md bg-[#f7db4e] text-white p-1 relative "
                : "absolute left-[-9999px]"
            }
          >
            <FaCircleInfo />
            email must be legit
            <br />
            For email verification link
          </p>
          <input
            type="tel"
            id="phone" // Added id attribute
            name="phone" // Added name attribute
            placeholder="Telephone Number"
            className="common-input"
            required
            autoComplete="off"
            onChange={onChange}
            aria-invalid={validatePhone ? "false" : "true"}
            aria-describedby="phonenote"
            onFocus={() => setPhoneFocus(true)}
            onBlur={() => setPhoneFocus(false)}
          />
          <p
            id="phonenote"
            className={
              phoneFocus && phone && !validatePhone
                ? "text-xs rounded-md bg-[#f7db4e] text-white p-1 relative "
                : "absolute left-[-9999px]"
            }
          >
            <FaCircleInfo />
            phone number must start with 0<br />
            Must be 10 in total
          </p>
          <input
            type="password"
            id="password" // Added id attribute
            name="password" // Added name attribute
            placeholder="Password"
            className="common-input"
            required
            autoComplete="off"
            onChange={onChange}
            aria-invalid={validatePassword ? "false" : "true"}
            aria-describedby="passwordnote"
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
          />
          <p
            id="passwordnote"
            className={
              passwordFocus && password && !validatePassword
                ? "text-xs rounded-md bg-[#f7db4e] text-white p-1 relative "
                : "absolute left-[-9999px]"
            }
          >
            <FaCircleInfo />
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters:{" "}
            <span aria-label="exclamation mark">!</span>{" "}
            <span aria-label="at symbol">@</span>{" "}
            <span aria-label="hashtag">#</span>{" "}
            <span aria-label="dollar sign">$</span>{" "}
            <span aria-label="percent">%</span>
          </p>
          <input
            type="password"
            id="repassword" // Added id attribute
            name="repassword" // Added name attribute
            placeholder="Confirm Password"
            className="common-input"
            required
            onChange={onChange}
            aria-invalid={matchPassword ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setmatchPasswordFocus(true)}
            onBlur={() => setmatchPasswordFocus(false)}
          />
          <p
            id="confirmnote"
            className={
              matchPasswordFocus && !repassword
                ? "text-xs rounded-md bg-[#f7db4e] text-white p-1 relative "
                : "absolute left-[-9999px]"
            }
          >
            <FaCircleInfo />
            Must match the first password input field.
          </p>
          <div>{error}</div>
          <button
            disabled={
              !validateFirstname ||
              !validateLastname ||
              !validateEmail ||
              !validatePhone ||
              !validatePassword ||
              !matchPassword
                ? true
                : false
            }
            type="submit"
            className="w-10/12 h-10 gap-2 text-white bg-[#476faf] font-semibold hover:bg-[#7a90b3]"
          >
            {loading ? (
              <ClipLoader size="1.5rem" className=" mt-auto mb-auto" />
            ) : (
              <></>
            )}
            <span className=" mt-auto mb-auto">Sign Up</span>
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
