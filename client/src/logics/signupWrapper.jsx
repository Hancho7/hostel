import SignUp from "../pages/signUp";
import {  useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../features/logs/signupSlice";

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
  const [error, setError] = useState("");

  const { firstName, lastName, email, phone, password, repassword } =
    formValues;

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== repassword) {
      setError("passwords do not match");
    } else {
      dispatch(signup({ firstName, lastName, email, phone, password }));
    }
  };
  return (
    <>
      <SignUp onChange={onChange} onSubmit={onSubmit} error={error} />
    </>
  );
}
