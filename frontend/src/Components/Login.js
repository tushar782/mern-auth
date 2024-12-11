import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utlis'

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  }

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const { email, password } = loginInfo; // Corrected variable name
    if (!email || !password) {
      return handleError(`Email, and Password are required`);
    }

    try {
      const url = "https://mern-auth-five-beta.vercel.app/auth/login"; // Fixed typo in URL
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo), // Corrected variable name
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('toekn', jwtToken);
        localStorage.setItem('loggedInUser', name);
        setTimeout(() => {
          navigate('/home');
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
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' placeholder='Enter Email' value={loginInfo.email} onChange={handleChange}></input>
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' placeholder='Enter Name' value={loginInfo.password} onChange={handleChange}></input>
          </div>
          <div>
            <button type='submit'>Login</button>
          </div>
          <span>Don't have an account ?
            <Link to="/signup">Signup</Link>
          </span>
        </form>
        <ToastContainer></ToastContainer>
      </div>
    </div>
  )
}

export default Login
