import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect, useLayoutEffect } from "react";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";

const Login = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [receivedMessage, setReceivedMessage] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();

    /*useLayoutEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        console.log("Token: "+token)
        if (token) {
            navigate('/home');
        }
        
    }, []);*/

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const response = await axios.post('http://127.0.0.1:5000/login', { email, password });
            setMessage(response.data.message);
            const access_token = response.data.accessToken;
          
            if (rememberMe) {
                localStorage.setItem('token', access_token);
            } else {
                sessionStorage.setItem('token', access_token);
            }

            navigate('/home')

        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };


    return ( 
        <div className="wrapper">
            <form onSubmit={handleLogin}>
                <h1>Sign in</h1>
                <div className="input-box">
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <MdEmail className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <FaLock className="icon"/>
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}/>Remember me</label>
                    <Link to="/reset-password">Forgot password?</Link>
                </div>
                <button type="submit">Login</button>
                <div className="register-link">
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </div>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {receivedMessage && <p style={{ color: 'green' }}>{receivedMessage}</p>}
        </div>
     );
}
 
export default Login;