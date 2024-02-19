// AUTHENTICATION AND LOGIN
export const LOGIN = "/student-logs/sign-in";
export const SIGNUP = "/student-logs/sign-up";
export const VERIFY_EMAIL = "/student-logs/verify-your-email";

// RESETTING PASSWORD AND EMAIL
export const ENTEREMAIL = "/forgotten-password";
export const NEWPASSWORD = "/forgotten-password/id/verify/token";

// MANAGING COMMENTS
export const CREATECOMMENTS = "/create-comments";
export const READCOMMENTS = "/read-comments";

// MANAGING HOSTELS
export const ADDNEWHOSTEL = "/admin/hostel/add-new-hostel";
export const ADMINHOSTELNAMES = "/admin/hostel/get-admin-hostel-names";
export const HOMEPAGEHOSTEL = "/student-hostel/get-hostels-for-homepage";
export const USERSPECIFICHOSTELDETAIL = "/student-hostel/get-specific-hostel";
export const USERSPECIFICHOSTELIMAGES = "/student-hostel/get-specific-hostel-images";
export const ALLHOSTELS = "/student-hostel/get-all-hostels";

// ROOM MANAGMENT
export const ADDROOMS = "/admin/hostel/room/add";
export const BOOKING = "/hostelRoom/book-room";
export const GETBOOKING = "/hostelRoom/get-bookings"; //ADMIN GETTINGS BOOKINGS
export const GETUSERBOOKING = "/hostelRoom/user-bookings";

// ADMIN HOSTELS
export const ADMINHOSTELS = "/admin/add-rooms";
export const ADMINSIGNUP = "/admin/sign-up";
export const ADMINSIGNIN = "/admin/sign-in";
export const ADMINVERIFYEMAIL = "/admin/verifying-your-email";
