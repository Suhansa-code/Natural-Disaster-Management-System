import React, { useState, useRef, useEffect } from "react";
import background_img from "../assets/Landing_Background.png";

function Landing() {
  const textRef = useRef(null);
  const [isImageOverlapping, setIsImageOverlapping] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsImageOverlapping(entry.isIntersecting);
      },
      {
        root: null, // Observe in the viewport
        threshold: 0.5, // Trigger when 50% of the text is covered
      }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#ffffff]">
      <div className="circle-div1 absolute -bottom-30 z-10 left-1/2 transform -translate-x-1/2 w-[35vw] h-[35vw] rounded-full bg-[#cfb09a] overflow-hidden"></div>
      <div className="circle-div absolute bottom-[-50%] z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[20vw] h-[20vw] rounded-full bg-[#cfb09a] overflow-hidden">
        {/* Black overlay */}
        <div className="absolute inset-0 bg-black opacity-30 z-10 pointer-events-none"></div>

        <img
          src={background_img}
          alt="background image"
          className="w-full h-full object-cover"
          draggable="false"
        />
      </div>

      <div
        className="text-container flex flex-col justify-center items-center absolute left-[50%] -translate-x-[50%] z-20 h-full select-none"
        ref={textRef}
      >
        <h1
          className={`text-[50px] md:text-[100px] lg:text-[160px] transition-colors duration-700 drop-shadow-md ${
            isImageOverlapping ? "text-white" : "text-[#533B30]"
          }`}
        >
          Bespoke&nbsp;Furniture
        </h1>
        <h2
          className={`text-[50px] md:text-[120px] transition-colors duration-700 ${
            isImageOverlapping ? "text-white" : "text-[#533B30]"
          }`}
        >
          by Artisan
        </h2>
      </div>
    </div>
  );
}

export default Landing;
