import { watchLogin } from "./logs/loginsaga";

import { watchSignup } from "./logs/signupSaga";
import { watchVerification } from "./logs/verifyEmailSaga";
import { watchEmailForResetPassword } from "./forgotten/resetEmail";
import { watchResetPassword } from "./forgotten/resetPassword";

// HOME PAGE HOSTELS
import { watchHomePageHostels } from "./hostel/homePageHostels";

//ADMIN SIGNING UP
import adminSignupSaga from "./admin/signup";
import watchAdminVerify from "./admin/verifyEmail";
import adminSignin from "./admin/signin";

// ADMIN HOSTEL MANAGEMENT
import watchAddNewHostel from "./hostel/addNewHostel";
import { watchNamesOfhostelsForAdmin } from "./hostel/nameOfHostelForAdmin";

// USER REQUESTING SPECIFIC HOSTEL DETAILS
import { watchUserFetchHostelDetail } from "./hostel/specificHostelDetail";

export const sagas = [
  // AUTHENTICATION
  watchLogin(),
  watchSignup(),
  watchVerification(),

  // RESET PASSWORD MANAGEMENT
  watchEmailForResetPassword(),
  watchResetPassword(),

  //ADMIN SIGNING UP
  adminSignupSaga(),
  watchAdminVerify(),
  adminSignin(),

  // ADMIN HOSTEL MANAGEMENT
  watchAddNewHostel(),
  watchNamesOfhostelsForAdmin(),

  // HOME PAGE HOSTELS
  watchHomePageHostels(),

  // USER REQUESTING SPECIFIC HOSTEL DETAILS
  watchUserFetchHostelDetail(),
];
