import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const HomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleViewPatients = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/patients");
    }, 800);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-100 overflow-hidden">
      {/* Floating background circles */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-teal-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-cyan-200/30 rounded-full blur-3xl animate-pulse delay-700"></div>

      {loading && <Loader message="Loading patients..." />}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        {/* Hero Section */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-teal-500 to-cyan-700 bg-clip-text text-transparent">
            Jarurat Care
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Streamline patient management with our elegant, fast, and reliable
          healthcare dashboard.
        </p>

        <button
          onClick={handleViewPatients}
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-700 text-white px-8 py-3 sm:px-10 sm:py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-200 cursor-pointer"
        >
          🚀 View Patients
        </button>

        {/* Feature Cards */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
          {[
            {
              title: "🔍 Search Patients",
              desc: "Quickly find patient records by name, contact, or medical ID.",
              color: "from-teal-100/60 to-white/40",
            },
            {
              title: "📋 View Details",
              desc: "Access comprehensive patient profiles with modern, detailed modals.",
              color: "from-cyan-100/60 to-white/40",
            },
            {
              title: "➕ Add Records",
              desc: "Easily add new patient entries through our clean, guided form.",
              color: "from-green-100/60 to-white/40",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${feature.color} backdrop-blur-xl border border-white/40 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all`}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-700">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-24 bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-8 shadow-xl max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
            Why Choose Jarurat Care?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: "Patients Managed", value: "1,200+" },
              { label: "Healthcare Centers", value: "50+" },
              { label: "Active Users", value: "300+" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-extrabold text-teal-600 mb-1">
                  {item.value}
                </p>
                <p className="text-gray-600 font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
