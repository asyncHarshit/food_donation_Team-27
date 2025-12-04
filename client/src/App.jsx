// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import DonorDashboard from "./pages/DonorDashboard.jsx";
import VolunteerDashboard from "./pages/VolunteerDashboard.jsx";
import AdminLayout from "./pages/AdminLayout.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/donor" element={<DonorDashboard />} />
        <Route path="/volunteer" element={<VolunteerDashboard />} />
        <Route path="/admin" element={<AdminLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
