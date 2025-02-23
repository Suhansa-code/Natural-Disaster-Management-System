import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import ProductSlider from "../Components/ProductSlider";
import { get } from "../../Services/ApiEndPoint";
import { useDispatch, useSelector } from "react-redux";
import { post } from "../../Services/ApiEndPoint";
import { toast } from "react-hot-toast";

export default function ProductDescription() {
  const user = useSelector((state) => state.Auth.user);
  const userId = user ? user._id : null; // Safely handle `user` being null
  const { id } = useParams();

  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [zoomStyle, setZoomStyle] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const [coffeTableHover, setCoffeTableHover] = useState(false);
  const [endTableHover, setEndTableHover] = useState(false);
  const [barStoolsHover, setBarStoolsHover] = useState(false);
  const [hoverText, setHoverText] = useState("");
  // Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const request = await get(`/api/v1/products/${id}`);
        const data = request.data;

        setProductData(data);
        setMainImage(data.images?.[0]?.url || "");
        setLoading(false);
        document.title = `Bespoke Furniture | ${data.name ? data.name : "Product"}`;
      } catch (error) {
        toast.error("Failed to load product");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleRingForPrice = () => {
    toast.success("Calling the vendor..."); // Show a toast notification
    window.location.href = "tel:+94777866400"; // Replace with the actual phone number
  };

  const handleAddToCart = async () => {
    try {
      // Check if user is logged in
      if (!userId) {
        toast.error("Please log in to add products to your cart.");
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }

      const requestBody = {
        userId,
        productId: productData._id,
        quantity,
      };

      // Make API call to add product to cart
      const request = await post("/api/v1/cart/add", requestBody);
      toast.success(request.message || "Product added to cart successfully.");
    } catch (error) {
      // Handle API error responses
      if (error.response && error.response.status === 405) {
        toast.error("Product out of stock");
      } else {
        console.error("Error adding product to cart:", error);
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  const handleIncrease = () => {
    if (quantity < productData.stoke) {
      setQuantity((prev) => prev + 1);
    } else {
      toast.error("Cannot exceed available stock");
    }
  };

  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      backgroundImage: `url(${mainImage})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: "200%",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({});
  };

  if (loading) {
    return (
      <motion.div
        className="flex items-center justify-center min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Loading...
      </motion.div>
    );
  }

  if (!productData) {
    return (
      <motion.div
        className="flex items-center justify-center min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Product not found.
      </motion.div>
    );
  }
  const handleImgePartHover = (text, id) => {
    if (id === "1") {
      setCoffeTableHover(text !== "");
      console.log(text);
      console.log(id);
      setHoverText(text);
    } else if (id === "2") {
      setEndTableHover(text !== "");
      setHoverText(text);
    } else if (id === "3") {
      setBarStoolsHover(text !== "");
      setHoverText(text);
    }
  };

  return (
    <>
      <motion.div
        className="min-h-screen flex items-center justify-center mt-10 "
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="max-w-7xl bg-primary rounded-[15px] p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 ">
          {/* Left Section: Product Image and Thumbnails */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            {productData._id !== "677a8f57ad3bb7ddb71ee7f7" ? (
              <>
                {/* Main Product Image */}
                <div
                  className="w-full h-auto relative rounded-lg overflow-hidden"
                  style={{ height: "500px" }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src={mainImage}
                    alt="Product"
                    className="rounded-lg object-cover w-full h-full"
                    style={zoomStyle.backgroundImage ? { opacity: 0 } : {}}
                    draggable="false"
                  />
                  {zoomStyle.backgroundImage && (
                    <div
                      className="absolute inset-0 rounded-lg"
                      style={{
                        backgroundImage: zoomStyle.backgroundImage,
                        backgroundPosition: zoomStyle.backgroundPosition,
                        backgroundSize: zoomStyle.backgroundSize,
                        height: "100%",
                      }}
                    ></div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Main Product Image */}
                <div
                  className="w-full h-auto relative rounded-lg overflow-hidden"
                  style={{ height: "500px" }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src={mainImage}
                    alt="Product"
                    className="rounded-lg object-cover  w-full h-full "
                    draggable="false"
                  />
                  <div className=" absolute  bottom-2 left-1/2 ">
                    {coffeTableHover ? (
                      <motion.div
                        className="bg-white p-2 opacity-80 font-bold tracking-wide tetx-sm md:text-xl text-secondary-100 rounded mb-4 translate-x-2
                      transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {hoverText}
                      </motion.div>
                    ) : null}

                    <div
                      className="bg-secondary-100 opacity-50 border-white text-white border-[3px] z-10 rounded-full w-12 h-12 text-md leading-3 text-center cursor-pointer hover:bg-secondary-100 hover:text-white transition-all duration-300 flex items-center justify-center"
                      onMouseOver={() =>
                        handleImgePartHover("Wooden Coffe Table", "1")
                      }
                      onMouseLeave={() => handleImgePartHover("", "1")}
                      onTouchStart={() =>
                        handleImgePartHover("Wooden Coffe Table", "1")
                      }
                      onTouchEnd={() => handleImgePartHover("", "1")}
                    >
                      Hover me
                    </div>
                  </div>
                  <div className=" absolute  bottom-[130px] left-[220px] md:left-1/2">
                    {endTableHover ? (
                      <motion.div
                        className="bg-white p-2 opacity-80 font-bold tracking-wide tetx-sm md:text-xl text-secondary-100 rounded mb-4 translate-x-2
                      transition-all duration-300"
                        initial={{ opacity: 0, y: 30, x: 0 }}
                        whileInView={{ opacity: 1, y: -10, x: 20 }}
                        transition={{ duration: 0.5 }}
                      >
                        {hoverText}
                      </motion.div>
                    ) : null}

                    <div
                      className="bg-secondary-100 opacity-50 border-white text-white border-[3px] z-10 rounded-full w-12 h-12 text-md leading-3 text-center cursor-pointer hover:bg-secondary-100 hover:text-white transition-all duration-300 flex items-center justify-center"
                      onMouseOver={() =>
                        handleImgePartHover("Wooden End Table", "2")
                      }
                      onMouseLeave={() => handleImgePartHover("", "2")}
                      onTouchStart={() =>
                        handleImgePartHover("Wooden End Table", "2")
                      }
                      onTouchEnd={() => handleImgePartHover("", "2")}
                    >
                      Hover me
                    </div>
                  </div>
                  <div className=" absolute  bottom-[110px] right-10 md:block hidden">
                    {barStoolsHover ? (
                      <motion.div
                        className="bg-white p-2  absolute -left-10 opacity-80 font-bold tracking-wide tetx-sm md:text-xl text-secondary-100 rounded mb-2 "
                        initial={{ opacity: 0, x: 0, y: 0 }}
                        whileInView={{ opacity: 1, x: -20, y: -50 }}
                        transition={{ duration: 0.5 }}
                      >
                        {hoverText}
                      </motion.div>
                    ) : null}

                    <div
                      className="bg-secondary-100 opacity-50 border-white text-white border-[3px] z-10 rounded-full w-12 h-12 text-md leading-3 text-center cursor-pointe flex items-center justify-center cursor-pointer"
                      onMouseOver={() => handleImgePartHover("Bar Stools", "3")}
                      onMouseLeave={() => handleImgePartHover("", "3")}
                      onTouchStart={() =>
                        handleImgePartHover("Bar Stools", "3")
                      }
                      onTouchEnd={() => handleImgePartHover("", "3")}
                    >
                      Hover me
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* Thumbnails */}
            <div className="flex justify-start w-full gap-4 mt-4">
              {productData.images?.map((image, index) => (
                <motion.img
                  key={index}
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 ${
                    mainImage === image.url
                      ? "border-secondary-100"
                      : "border-transparent"
                  }`}
                  onClick={() => handleThumbnailClick(image.url)}
                  draggable="false"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Right Section: Product Details */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex flex-col bg-secondary-200 p-8 rounded-xl text-[18px]">
              <h1 className="text-4xl font-bold text-secondary-100 mb-4">
                {productData.name}
              </h1>
              <p className="text-secondary-100 text-[18px] mb-2">by Artisan</p>
              {/* <p className="text-3xl font-bold text-secondary-100 bg-brown-100 w-32 py-1 self-center rounded-lg">
                Ring for the price
              </p> */}
              <p className="text-secondary-100 mt-4 ">
                {productData.description}
              </p>
              {/* <div className="flex items-center mt-6">
                <span className="text-secondary-100 font-semibold">
                  Available:
                </span>
                {productData.stoke > 0 ? (
                  <span className="ml-2 text-green-700 font-semibold">
                    In stock
                  </span>
                ) : (
                  <span className="ml-2 text-red-500 font-semibold">
                    Out of stock
                  </span>
                )}
              </div> */}

              {/* Total Price */}
              <div className="flex items-center mt-6">
                <span className="text-secondary-100 font-semibold mr-4">
                  Price
                </span>
                <span
                  className="bg-secondary-100 text-white tracking-widest px-4 py-2 rounded-lg font-bold cursor-pointer text-sm md:text-base"
                  onClick={handleRingForPrice}
                >
                  Ring for the detailed quote
                </span>
              </div>
              {/* Add to Cart Button */}
            </div>
            {/* Continue Shopping Button */}
            <Link
              to="/product-list"
              className="w-full flex justify-center lg:justify-end"
            >
              <button className="mt-4 px-6 py-3 border-2 border-secondary-100 text-secondary-100 font-bold rounded-lg hover:bg-secondary-100 hover:text-primary transition">
                Continue Shopping
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <ProductSlider category={productData.category} />
      </motion.div>
    </>
  );
}

ProductDescription.propTypes = {
  productID: PropTypes.string,
};
