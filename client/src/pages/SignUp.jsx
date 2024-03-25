import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Alert, Spinner } from "flowbite-react";

const SignUp = () => {
  const { "role-registration": roleRegistration } = useParams();
  const role = roleRegistration ? roleRegistration.split("-")[0] : "owner";

  const [formData, setFormData] = useState({
    userName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: role,
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.userName ||
      !formData.phoneNumber ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/signin");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <Link
        to="/"
        className="absolute top-2 left-2 border border-blue-500 rounded-full p-2 arrow-icon"
      >
        <FaArrowLeft className="back-arrow-icon" />
      </Link>
      <div className="flex items-center justify-center h-screen bg-cover bg-center p-2">
        <div className="bg-blue-100 rounded-lg shadow-lg p-8 max-w-md w-full md:mx-4">
          <h1 className="text-3xl text-center text-blue-500 mb-6">
            Registration
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="User Name"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="tel"
                placeholder="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
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
            <div className="mb-4">
              <input
                type="text"
                value={formData.role}
                className="w-full p-2 border border-gray-300 rounded-md"
                readOnly
              />
            </div>
            {/* <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md"
            >
              Sign Up
            </button> */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white p-2 rounded-md"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </button>
            {errorMessage && (
              <Alert className="mt-5" color="failure">
                {errorMessage}
              </Alert>
            )}
          </form>
          <div className="mt-4 text-center">
            <Link to="/signin" className="text-blue-500">
              Already have an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
