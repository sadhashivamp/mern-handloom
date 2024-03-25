import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Alert, Spinner } from "flowbite-react";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = formData;
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // Send a request to your backend API to reset the password
    setLoading(true);
    setError(null);
    try {
      // Your API endpoint for password reset
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
      } else {
        // Password reset successful, redirect to login page
        // You can also display a success message to the user
        console.log("Password reset successful");
        navigate("/signin")
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center p-2">
      <div className="bg-blue-100 rounded-lg shadow-lg p-8 max-w-md w-full md:mx-4">
        <Link
          to="/login"
          className="absolute top-2 left-2 border border-blue-500 rounded-full p-2 arrow-icon"
        >
          <FaArrowLeft className="back-arrow-icon" />
        </Link>
        <h2 className="text-3xl text-center text-blue-500 mb-6">Reset Password</h2>
        {error && <Alert color="failure">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="password"
              placeholder="New Password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
