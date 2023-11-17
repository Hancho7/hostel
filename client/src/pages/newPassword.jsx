import Lottie from "lottie-react";
import resetPassword from "../assets/resetPassword.json";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPasswordAction } from "../features/resetPassword/resetPassword";

function NewPassword() {
  const { id, token } = useParams();
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.name === "password") {
      setPassword(e.target.value)
    }
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log("id", id)
    console.log("token", token)
    console.log("password", password)
    dispatch(resetPasswordAction({id, token, password}))
  }

  return (
    <div className="flex items-center justify-center flex-col-reverse m-6 gap-8 md:flex-row lg:gap-24 lg:m-16">
      <h1 className=" font-semibold text-lg text-[#476faf] md:hidden">
        Reset password
      </h1>
      <section className="flex flex-col gap-5">
        <h1 className="font-semibold">Enter your new password</h1>
        <form className="flex flex-col items-center w-full gap-3" onSubmit={handleSubmit}>
          <input
            className=" px-2 common-input"
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            placeholder="New Password"
          />
          <button
            className="w-10/12 h-10 text-white bg-[#476faf] font-semibold hover:bg-[#7a90b3]"
            type="submit"
          >
            Submit
          </button>
        </form>
      </section>
      <section className="md:w-[50%]">
        <Lottie animationData={resetPassword} />
      </section>
    </div>
  );
}

export default NewPassword;
