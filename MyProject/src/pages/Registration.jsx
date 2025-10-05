"use client"

import { useState } from "react"

export default function MentorRegistration() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "", // Added for dropdown selection
  })
  const [errors, setErrors] = useState({})
  const [characterEmotion, setCharacterEmotion] = useState("happy")
  const [showConfetti, setShowConfetti] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [characterMessage, setCharacterMessage] = useState(
    "Hi there! I'm here to help you register. Let's get started!",
  )

  const validateField = (name, value) => {
    const newErrors = { ...errors }

    switch (name) {
      case "firstName":
        if (!value.trim()) {
          newErrors.firstName = "First name is required"
          setCharacterEmotion("sad")
          setCharacterMessage("Oops! Don't forget your first name!")
        } else {
          delete newErrors.firstName
          setCharacterEmotion("happy")
          setCharacterMessage("Great! Nice to meet you!")
        }
        break
      case "lastName":
        if (!value.trim()) {
          newErrors.lastName = "Last name is required"
          setCharacterEmotion("sad")
          setCharacterMessage("We need your last name too!")
        } else {
          delete newErrors.lastName
          setCharacterEmotion("happy")
          setCharacterMessage("Perfect! Your name looks complete!")
        }
        break
      case "userType": // Added validation for userType dropdown
        if (!value) {
          newErrors.userType = "Please select your role"
          setCharacterEmotion("sad")
          setCharacterMessage("Please choose if you're a junior or mentor!")
        } else {
          delete newErrors.userType
          setCharacterEmotion("happy")
          setCharacterMessage(`Got it! You're a ${value}!`)
        }
        break
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!value) {
          newErrors.email = "Email is required"
          setCharacterEmotion("sad")
          setCharacterMessage("I need your email to contact you!")
        } else if (!emailRegex.test(value)) {
          newErrors.email = "Please enter a valid email"
          setCharacterEmotion("sad")
          setCharacterMessage("Hmm, that email doesn't look right...")
        } else {
          delete newErrors.email
          setCharacterEmotion("happy")
          setCharacterMessage("Awesome email! I'll remember that!")
        }
        break
      case "password":
        if (!value) {
          newErrors.password = "Password is required"
          setCharacterEmotion("sad")
          setCharacterMessage("You'll need a password to keep your account safe!")
        } else if (value.length < 6) {
          newErrors.password = "Password must be at least 6 characters"
          setCharacterEmotion("sad")
          setCharacterMessage("Make it a bit longer for better security!")
        } else {
          delete newErrors.password
          setCharacterEmotion("happy")
          setCharacterMessage("Strong password! Your account will be secure!")
        }
        break
      case "confirmPassword":
        if (!value) {
          newErrors.confirmPassword = "Please confirm your password"
          setCharacterEmotion("sad")
          setCharacterMessage("Just type your password again to confirm!")
        } else if (value !== formData.password) {
          newErrors.confirmPassword = "Passwords do not match"
          setCharacterEmotion("sad")
          setCharacterMessage("Oops! The passwords don't match!")
        } else {
          delete newErrors.confirmPassword
          setCharacterEmotion("happy")
          setCharacterMessage("Perfect match! You're all set!")
        }
        break
    }

    setErrors(newErrors)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    validateField(name, value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setCharacterEmotion("happy");
    setCharacterMessage("Processing your registration...");

    // Manual validation
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
      if (key !== "confirmPassword" && !formData[key].trim()) { // Skip confirmPassword in trim check
        newErrors[key] = "Required";
      }
    });

    if (Object.keys(newErrors).length === 0 && formData.userType) { // Added check for userType
      try {
        const { firstName, lastName, email, password, userType } = formData; // Include userType

        const response = await fetch("http://localhost:8080/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName, lastName, email, password, userType }), // Added userType to payload
        });

        const data = await response.json();

        if (response.ok) {
          setShowConfetti(true);
          setCharacterEmotion("excited");
          setCharacterMessage(`🎉 ${data.message}`);

          setTimeout(() => setShowConfetti(false), 3000);

          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            userType: "", // Reset userType
          });
        } else {
          setCharacterEmotion("sad");
          setCharacterMessage(data.message || "Something went wrong!");
        }
      } catch (error) {
        console.error("Error:", error);
        setCharacterEmotion("sad");
        setCharacterMessage("Network error. Please try again!");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
      setCharacterEmotion("sad");
      setCharacterMessage("Please fix the errors above first!");
      setErrors(newErrors);
    }
  };

  const CharacterAvatar = () => (
    <div className="relative">
      <div
        className={`mt-13 w-24 h-24 rounded-full flex items-center justify-center text-4xl transition-all duration-300 ${
          characterEmotion === "happy"
            ? "bg-yellow-200 animate-bounce"
            : characterEmotion === "sad"
              ? "bg-blue-200"
              : characterEmotion === "excited"
                ? "bg-green-200 animate-pulse"
                : "bg-gray-200"
        }`}
      >
        {characterEmotion === "happy" && "😊"}
        {characterEmotion === "sad" && "😔"}
        {characterEmotion === "excited" && "🤩"}
      </div>
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-2 border-gray-300 rotate-45"></div>
    </div>
  )

  const ConfettiPiece = ({ delay, color }) => (
    <div
      className={`absolute w-2 h-2 ${color} animate-bounce`}
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${delay}ms`,
        animationDuration: "2s",
      }}
    />
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Character Guide */}
        <div className="text-center mb-8">
          <CharacterAvatar />
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md border-2 border-purple-200">
            <p className="text-gray-700 font-medium">{characterMessage}</p>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-purple-100">
          <h1 className="text-3xl font-bold text-center text-purple-800 mb-8">Registration</h1> {/* Updated title to be more general */}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                    errors.firstName ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                    errors.lastName ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {/* Added User Type Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">User  Type</label>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                  errors.userType ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
              >
                <option value="">Select your role...</option>
                <option value="junior">Junior</option>
                <option value="senior">Mentor</option>
              </select>
              {errors.userType && <p className="text-red-500 text-sm mt-1">{errors.userType}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                  errors.email ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
                placeholder="Enter your email address"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                  errors.password ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
                placeholder="Create a password"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                  errors.confirmPassword ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 hover:shadow-lg transform hover:-translate-y-1"
              }`}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </form>
        </div>

        {/* Confetti Animation */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <ConfettiPiece
                key={i}
                delay={i * 100}
                color={["bg-yellow-400", "bg-pink-400", "bg-purple-400", "bg-blue-400"][i % 4]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}