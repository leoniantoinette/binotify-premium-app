import Login from './components/loginregister/Login'
import Register from './components/loginregister/Register'
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>  

  );
}

export default App;
