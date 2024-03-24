import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UserRole = () => {
    const navigate = useNavigate();

    const handleSelectRole = (role) => {
        if (role === 'owner') {
            navigate('/owner-registration');
        } else if (role === 'worker') {
            navigate('/worker-registration');
        }
    };

    return (
        <div className="relative">
            <Link to="/" className="absolute top-2 left-2 border border-blue-500 rounded-full p-2 arrow-icon">
                <FaArrowLeft className="back-arrow-icon" />
            </Link>
            <div className="hero-section flex justify-center items-center h-screen">
                <div className="container text-center">
                    <div className="flex justify-center">
                        <div className="flex flex-col">
                            <h1 className="text-4xl mb-4 font-mono">Select Your Role</h1>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="p-4">
                                    <div className="border border-gray-300 rounded-lg shadow-md role-card">
                                        <h2 className="font-bold">Owner</h2>
                                        <p className="font-serif">
                                            Register as an owner to manage your handloom business.
                                        </p>
                                        <Link to="/owner-registration">
                                            <button className="bg-blue-500 text-white px-4 py-2 block mt-4 w-full" onClick={() => handleSelectRole('owner')}>Register as Owner</button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="border border-gray-300 rounded-lg shadow-md role-card">
                                        <h2 className="font-bold">Worker</h2>
                                        <p>
                                            Find job opportunities as a handloom worker.
                                        </p>
                                        <Link to="/worker-registration">
                                            <button className="bg-blue-500 text-white px-4 py-2 block mt-4 w-full" onClick={() => handleSelectRole('worker')}>Login as Worker</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserRole;
