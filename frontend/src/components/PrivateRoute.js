import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    // If no token, redirect to login page
    if (!token) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;
