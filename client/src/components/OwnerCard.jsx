import PropTypes from "prop-types";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OwnerCard = ({ owners }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      };
  return (
    <div className="w-full m-auto">
      <div className="mt-5">
        <Slider {...settings}>
          {owners.map((owner, index) => (
            <div
              key={index}
              className="bg-white text-black rounded-xl h-[450px]"
            >
              <div className="h-56 rounded-t-xl bg-indigo-500 flex justify-center items-center">
                <img
                  src={owner.image}
                  alt={`Owner ${index}`}
                  className="w-54 h-44 rounded-full"
                />
              </div>
              <div className="flex flex-col justify-center items-center p-4 gap-4">
                <h3 className="text-xl font-semibold">{owner.name}</h3>
                <p>{owner.type}</p>
                <button className="text-lg text-white px-6 py-1 rounded-xl bg-indigo-500">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

// Prop types validation
OwnerCard.propTypes = {
  owners: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      // Add additional prop types as needed for additional owner details
    })
  ).isRequired,
};

export default OwnerCard;
