import Lottie from "lottie-react";
import resetEmail from "../assets/resetEmail.json";
import { forgottenEmail } from "../features/resetPassword/resetEmail";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

function ResetEmail() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const loading = useSelector((state) => state.email.loading);
  // const emailSuccess = useSelector((state) => state.email.emailSentSuccessfull);

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    console.log(email);
    e.preventDefault();
    dispatch(forgottenEmail({ email }));
  };

  return (
    <div className="flex items-center justify-center flex-col m-6 gap-8 md:flex-row lg:gap-24 lg:m-16">
      <h1 className=" font-semibold text-lg text-[#476faf] md:hidden">
        Reset password
      </h1>
      <section className="flex flex-col gap-5">
        <h1 className="font-semibold">Enter your email to reset password</h1>
        <form
          className="flex flex-col items-center w-full gap-3"
          onSubmit={handleSubmit}
        >
          
          <input
            className=" px-2 common-input"
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            placeholder="Enter your email"
          />
          <button
            
            className={`flex items-center justify-center gap-2 w-10/12 h-10 text-white bg-[#476faf] font-semibold hover:bg-[#7a90b3]`}
            type="submit"
          >
            {loading ? (
              <ClipLoader size="1.5rem" className=" mt-auto mb-auto" />
            ) : (
              <></>
            )}
            <span>Submit</span>
          </button>
        </form>
      </section>
      <section>
        <Lottie animationData={resetEmail} />
      </section>
    </div>
  );
}

export default ResetEmail;
