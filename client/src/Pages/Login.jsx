import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { post } from "../../Services/ApiEndPoint";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/AuthSlice";
import GridComponent from "../Components/GridComponent";
import Logo from "../Components/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import FlipCard from "../Components/FlipCard";

const Login = () => {
  //Change title
  useEffect(() => {
    document.title = "Bespoke Furniture | Login";
  }, []);

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [req, setReq] = useState("");
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const randomDelay = () => Math.random() * 2 + "s";

  const Login_Submit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!email.trim()) {
      toast.error("Email is required.");
      return;
    }
    // Validate password
    if (!password.trim()) {
      toast.error("Password is required.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    try {
      const request = await post("/api/auth/login", { email, password });
      setReq(request.status);

      const respons = request.data;

      if (request.status === 200) {
        if (respons.user.role == "admin") {
          navigate("/admin/inventory");
        } else if (respons.user.role == "user") {
          navigate("/");
        }
        toast.success("Login successful!");
        dispatch(setUser(respons.user));
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.status); // Logs the status code
        console.log(error.response.data.message); // Logs the error message

        if (error.response.status === 401) {
          toast.error(error.response.data.message);
        } else if (error.response.status === 404) {
          toast.error("Invalid credentials!");
        } else {
          toast.error(
            error.response.data.message || "An unexpected error occurred."
          );
        }
      } else {
        // Generic error message for unexpected issues
        toast.error("Failed to connect to the server.");
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row h-screen w-screen overflow-hidden">
        <div className="flex flex-col gap-2 w-[100vw] lg:w-[700px] px-2 justify-between py-12 items-center">
          <Logo />

          <form
            onSubmit={Login_Submit}
            className="w-full px-4 max-w-[400px]"
            noValidate
          >
            <div className="flex flex-col justify-center items-center mb-12">
              <h1 className="font-normal text-6xl text-[#533B30]">Login in</h1>
              <p className="font-thin text-[22px] mt-2 text-[#533B30]">
                Welcome Back to Your Bespoke World
              </p>
            </div>

            <div className="flex flex-col justify-center items-center text-center gap-5 w-full">
              <input
                type="email"
                placeholder="Username or Email address"
                id="email"
                className="rounded-[30px] border-[1.5px] placeholder:text-[#533b308c] text-[#533b30da] w-full p-2 px-5 hover:border-[#533B30] border-[#533b309d] transition-all duration-300 outline-none"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="relative w-full">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Password"
                  id="password"
                  className="rounded-[30px] border-[1.5px] placeholder:text-[#533b308c] text-[#533b30da] w-full p-2 px-5 hover:border-[#533B30] border-[#533b309d] transition-all duration-300 outline-none"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FontAwesomeIcon
                  icon={isPasswordVisible ? faEye : faEyeSlash}
                  className="absolute right-4 top-[14px] cursor-pointer text-[#533b30ab] hover:text-[#533b30] hover:scale-110 transition-all duration-300"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              </div>
              <button
                type="submit"
                className="bg-[#533B30] active:border-[1.5px] active:border-[#533b30b5] w-24 mt-4 justify-between flex flex-row gap-2 rounded-[20px] pl-4 py-1 text-white hover:scale-110 transition-all duration-300 active:bg-white active:text-[#533b30da]"
              >
                Sign In
                <div className="rounded-[50px] mr-1 w-6 h-6 border-[2px] text-center justify-center items-center border-white flex flex-row content-center">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="self-center l-2 w-3 h-3"
                  />
                </div>
              </button>
            </div>
          </form>

          <div className="flex flex-row items-center text-center">
            <div className="flex flex-row font-thin text-2xl text-[#533B30] text-[16px]">
              <span>Don't Have an Account ?</span>
              <button
                href="#"
                className="rounded-[25px] ml-3 h-8 text-justify px-3 border-[#533B30] border-[1px] hover:bg-[#533B30] hover:text-white active:scale-110 transition-all duration-300  text-[#533b30da]"
              >
                <Link to={"/register"}>Sign Up</Link>
              </button>
            </div>
          </div>
        </div>

        <div className="w-full h-[95vh] bg-black flex items-center justify-center overflow-hidden m-5  rounded-[25px] self-center">
          <GridComponent />
        </div>
      </div>
    </div>
  );
};

export default Login;
