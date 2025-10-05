import React from "react";
import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()

  const redirectToJunior = () => {
    navigate("/register/junior")
  }

  const redirectToMentor = () => {
    navigate("/register")
  }

  const redirectToLogin = () => {
    navigate("/login")
  }

  return (
    <div className="min-h-screen mt-13 bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Choose Your Registration Type</h1>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Junior Card */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-95 transition-all duration-300 p-8 text-center border border-gray-200 transform">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Junior</h2>
              <p className="text-gray-600 mb-6">
                Start your learning journey with guidance and support from experienced mentors.
              </p>
            </div>
            <div className="space-y-3">
              <button
                onClick={redirectToLogin}
                className="w-full px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Login
              </button>
              <button
                onClick={redirectToJunior}
                className="w-full px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Register as Junior
              </button>
            </div>
          </div>

          {/* Mentor Card */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-95 transition-all duration-300 p-8 text-center border border-gray-200 transform">
            <div className="mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Mentor</h2>
              <p className="text-gray-600 mb-6">Share your expertise and help guide the next generation of learners.</p>
            </div>
            <div className="space-y-3">
              <button
                onClick={redirectToLogin}
                className="w-full px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Login
              </button>
              <button
                onClick={redirectToMentor}
                className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Register as Mentor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}