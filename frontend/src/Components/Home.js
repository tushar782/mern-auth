import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import { handleSuccess } from '../utlis';

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  }, [])
  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logout Successfully!');
    setTimeout(() => {
      navigate('/login');
    }, 3000)
  }

  return (
    <div>
      <h2>{loggedInUser}</h2>
      <button onClick={handleLogout}>Logout</button>
      <ToastContainer></ToastContainer>
    </div>
  )
}

export default Home
