import './App.css';
import {Router, Route, Routes} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import ResetPassword from './components/ResetPassword'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
