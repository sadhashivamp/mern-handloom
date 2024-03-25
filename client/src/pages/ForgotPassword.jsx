import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Alert, Spinner } from "flowbite-react";

const ForgotPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Send a request to your backend API to handle the "Forgot Password" process
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
      } else {
        setError(data.message);
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
        <h2 className="text-3xl text-center text-blue-500 mb-6">Forgot Password</h2>
        {error && <Alert color="failure">{error}</Alert>}
        {successMessage && <Alert color="success">{successMessage}</Alert>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
              "Submit"
            )}
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/signin" className="text-blue-500">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
