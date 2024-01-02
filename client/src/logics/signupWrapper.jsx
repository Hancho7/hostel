import SignUp from "../pages/signUp";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../features/logs/signupSlice";

const FIRSTNAME_REGEX = /^[A-z]{3,23}$/;
const LASTNAME_REGEX = /^[A-z]{3,23}$/;
const EMAIL_REGEX = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9\-]+)\.([a-zA-Z]{2,4})$/;
const PHONE_REGEX = /^0[2-9]\d{8}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
export default function SignUpWrapper() {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    repassword: "",
  });
  

  const [validateFirstname, setValidateFirstname] = useState(false);
  const [firstnameFocus, setFirstnameFocus] = useState(false);

  const [validateLastname, setValidateLastname] = useState(false);
  const [lastnameFocus, setLastnameFocus] = useState(false);

  const [validateEmail, setValidateEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [validatePhone, setValidatePhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  const [validatePassword, setValidatePassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setmatchPassword] = useState(false);
  const [matchPasswordFocus, setmatchPasswordFocus] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  const { firstName, lastName, email, phone, password, repassword } =
    formValues;

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };



  useEffect(() => {
    const result = FIRSTNAME_REGEX.test(firstName);
    console.log(result);
    console.log(firstName);
    setValidateFirstname(result);
  }, [firstName]);

  useEffect(() => {
    const result = LASTNAME_REGEX.test(lastName);
    console.log(result);
    console.log(lastName);
    setValidateLastname(result);
  }, [lastName]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidateEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PHONE_REGEX.test(phone);
    console.log(result);
    console.log(phone);
    setValidatePhone(result);
  }, [phone]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidatePassword(result);
    const match = password === repassword;
    setmatchPassword(match);
  }, [password, repassword]);

  useEffect(() => {
    setErrorMsg("");
  }, [firstName, lastName, phone, password, repassword, email]);

  const onSubmit = (e) => {
    e.preventDefault();
    const v1 = FIRSTNAME_REGEX.test(firstName);
    const v2 = LASTNAME_REGEX.test(lastName);
    const v3 = EMAIL_REGEX.test(email);
    const v4 = PHONE_REGEX.test(phone);
    const v5 = PASSWORD_REGEX.test(password);
    if (!v1 || !v2 || !v3 || !v4 || !v5) {
      setErrorMsg("Please fill out all fields correctly");
      return;
    } else {
      dispatch(signup({ firstName, lastName, email, phone, password }));
    }
  };
  return (
    <>
      <SignUp
        onChange={onChange}
        onSubmit={onSubmit}
        error={errorMsg}
        userRef={useRef}
        firstName={firstName}
        lastName={lastName}
        email={email}
        phone={phone}
        password={password}
        repassword={repassword}
        // VALIDATING ENTRIES
        validateFirstname={validateFirstname}
        validateLastname={validateLastname}
        validateEmail={validateEmail}
        validatePhone={validatePhone}
        validatePassword={validatePassword}
        matchPassword={matchPassword}
        // PUTTING FOCUS ON ENTRIES
        firstnameFocus={firstnameFocus}
        lastnameFocus={lastnameFocus}
        emailFocus={emailFocus}
        phoneFocus={phoneFocus}
        passwordFocus={passwordFocus}
        matchPasswordFocus={matchPasswordFocus}
        setFirstnameFocus={setFirstnameFocus}
        setLastnameFocus={setLastnameFocus}
        setEmailFocus={setEmailFocus}
        setPhoneFocus={setPhoneFocus}
        setPasswordFocus={setPasswordFocus}
        setmatchPasswordFocus={setmatchPasswordFocus}
      />
    </>
  );
}
