import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/Login/Login";
import DashboardStart from "./pages/DashboardStart/DashboardStart";
import Networks from "./pages/Networks/Networks";
import Monitoring from "./pages/Monitoring/Monitoring";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/DashboardStart" element={<DashboardStart />} />
        <Route path="/Networks" element={<Networks />} />
        <Route path="/Monitoring" element={<Monitoring />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
