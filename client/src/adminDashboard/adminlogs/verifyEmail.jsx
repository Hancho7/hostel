import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { adminVerifyEmailAction } from "../../features/admin/verifyEmail";
import { useEffect, useState } from "react";

function VerifyEmail() {
  const { id, token } = useParams();
  const dispatch = useDispatch();
  const [buttonText, setButtonText] = useState(
    "Click here to verify your account"
  );

  const handleClick = () => {
    dispatch(adminVerifyEmailAction({ id, token }));
    console.log("id", id);
    console.log("token", token);
  };

  const { success, loading, message, code } = useSelector(
    (state) => state.adminEmailVerification
  );

  useEffect(() => {
    if (loading) {
      setButtonText("verifying...");
    } else if (success) {
      setButtonText(message);
    } else if (code === 409) {
      setButtonText(message);
    } else {
      setButtonText("Click here to verify your account");
    }
  }, [loading, success, message, code]);

  return (
    <div className="bg-[#1C2841] h-screen flex items-center justify-center">
      <div className="px-24">
        <h1 className="text-center text-white font-bold pt-6 pb-5 ">
          EMAIL VERIFICATION
        </h1>
        {success && <p>{message}</p>}
        <div className="flex flex-col mx-auto shadow-md">
          <h1 className="text-center text-white font-bold pt-6 pb-5 ">
            CLICK THE BUTTON BELOW TO VERIFY YOUR EMAIL
          </h1>

          <button
            onClick={handleClick}
            disabled={success || code === 409}
            className=" font-semibold h-11 bg-amber-500 hover:bg-amber-300"
          >
            {buttonText}
          </button>
        </div>
        {success ||
          (code === 409 && (
            <div className="my-4 hover:text-lime-600 font-semibold inline-block">
              <Link to="/admin/sign-in">click here to sign in</Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default VerifyEmail;
