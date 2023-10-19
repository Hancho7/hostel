import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {  startLogin } from '../features/logs/loginSlice.jsx';
import SignIn from "../pages/signIn.jsx";
import { addID } from "../features/hostels/hostelID.jsx";

export default function LoginWrapper() {
  const location = useLocation()
  const user = useSelector(state=> state.user.user)
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const error = useSelector(state=>state.user.error)
  const hostelID = useSelector(state=>state.hostelID.id)

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password }; // Create a payload with email and password
    dispatch(startLogin(userData)); // Dispatch loginSuccess with payload
    if(!user){
      console.log('error')
    }
    console.log("location state from",location.state?.from)
    if(location.state?.from){
      navigate(location.state.from)
    }  else if(hostelID) {
      // If there is a selected hostel ID, navigate to the corresponding hostel detail page
      navigate(`/hostel/${hostelID}`);
      // Reset the selected hostel to avoid redirection on future sign-ins
      dispatch(addID(null));
    }
    navigate("/")
   
  }
  console.log("hostel", hostelID)

  return (
    <>
      <SignIn
        onChange={handleChange}
        onSubmit={handleSubmit}
        error={error}
      />
    </>
  );
}
