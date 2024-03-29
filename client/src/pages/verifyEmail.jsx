import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { verify } from "../features/logs/verifyEmail";
import Lottie from "lottie-react";
import animationData from "../assets/correct.json";
import loadingGif from "../assets/loading.json";

function EmailVerification() {
  const { id, token } = useParams();
  console.log("user id", id);
  console.log("token", token);
  const dispatch = useDispatch();
  const { message,  loading, success, error} = useSelector((state) => state.verification);

  useEffect(() => {
    // Dispatch the `verify` action with id and token to initiate email verification
    dispatch(verify({ id, token }));
  }, [dispatch, id, token]);


  return (
    <div>
      {loading && (
        <div className="flex flex-col justify-center items-center w-[80%] my-40 mr-auto ml-auto bg-[#f0f8ff]">
          <Lottie size={20} animationData={loadingGif} />
          <p className=" text-2xl font-semibold">Verifying email...</p>
        </div>
      )}
      {success && (
        <div className="flex flex-col justify-center items-center w-[80%] my-40 mr-auto ml-auto bg-[#f0f8ff]">
          <Lottie size={20} color="#476faf" animationData={animationData} />
          <h1 className=" text-2xl font-semibold">
            {message}
          </h1>
          <h2 className=" text-xl font-semibold text-[#476faf]">
            <Link to="/sign-in">sign in</Link>
          </h2>
        </div>
      )}
      {error && <p>{message}</p>}
    </div>
  );
}

export default EmailVerification;
