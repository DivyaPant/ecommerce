import {InputField, CustomButton} from "../../components/Common/FormField";
import { useState } from "react";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router";
import {handleSignUp, handleProfileUpdate} from "../../utils/authHelpers";
import { useSelector } from "react-redux";
import { useEffect } from "react";


const SignUp = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state=> state.auth.isLoggedIn);

  const [inputVal, setInputVal] = useState({
    email: '',
    password: '',
    displayName:''
  });

   useEffect(()=>{
      if(isLoggedIn) {
        profileUpdate();
      }
    }, [isLoggedIn]);
  
    const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputVal((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleFormSubmit = ()=> {
    handleSignUp(inputVal.email, inputVal.password);
  }
  
  const profileUpdate = () => {
  handleProfileUpdate(inputVal.displayName).then((resp)=> {
     navigate("/");
    console.log("Profile updated successfully:", resp);
  }).catch((err)=> {
    console.error("Error updating profile:", err);
  })
  };

  return (
    <>
      <div className="mb-8">
      <h3 className="text-2xl font-bold text-primary-text">Create Your Account</h3>
      </div>
      {/* Form */}
      <Box 
      component="form"
      noValidate
      autoComplete="off"
      >
<InputField name='displayName' label='Name' type='text' value={inputVal.displayName} onChange={handleOnChange}/>
          <InputField name='email' label='Email' type='email' value={inputVal.email} onChange={handleOnChange}/>
          <InputField name='password' label='Password' type='password' value={inputVal.password} onChange={handleOnChange}/>
          <CustomButton label="Sign Up"
          onClick={handleFormSubmit}
          sx={{
            marginTop: '1rem'
          }}/>

      </Box>

      <div className="mt-8">
        <p className="text-md text-secondary-text">Already have an account? 
          <Link to="/login" className="text-brand-dark underline ml-0.5">Log In</Link></p>
      </div>
    </>
  )
}


export default SignUp;