import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Alert, Spinner } from "flowbite-react";

const OtpVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (!isNaN(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 3 && value !== "") {
        inputsRef.current[index + 1].focus();
      }
    } else if (value === "" && index > 0 && otp[index - 1] !== "") {
      // Move focus to the previous input box and clear the current box value
      inputsRef.current[index - 1].focus();
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    setLoading(true);
    setError(null);
    try {
      // Send a request to your backend API to verify OTP
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp: enteredOtp }),
      });
      const data = await response.json();
      if (!response.ok) {
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
        <h2 className="text-3xl text-center text-blue-500 mb-6">OTP Verification</h2>
        {error && <Alert color="failure">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-10 h-10 text-center mr-2 border border-gray-300 rounded-md"
                required
              />
            ))}
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
              "Verify OTP"
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

export default OtpVerification;
