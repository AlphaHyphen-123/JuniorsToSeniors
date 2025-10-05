import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



const LoginPage = () => {

    const Navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        userType: "" // Added for dropdown selection
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        // Basic validation for userType
        if (!formData.userType) {
            setMessage("Please select your role (Junior or Senior)");
            return;
        }

        try {
            const res = await fetch("http://localhost:8080/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, userType: formData.userType }), // Include userType in payload
            });

            const data = await res.json();

            if (res.ok) {
                setMessage(data.message);
                // ✅ save user info in localStorage (optional)
                localStorage.setItem("user", JSON.stringify(data.user));
                // ✅ redirect based on selected userType
                if (formData.userType === "junior") {
                    navigate("/JuniorProfileCard");
                } else if (formData.userType === "senior") {
                    navigate("/senior");
                } else {
                    navigate("/home"); // fallback
                }
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            console.error(error);
            setMessage("Server error");
        }

        Navigate("/JuniorProfileCard")
    };

    return (
        <div className="">
            <div className=" mt-3  flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100">
                {/* Cartoon Illustration */}
                {/* <div className="absolute left-50 left-1/2 transform -translate-x-1/2 w-24 h-24"> */}
                <div className="absolute left-50 left-1/2 transform -translate-x-1/2 w-24 h-24 group cursor-pointer">
                    <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-12 group-hover:animate-wiggle"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Cartoon Character Head - Add subtle hover color change */}
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="#FFD700"
                            stroke="#FF6B35"
                            strokeWidth="3"
                            className="transition-all duration-500 group-hover:fill-yellow-300 group-hover:stroke-orange-500"
                        />
                        {/* Eyes - Animate to "wink" on hover by scaling y */}
                        <circle cx="35" cy="40" r="8" fill="white" className="transition-all duration-300 group-hover:scale-y-50" />
                        <circle cx="65" cy="40" r="8" fill="white" className="transition-all duration-300 group-hover:scale-y-50 delay-100" />
                        <circle cx="35" cy="40" r="4" fill="#4A90E2" className="transition-all duration-300 group-hover:scale-125" />
                        <circle cx="65" cy="40" r="4" fill="#4A90E2" className="transition-all duration-300 group-hover:scale-125 delay-100" />
                        {/* Smile - Make it wider and bouncier on hover */}
                        <path
                            d="M30 60 Q50 75 70 60"
                            stroke="#FF6B35"
                            strokeWidth="3"
                            fill="none"
                            className="transition-all duration-500 group-hover:stroke-orange-500 group-hover:[d:'M25 60 Q50 80 75 60']"
                        />
                        {/* Blush - Pulse animation on hover */}
                        <circle cx="25" cy="55" r="5" fill="#FFB6C1" opacity="0.7" className="transition-all duration-700 group-hover:animate-pulse group-hover:opacity-100" />
                        <circle cx="75" cy="55" r="5" fill="#FFB6C1" opacity="0.7" className="transition-all duration-700 group-hover:animate-pulse group-hover:opacity-100 delay-150" />
                    </svg>
                </div>

                <style jsx>{`
    @keyframes wiggle {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(5deg); }
        75% { transform: rotate(-5deg); }
    }
    .animate-wiggle {
        animation: wiggle 0.6s ease-in-out;
    }
`}</style>
                {/* <div className="absolute right-30 right-1/2 transform -translate-x-1/2 w-24 h-24"> */}
                <div className="absolute right-30 right-1/2 transform -translate-x-1/2 w-24 h-24 group cursor-pointer">
                    <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-12 group-hover:animate-wiggle"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Cartoon Character Head - Add subtle hover color change */}
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="#FFD700"
                            stroke="#FF6B35"
                            strokeWidth="3"
                            className="transition-all duration-500 group-hover:fill-yellow-300 group-hover:stroke-orange-500"
                        />
                        {/* Eyes - Animate to "wink" on hover by scaling y */}
                        <circle cx="35" cy="40" r="8" fill="white" className="transition-all duration-300 group-hover:scale-y-50" />
                        <circle cx="65" cy="40" r="8" fill="white" className="transition-all duration-300 group-hover:scale-y-50 delay-100" />
                        <circle cx="35" cy="40" r="4" fill="#4A90E2" className="transition-all duration-300 group-hover:scale-125" />
                        <circle cx="65" cy="40" r="4" fill="#4A90E2" className="transition-all duration-300 group-hover:scale-125 delay-100" />
                        {/* Smile - Make it wider and bouncier on hover */}
                        <path
                            d="M30 60 Q50 75 70 60"
                            stroke="#FF6B35"
                            strokeWidth="3"
                            fill="none"
                            className="transition-all duration-500 group-hover:stroke-orange-500 group-hover:[d:'M25 60 Q50 80 75 60']"
                        />
                        {/* Blush - Pulse animation on hover */}
                        <circle cx="25" cy="55" r="5" fill="#FFB6C1" opacity="0.7" className="transition-all duration-700 group-hover:animate-pulse group-hover:opacity-100" />
                        <circle cx="75" cy="55" r="5" fill="#FFB6C1" opacity="0.7" className="transition-all duration-700 group-hover:animate-pulse group-hover:opacity-100 delay-150" />
                    </svg>
                </div>

                <style jsx>{`
    @keyframes wiggle {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(5deg); }
        75% { transform: rotate(-5deg); }
    }
    .animate-wiggle {
        animation: wiggle 0.6s ease-in-out;
    }
`}</style>
                <div className="relative z-10 flex flex-col items-center">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white shadow-2xl rounded-3xl p-8 w-96 transform hover:scale-105 transition-transform duration-300 border border-gray-200"
                    >
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
                            <p className="text-gray-600 text-sm">Log in to your account</p>
                        </div>

                        <div className="space-y-4">
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-4 border-2 border-gray-300 rounded-2xl focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-gray-50"
                            />

                            {/* Added User Type Dropdown */}
                            <select
                                name="userType"
                                value={formData.userType}
                                onChange={handleChange}
                                className="w-full p-4 border-2 border-gray-300 rounded-2xl focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-gray-50"
                            >
                                <option value="">Select your role...</option>
                                <option value="junior">Junior</option>
                                <option value="senior">Senior</option>
                            </select>

                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-4 border-2 border-gray-300 rounded-2xl focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-gray-50"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-2xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg"
                        >
                            Login
                        </button>

                        {message && (
                            <p className="mt-4 text-center text-red-500 font-medium bg-red-50 p-3 rounded-xl">{message}</p>
                        )}
                    </form>

                    {/* Subtle Cartoon Elements Below */}
                    <div className="mt-6 flex space-x-4">
                        <div className="w-6 h-6 bg-yellow-400 rounded-full shadow-lg"></div>
                        <div className="w-6 h-6 bg-pink-400 rounded-full shadow-lg"></div>
                        <div className="w-6 h-6 bg-green-400 rounded-full shadow-lg"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;