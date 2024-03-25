import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UserRole from "./pages/UserRole";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import OtpVarification from "./pages/OtpVarification";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import PlaceSelect from "./pages/PlaceSelect";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/user-role" element={<UserRole />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/:role-registration" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp-varification" element={<OtpVarification />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/place-select" element={<PlaceSelect />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
