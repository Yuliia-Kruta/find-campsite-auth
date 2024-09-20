import { Link } from "react-router-dom";
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
        } catch (err) {
          setError(err.response?.data?.error || 'Password reset failed');
        }
    };

    return ( 
        <div className="wrapper">
            <form onSubmit={handleResetPassword}>
                <h1>Reset password</h1>
                <div className="input-box">
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
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
        </div>
     );
}
 
export default ResetPassword;




/*

@app.post('/forgot_password')
def forgot_password():
    data = request.json
    email = data.get('email').strip()
    security_question_answer = data.get('securityQuestionAnswer').strip()
    new_password = data.get('newPassword').strip()

    user = connection.hgetall('user:'+email)
    if not user:
        return jsonify({'error': 'User does not exist'}), 404
    
    
    stored_security_question_answer = user.get('securityQuestionAnswer')
    if security_question_answer != stored_security_question_answer:
        return jsonify({'error': 'Incorrect security question answer'}), 400

    hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
    connection.hset('user:'+email, 'password', hashed_password.decode('utf-8'))

    return jsonify({'message': 'Password updated successfully'}), 200*/

    {receivedMessage && <p style={{ color: 'green' }}>{receivedMessage}</p>}



/////////

    useEffect(() => {

        const rememberedEmail = localStorage.getItem('email');
        const rememberedPassword = localStorage.getItem('password');
        if (rememberedEmail && rememberedPassword) {
            setEmail(rememberedEmail);
            setPassword(rememberedPassword);
            setRememberMe(true); 
        }

        const received_message = sessionStorage.getItem('receivedMessage');
        
        if (received_message) {
            setReceivedMessage(received_message);
            sessionStorage.removeItem('receivedMessage');
        }
    }, []);



      // If "Remember me" is checked, store credentials in localStorage
            /*if (rememberMe) {
                localStorage.setItem('email', email);
                localStorage.setItem('password', response.data.password);
            } else {
                // Remove credentials from localStorage if "Remember me" is unchecked
                localStorage.removeItem('email');
                localStorage.removeItem('password');
            }*/


            //    checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}
/*

            element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              } />*/