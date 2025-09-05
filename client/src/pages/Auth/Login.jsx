import {InputField, CustomButton} from "../../components/Common/FormField";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router";
import { handleLogin } from "../../utils/authHelpers";
import { useSelector } from "react-redux";


const Login = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state=> state.auth.isLoggedIn);
  
    useEffect(()=>{
      if(isLoggedIn) {
        navigate("/");
      }
    }, [isLoggedIn]);

  const [inputVal, setInputVal] = useState({
    email: '',
    password: ''
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputVal((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = ()=> {
    // api call here
   handleLogin(inputVal.email, inputVal.password);
  };
  
  return (
    <>
      <div className="mb-8">
      <h3 className="text-2xl font-bold text-primary-text">Sign In To Your Account</h3>
      </div>
      {/* Form */}
      <Box 
      component="form"
      noValidate
      autoComplete="off"
      >

          <InputField name='email' label='Email' type='email' value={inputVal.email} onChange={handleOnChange}/>
          <InputField name='password' label='Password' type='password' value={inputVal.password} onChange={handleOnChange}/>
          <CustomButton label="Sign In" 
          onClick={handleFormSubmit}
          sx={{
            marginTop: '1rem'
          }}/>

      </Box>

      <div className="mt-8">
        <p className="text-md text-secondary-text">Don't have an account? 
          <Link to="/register" className="text-brand-dark underline ml-0.5">Sign Up</Link></p>
      </div>
    </>
  )
}

export default Login;