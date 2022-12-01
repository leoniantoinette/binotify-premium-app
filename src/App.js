import Login from "./pages/loginregister/Login";
import Register from "./pages/loginregister/Register";
import Homepage from "./pages/Homepage";
import MySongs from "./pages/MySongs";
import SongDetail from "./pages/SongDetail";
import SubscriptionReq from "./pages/SubscriptionReq";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registers" element={<Register />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/SubscriptionRequest" element={<SubscriptionReq />} />
        <Route path="/MySongs" element={<MySongs />} />
        <Route exact path="/songs/:songId" element={<SongDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
