import { Link } from "react-router-dom";
import landingImage from "../assets/Landing.png";

const LandingPage = () => {
  return (
    <div className="hero-section flex justify-center items-center h-screen">
      <div className="container text-center">
        <div className="flex justify-center">
          <div className="flex justify-center items-center flex-col">
            <h1 className="text-4xl sm:text-5xl md:text-6xl mb-4 font-bold text-blue-500">
              Welcome to Handlooms
            </h1>

            <div className="mb-4 border-2 border-blue-200 w-80 h-80 bg-blue-200 rounded-full text-center flex justify-center items-center flex-col">
              <img
                src={landingImage}
                alt="Handloom"
                className="handloom-image max-w-full max-h-full"
              />
            </div>
            <Link to="/user-role">
              <button className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-2 px-4 rounded">
                Explore Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
