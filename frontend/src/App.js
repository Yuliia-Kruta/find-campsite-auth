import './App.css';
import {BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import ResetPassword from './components/ResetPassword'
import Home from './components/Home';

function App() {

  const isAuthenticated = () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={!isAuthenticated() ? <Login /> : <Navigate to="/home" />} />
          <Route path="/register" element={!isAuthenticated() ? <Register /> : <Navigate to="/home" />} />
          <Route path="/reset-password" element={!isAuthenticated() ? <ResetPassword /> : <Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
