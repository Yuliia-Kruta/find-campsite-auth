import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";


const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [useDefaultQuestion, setUseDefaultQuestion] = useState(true);
    const [securityQuestion, setSecurityQuestion] = useState("What was your first dog's name?");
    const [customSecurityQuestion, setCustomSecurityQuestion] = useState('');
    const [securityQuestionAnswer, setSecurityQuestionAnswer] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (e) => {

        e.preventDefault();
        setError('');
        setMessage('');
    
        try {
          const response = await axios.post('http://127.0.0.1:5000/register', {
            email,
            password,
            firstName,
            securityQuestion,
            securityQuestionAnswer
          });
          setMessage(response.data.message);
          sessionStorage.setItem('receivedMessage', response.data.message);
          navigate('/')
        } catch (err) {
          setError(err.response?.data?.error || 'Registration failed');
        }
    };

    const handleQuestionChange = (e) => {
        setUseDefaultQuestion(e.target.value === 'default');
        setSecurityQuestion(useDefaultQuestion ? "What is your first dog's name?" : customSecurityQuestion);
    };


    return ( 
        <div className="wrapper">
            <form onSubmit={handleRegister}>
                <h1>Sign up</h1>
                <div className="input-box">
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <MdEmail className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <FaLock className="icon"/>
                </div>
                <div className="input-box">
                    <input type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    <FaUser className="icon"/>
                </div>
                <div className="security-question-text-wrapper">
                    <h3>Security question</h3>
                    <div className="security-question-choice">
                        <label>
                            <input
                                type="radio"
                                value="default"
                                checked={useDefaultQuestion}
                                onChange={handleQuestionChange}
                            />
                            Use default
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="custom"
                                checked={!useDefaultQuestion}
                                onChange={handleQuestionChange}
                            />
                            Create security question
                        </label>
                    </div>
                    {useDefaultQuestion && (
                        <p>{securityQuestion}</p>
                    )}
                </div>
                {!useDefaultQuestion && (
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Enter security question"
                            value={customSecurityQuestion}
                            onChange={(e) => setCustomSecurityQuestion(e.target.value)}
                            required={!useDefaultQuestion}
                        />
                    </div>
                )}
                 <div className="input-box input-box-sec-q-answer">
                    <input
                        type="text"
                        placeholder="Answer security question"
                        value={securityQuestionAnswer}
                        onChange={(e) => setSecurityQuestionAnswer(e.target.value)}
                        required
                    />
                 </div>
                 <button type="submit">Register</button>     
                <div className="login-link">
                    <p>Already have an account? <Link to="/">Login</Link></p>
                </div>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
        </div>
     );
}
 
export default Register;