import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JuniorProfileCard = () => {
  const navigate = useNavigate();

  // local state for form inputs
  const [formData, setFormData] = useState({
    name: "",
    userType: "",
    email: "",
  });

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.userType.toLowerCase() === "junior") {
      navigate("/junior-profile-creation");
    } else if (formData.userType.toLowerCase() === "senior") {
      navigate("/senior-profile-creation");
    } else {
      alert("Please select valid user type (junior/senior)");
    }
  };

  return (
    <div className=" max-w-sm mx-auto mt-25 p-6 border rounded-2xl shadow-lg bg-white text-center">
      <h2 className="text-2xl font-bold mb-4">Create Your Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />

        {/* User Type */}
        <select
          name="userType"
          value={formData.userType}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg"
        >
          <option value="">Select User Type</option>
          <option value="junior">Junior</option>
          <option value="senior">Senior</option>
        </select>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default JuniorProfileCard;
