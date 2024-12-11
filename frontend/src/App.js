import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import { useState } from 'react';
import RefreshHandler from './Components/RefreshHandler';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }
  return (
    <Router>
      <div className="App">
        <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
        <Routes>
          {/* Redirect root path to login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Signup Route */}
          <Route path="/signup" element={<Signup />} />

          {/* Home Route */}
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
