import  { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RefreshHandler = (setIsAuthenticated) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthenticated(true); // Update authentication status
            if (
                location.pathname === '/' ||
                location.pathname === '/login' ||
                location.pathname === '/signup'
            ) {
                navigate('/home', { replace: true }); // Navigate to home page
            }
        }
    }, [location.pathname, navigate, setIsAuthenticated]); // Correct dependencies

    return null; // No UI rendering
};

export default RefreshHandler;
