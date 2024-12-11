import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utlis'

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  }

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const { name, email, password } = signupInfo; // Corrected variable name
    if (!name || !email || !password) {
      return handleError(`Name, Email, and Password are required`);
    }

    try {
      const url = "http://localhost:8080/auth/signup"; // Fixed typo in URL
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo), // Corrected variable name
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login');
        }, 1000)
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (error) {
      handleError(error.message || error); // Ensure error message is logged
    }
  };

  return (
    <div>
      <div className='container'>
      <h2>Singup</h2>
        <form onSubmit={handleSignup}>
          <div>
            <label htmlFor='name'>Name</label>
            <input type='text' name='name' autoFocus placeholder='Enter Name' value={signupInfo.name} onChange={handleChange}></input>
          </div>
          <div>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' placeholder='Enter Email' value={signupInfo.email} onChange={handleChange}></input>
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' placeholder='Enter Name' value={signupInfo.password} onChange={handleChange}></input>
          </div>
          <div>
            <button type='submit'>Signup</button>
          </div>
          <span>Already have an account ? 
            <Link to="/login">Login</Link>
          </span>
        </form>
        <ToastContainer></ToastContainer>
      </div>
    </div>
  )
}

export default Signup
