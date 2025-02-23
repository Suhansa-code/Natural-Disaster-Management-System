import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PropTypes from "prop-types";
import { get } from "../../Services/ApiEndPoint";
import { Link } from "react-router-dom";

export default function ProductSlider({ category }) {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productsPerSlide, setProductsPerSlide] = useState(3); // Dynamic products per slide

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        const request = await get(`/api/v1/products/Suggestion/${category}`);
        const data = request.data;
        setRecommendedProducts(data);
      } catch (error) {
        console.error("Error fetching recommended products:", error);
      }
    };

    fetchRecommendedProducts();
  }, [category]);

  useEffect(() => {
    // Adjust products per slide based on screen size
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setProductsPerSlide(1); // Mobile: 1 product per slide
      } else if (window.innerWidth < 1024) {
        setProductsPerSlide(2); // Tablet: 2 products per slide
      } else {
        setProductsPerSlide(3); // Desktop: 3 products per slide
      }
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize); // Listen for resize

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  // Group products into slides dynamically
  const slides = [];
  for (let i = 0; i < recommendedProducts.length; i += productsPerSlide) {
    slides.push(recommendedProducts.slice(i, i + productsPerSlide));
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex flex-col items-center w-full px-4">
      <h2 className="text-2xl md:text-4xl font-bold mb-8">You may also like</h2>
      <div className="relative w-full max-w-6xl">
        {/* Left Navigation Button */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md z-10 hidden sm:block"
        >
          <FaChevronLeft className="text-gray-500" />
        </button>

        {/* Slider */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {slides.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                className="flex justify-center items-center w-full gap-4"
                style={{ flex: "0 0 100%" }}
              >
                {slide.map((product) => (
                  <React.Fragment key={product._id}>
                    <Link to={`/product-description/${product._id}`}>
                      <div className="flex flex-col items-center p-4 w-full max-w-xs">
                        <img
                          src={
                            product.images[0]?.url ||
                            "https://via.placeholder.com/300"
                          }
                          alt={product.name}
                          className="rounded-lg w-full h-64 object-cover mb-4"
                          draggable="false"
                        />
                        <h3 className="text-sm md:text-lg font-semibold">
                          {product.name}
                        </h3>
                        <p className="text-base md:text-xl font-bold">
                          Rs: {product.price}
                        </p>
                      </div>
                    </Link>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Right Navigation Button */}
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md z-10 hidden sm:block"
        >
          <FaChevronRight className="text-gray-500" />
        </button>
      </div>

      {/* Dots for Mobile */}
      <div className="flex mt-4 space-x-2 sm:hidden">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-gray-700" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}

ProductSlider.propTypes = {
  category: PropTypes.string.isRequired,
};
