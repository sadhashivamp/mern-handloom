import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';

const SignIn = () => {
    const [formData, setFormData] = useState({
        username: '',
        phoneNumber: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit login data to backend API
        const { username, phoneNumber } = formData;
        axios.post("http://localhost:3002/login", {
            username, phoneNumber
        }).then(result => {
            console.log("result", result);
            if (result.data === "Success") {
                navigate('/select');
            }
        }).catch(err => console.log(err));
        // Reset form data
        setFormData({
            username: '',
            phoneNumber: '',
        });
    };

    return (
        <div>
            <Link to="/" className='absolute top-2 left-2 border border-blue-500 rounded-full p-2 arrow-icon'>
                <FaArrowLeft className="back-arrow-icon" />
            </Link>
            <div className="container mx-auto">
                <div className="flex items-center justify-center h-screen p-2">
                    <div className="bg-blue-100 rounded-lg shadow-lg p-8 max-w-md w-full md:w-1/2 lg:w-2/5">
                        <h1 className="text-3xl text-center text-blue-500 mb-6">Login</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    name="username"
                                    value={formData.username}
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
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-2 rounded-md"
                            >
                                Login
                            </button>
                        </form>
                        <div className="mt-3 flex justify-between">
                            <Link to="/" className="text-blue-500">Forgot Password</Link>
                            <Link to="/owner-registration" className="text-blue-500">Register</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
