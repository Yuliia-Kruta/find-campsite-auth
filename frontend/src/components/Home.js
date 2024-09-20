import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (!token) {
            setError('No token found. Please log in.');
            navigate('/');
            return;
        }

        // Send the request to authenticate with the token
        axios.get('http://127.0.0.1:5000/home', {
            headers: {
                Authorization: `Bearer ${token}`  // Attach the JWT token
            }
        })
        .then(response => {
            setMessage(response.data.message);  // Set the success message
        })
        .catch(err => {
            setError('Failed to authenticate.');
            // If authentication fails, remove the token and redirect to login
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            navigate('/login');
        });

        // Handle back button (popstate event)
        const handlePopState = () => {
            // Remove token and navigate to login when back button is clicked
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            navigate('/login');  // Redirect to login after session ends
        };

        window.addEventListener('popstate', handlePopState);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [navigate]);

    /*useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (!token) {
            setError('No token found. Please log in.');
            return;
        }

        axios.get('http://127.0.0.1:5000/home', {
            headers: {
                Authorization: `Bearer ${token}`  // Attach the JWT token
            }
        })
        .then(response => {
            setMessage(response.data.message);
        })
        .catch(err => {
            setError('Failed to authenticate.');
        });
    }, []);*/

    if (error) {
        return <div>{error}</div>;
    }

    return <div className="home">{message}</div>;
}
 
export default Home;