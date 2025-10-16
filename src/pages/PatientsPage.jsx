import React, { useState } from "react";
import { useApp } from "../AppContext";
import Loader from "../components/Loader";
import PatientCard from "../components/PatientCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { Search } from "lucide-react";

const PatientsPage = () => {
  const {
    filteredPatients,
    searchQuery,
    setSearchQuery,
    isLoading,
    error,
    fetchPatients,
    setIsAddingPatient,
  } = useApp();
  const [loadingOverlay, setLoadingOverlay] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {loadingOverlay && <Loader message="Preparing form..." />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header + Add Button + Search */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 flex-1">
            Patient Records
          </h1>

          {/* Search + Button wrapper */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            {/* Search bar */}
            <div className="relative w-full sm:w-80">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Search size={18} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, contact, or ID..."
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-700"
              />
            </div>

            {/* Add New Patient Button */}
            <button
              onClick={() => {
                setLoadingOverlay(true);
                setTimeout(() => {
                  setLoadingOverlay(false);
                  setIsAddingPatient(true);
                }, 500);
              }}
              className="bg-gradient-to-r from-teal-400 to-cyan-700 text-white px-6 py-2 rounded-md shadow hover:opacity-95 transition cursor-pointer"
            >
              + Add New Patient
            </button>
          </div>
        </div>

        {/* Patients Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <LoadingSpinner key={i} />
            ))}
          </div>
        ) : error ? (
          <ErrorMessage message={error} onRetry={fetchPatients} />
        ) : filteredPatients.length === 0 ? (
          <div className="text-center py-12">
            {searchQuery ? (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No patients found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No patients yet
                </h3>
                <p className="text-gray-600">
                  Add your first patient to get started
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.map((p) => (
              <PatientCard key={p.id} patient={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientsPage;

// use RandomUser.me API for demo
// https://randomuser.me/api/?results=12

// import React, { useEffect, useState } from "react";
// import PatientModal from "../components/PatientModal";
// import Loader from "../components/Loader";

// const PatientsPage = () => {
//   const [patients, setPatients] = useState([]);
//   const [filteredPatients, setFilteredPatients] = useState([]);
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");

//   // Fetch patient data from RandomUser.me API
//   useEffect(() => {
//     fetch("https://randomuser.me/api/?results=12")
//       .then((res) => res.json())
//       .then((data) => {
//         const formatted = data.results.map((p, i) => ({
//           id: i + 1,
//           name: `${p.name.first} ${p.name.last}`,
//           age: p.dob.age,
//           gender: p.gender,
//           contact: p.phone,
//           email: p.email,
//           bloodType: ["A+", "B+", "O+", "AB+"][i % 4],
//           condition: ["Diabetes", "Asthma", "Hypertension", "Healthy"][i % 4],
//           lastVisit: "2025-10-10",
//           address: `${p.location.city}, ${p.location.country}`,
//           photo: p.picture.large,
//         }));
//         setPatients(formatted);
//         setFilteredPatients(formatted);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching patients:", err);
//         setLoading(false);
//       });
//   }, []);

//   // Search Filter
//   useEffect(() => {
//     if (!search) setFilteredPatients(patients);
//     else {
//       const filtered = patients.filter((p) =>
//         p.name.toLowerCase().includes(search.toLowerCase())
//       );
//       setFilteredPatients(filtered);
//     }
//   }, [search, patients]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 py-12 px-6">
//       {loading && <Loader message="Loading patients..." />}

//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
//           Patient <span className="text-teal-600">Records</span>
//         </h1>

//         {/* Search Bar */}
//         <div className="mb-10 flex justify-center">
//           <input
//             type="text"
//             placeholder="🔍 Search patients by name..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full sm:w-2/3 lg:w-1/2 px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none shadow-sm"
//           />
//         </div>

//         {/* Patient Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredPatients.map((p) => (
//             <div
//               key={p.id}
//               className="bg-white/70 backdrop-blur-md border border-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer p-6 text-center"
//               onClick={() => setSelectedPatient(p)}
//             >
//               <img
//                 src={p.photo}
//                 alt={p.name}
//                 className="w-20 h-20 mx-auto rounded-full mb-3 border border-gray-200"
//               />
//               <h3 className="text-lg font-semibold text-gray-800">{p.name}</h3>
//               <p className="text-gray-600 text-sm">
//                 Age: {p.age} • {p.gender}
//               </p>
//               <p className="text-gray-600 text-sm">{p.contact}</p>
//               <button className="mt-3 bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-600 transition-all">
//                 View Details
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Patient Modal */}
//       {selectedPatient && (
//         <PatientModal
//           selectedPatient={selectedPatient}
//           setSelectedPatient={setSelectedPatient}
//         />
//       )}
//     </div>
//   );
// };

// export default PatientsPage;
