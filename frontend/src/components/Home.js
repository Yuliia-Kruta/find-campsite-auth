import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';

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

        axios.get(`${API_BASE_URL}/home`, {
            headers: {
                Authorization: `Bearer ${token}`  
            }
        })
        .then(response => {
            setMessage(response.data.message);  
        })
        .catch(err => {
            setError('Failed to authenticate.');
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            navigate('/login');
        });

    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        navigate('/');  
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="home">
            <h3>{message}</h3>
            <button className="home-button" onClick={handleLogout}>Logout</button>
        </div>
    )
}
 
export default Home;