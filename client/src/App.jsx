// src/App.jsx
import {  Routes, Route } from "react-router-dom";
import DonorDashboard from "./pages/DonorDashboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import LandingPage from "./pages/LandingPage";


export default function App() {
  return (

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/donor" element={<DonorDashboard />} />
        <Route path="/volunteer" element={<VolunteerDashboard />} />
        {/* <Route path="/admin" element={<AdminLayout />} /> */}
      </Routes>
  
  );
}