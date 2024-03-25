import { useState, useEffect } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const PlaceSelect = () => {
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStates = async () => {
            try {
                const response = await axios.get('http://localhost:3002/states');
                setStates(response.data);
            } catch (error) {
                console.error('Error fetching state data:', error);
            }
        };
        fetchStates();
    }, []);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                if (selectedState) {
                    const response = await axios.get(`http://localhost:3002/cities/${selectedState}`);
                    setCities(response.data);
                }
            } catch (error) {
                console.error('Error fetching city data:', error);
            }
        };
        fetchCities();
    }, [selectedState]);

    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
        setSelectedCity('');
    };

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
    };

    const handleSubmit = () => {
        navigate(`/dashboard?state=${selectedState}&city=${selectedCity}`);
    };

    return (
        <div className='flex items-center justify-center h-screen bg-cover bg-center'>
            <div className="place-select bg-white rounded-lg shadow-lg p-8 max-w-md w-full md:mx-4">
                <span className="block text-xl text-blue-500 mb-6">Select State and City to View Job Requests</span>
                <div className="mb-4">
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">Select State:</label>
                    <select id="state" value={selectedState} onChange={handleStateChange} className="w-full p-2 border border-gray-300 rounded-md">
                        <option value="">-- Select State --</option>
                        {states.map(state => (
                            <option key={state.name} value={state.name}>{state.name}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">Select City:</label>
                    <select id="city" value={selectedCity} onChange={handleCityChange} className="w-full p-2 border border-gray-300 rounded-md" disabled={!selectedState}>
                        <option value="">-- Select City --</option>
                        {selectedState && cities.filter(city => city.state === selectedState).map(city => (
                            <option key={city._id} value={city.name}>{city.name}</option>
                        ))}
                    </select>
                </div>
                <button onClick={handleSubmit} disabled={!selectedState || !selectedCity} className="w-full bg-blue-500 text-white p-2 rounded-md">
                    Go and Check Details in Dashboard
                </button>
            </div>
        </div>

    );
};

export default PlaceSelect;
