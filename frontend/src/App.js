import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import ResetPassword from './components/ResetPassword'
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
