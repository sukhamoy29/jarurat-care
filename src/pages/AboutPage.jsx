import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white/90 to-teal-50/60 p-4 sm:p-6 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              About <span className="text-teal-600">Jarurat Care Admin</span>
            </h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base max-w-2xl">
              Learn more about your healthcare management platform and its
              mission to simplify clinical operations.
            </p>
          </div>
        </div>

        {/* Mission Card */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-md p-6 sm:p-8 space-y-3">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            🎯 Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            At <b>Jarurat Care</b>, our goal is to empower administrators,
            doctors, and staff with a powerful yet easy-to-use system to manage
            patient data, appointments, and analytics — enabling better
            healthcare decisions with less manual effort.
          </p>
        </div>

        {/* Feature Highlights */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            ⚙️ Platform Highlights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "📁 Centralized Records",
                desc: "All patient data is securely managed in one dashboard — organized, searchable, and easy to access.",
              },
              {
                title: "📊 Analytics Integration",
                desc: "Gain insights into trends and performance using data visualization and reporting tools.",
              },
              {
                title: "🔐 Role-Based Access",
                desc: "Grant permissions to doctors, nurses, and admins for better data control and privacy.",
              },
              {
                title: "🧾 Appointment Management",
                desc: "Schedule, cancel, or reschedule patient visits seamlessly with calendar sync support.",
              },
              {
                title: "💬 Smart Notifications",
                desc: "Real-time alerts for appointments, patient updates, and important system actions.",
              },
              {
                title: "🌍 Cloud-Ready",
                desc: "Access the dashboard securely from anywhere with full mobile responsiveness.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/60 backdrop-blur-lg border border-white/40 rounded-xl p-5 shadow-sm hover:shadow-md transition-all"
              >
                <h3 className="text-base font-semibold text-gray-900 mb-1 flex items-center gap-1.5">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-gradient-to-br from-teal-600/90 to-teal-700/90 text-white rounded-2xl shadow-lg p-8 sm:p-10">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 flex items-center gap-2">
            🌟 Our Vision
          </h2>
          <p className="text-white/90 leading-relaxed text-sm sm:text-base">
            We envision <b>Jarurat Care</b> as the all-in-one healthcare
            administration solution that simplifies complexity, encourages
            collaboration, and ensures every patient receives the best care
            possible through smarter data management.
            <br />
            <br />
            From patient onboarding to analytics, our platform brings together
            every component of hospital management into one modern,
            user-friendly experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
