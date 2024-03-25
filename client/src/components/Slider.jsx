import { useEffect, useRef, useState } from "react";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

const screenWidth = window.innerWidth;

const sliderData = [
    {
      img: "https://www.shutterstock.com/image-vector/illustration-indian-woman-operating-traditional-260nw-2349476555.jpg",
    },
    {
      img: "https://media.istockphoto.com/id/1309631436/vector/set-of-stickers-carpet-weaving-theme-woman-work-on-handloom-tiny-characters-with-skein-of.jpg?s=612x612&w=0&k=20&c=U-hxhL9X0iSTBFJQzUhXgYTZsetyCQMkAwEYGLxKwc4=",
    },
    {
      img: "https://www.jdinstitute.edu.in/media/2021/12/Handlooms-History-And-Significance-In-Indian-Culture-Thumbnail.jpg",
    },
    {
      img: "https://img.onmanorama.com/content/dam/mm/en/lifestyle/news/images/2020/4/19/handloom-c.jpg",
    },
    {
      img: "https://cdn.shopify.com/s/files/1/0444/9337/3595/files/Odisha_Handloom_That_Have_International_Fame_600x600.jpg?v=1655551634",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwk78Mzl5uye1hjkL_cH0hgplgIQMavqnd_w&usqp=CAU",
    },
  ];
const MainSlider = () => {
  const [data, setData] = useState([]);

  const elementRef = useRef();

  useEffect(() => {
    console.log(sliderData);
    setData(sliderData);
  }, []);

  const sliderRight = () => {
    elementRef.current.scrollLeft += screenWidth-200; // Adjust 200 according to your design
  };

  const sliderLeft = () => {
    elementRef.current.scrollLeft -= screenWidth-200; 
  };

  return (
    <div className="relative">
      <div className="absolute top-1/2 transform -translate-y-1/2 left-4 z-10">
        <FaRegArrowAltCircleLeft
          className="hidden md:block text-white text-[30px] cursor-pointer"
          onClick={sliderLeft}
        />
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 right-4 z-10">
        <FaRegArrowAltCircleRight
          className="hidden md:block text-white text-[30px] cursor-pointer"
          onClick={sliderRight}
        />
      </div>

      <div
        className="flex overflow-x-auto w-full px-16 py-4 scrollbar-hide scroll-smooth"
        ref={elementRef}
      >
        {data.map((item, index) => (
          <img
            key={index}
            src={item.img}
            className="min-w-full md:h-[310px] mr-5 rounded-lg object-cover hover:border-[4px] border-blue-500 transition-all duration-150 ease-in-out"
            alt={`Slider Image ${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MainSlider;
