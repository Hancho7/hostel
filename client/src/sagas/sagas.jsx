import { watchLogin } from "./logs/loginsaga";

import { watchSignup } from "./logs/signupSaga";
import { watchVerification } from "./logs/verifyEmailSaga";
import { watchEmailForResetPassword } from "./forgotten/resetEmail";
import { watchResetPassword } from "./forgotten/resetPassword";

// HOME PAGE HOSTELS
import {watchHomePageHostels} from "./hostel/homePageHostels"

//ADMIN SIGNING UP
import adminSignupSaga from "./admin/signup"
import watchAdminVerify from "./admin/verifyEmail"
import adminSignin from "./admin/signin"

// ADMIN HOSTEL MANAGEMENT
import watchAddNewHostel from "./hostel/addNewHostel";

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

    // HOME PAGE HOSTELS
    watchHomePageHostels()
  ]