import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";

const ResetPassword = () => {

    const [email, setEmail] = useState('');
    const [securityQuestion, setSecurityQuestion] = useState("What was your first dog's name?");
    const [securityQuestionAnswer, setSecurityQuestionAnswer] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [step, setStep] = useState('first'); // 'first' or 'reset'

    const navigate = useNavigate();

    const handleEmailSubmit = async (e) => {
        
        e.preventDefault();
        setError('');
        setMessage('');
    
        try {
          const response = await axios.post('http://127.0.0.1:5000/verify_email', { email });
          if (response.data.email) {
            setEmail(response.data.email);
            setSecurityQuestion(response.data.securityQuestion)
            setStep('reset');
          } else {
            setError('User does not exist');
          }
        } catch (err) {
          setError(err.response?.data?.error || 'Error');
        }
    };
    
    
    const handleResetPassword = async (e) => {
        
        e.preventDefault();
        setError('');
        setMessage('');
    
        try {
          const response = await axios.post('http://127.0.0.1:5000/forgot_password', {
            email,
            securityQuestionAnswer,
            newPassword,
          });
          setMessage(response.data.message);
          sessionStorage.setItem('receivedMessage', response.data.message);
          navigate('/')
        } catch (err) {
          setError(err.response?.data?.error || 'Password reset failed');
        }
    };

    return ( 
        <div className="wrapper">
            {step === 'first' ? (
                <>
                    <form onSubmit={handleEmailSubmit}>
                        <h1>Forgot password?</h1>
                        <div className="input-box">
                            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <MdEmail className="icon"/>
                        </div>
                        <button type="submit">Submit</button>
                        <div className="login-link">
                            <p>Remember your password? <Link to="/">Back to login</Link></p>
                        </div>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </>
            ) : (
                <>
                    <form onSubmit={handleResetPassword}>
                        <h1>Reset password</h1>
                        <div className="input-box">
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required readOnly/>
                            <MdEmail className="icon"/>
                        </div>
                        <p className="security-question-text-wrapper">{securityQuestion}</p>
                        <div className="input-box input-box-sec-q-answer">
                            <input
                                type="text"
                                placeholder="Answer security question"
                                value={securityQuestionAnswer}
                                onChange={(e) => setSecurityQuestionAnswer(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                placeholder="New password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Reset password</button>
                        <div className="login-link">
                            <p>Remember your password? <Link to="/">Back to login</Link></p>
                        </div>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {message && <p style={{ color: 'green' }}>{message}</p>}
                </>
            )}      
        </div>
     );
}
 
export default ResetPassword;