import React, { useState } from "react";
import { useApp } from "../AppContext";
import Swal from "sweetalert2";
import Loader from "./Loader";

const PatientModal = () => {
  const { selectedPatient, setSelectedPatient, deletePatient } = useApp();
  const [processing, setProcessing] = useState({ active: false, message: "" });
  if (!selectedPatient) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-lg px-2 sm:px-4">
      <div className="relative w-full max-w-3xl sm:rounded-2xl rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white/80 backdrop-blur-lg border border-white/20 animate-fadeIn overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-b from-teal-50/80 to-white/70 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-start border-b border-gray-200/60">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
              {selectedPatient.name}
            </h2>
            <p className="text-gray-600 text-sm truncate">
              {selectedPatient.condition}
            </p>
          </div>
          <button
            onClick={() => {
              setProcessing({ active: true, message: "Closing..." });
              setTimeout(() => {
                setProcessing({ active: false, message: "" });
                setSelectedPatient(null);
              }, 500);
            }}
            className="text-gray-500 hover:text-gray-700 text-xl font-semibold transition-transform duration-200 hover:scale-110 ml-2 flex-shrink-0 cursor-pointer"
          >
            ✕
          </button>
          {processing.active && <Loader message={processing.message} />}
        </div>

        {/* Body */}
        <div className="px-4 sm:px-6 py-4 space-y-6 overflow-y-auto flex-1">
          {/* Quick Info Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl text-center bg-white/60 shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <p className="text-gray-500 text-xs sm:text-sm">Age</p>
              <p className="font-semibold text-base sm:text-lg text-gray-900">
                {selectedPatient.age}
              </p>
            </div>
            <div className="p-3 rounded-xl text-center bg-white/60 shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <p className="text-gray-500 text-xs sm:text-sm">Gender</p>
              <p className="font-semibold text-base sm:text-lg text-gray-900">
                {selectedPatient.gender || "—"}
              </p>
            </div>
            <div className="p-3 rounded-xl text-center bg-white/60 shadow-lg border border-gray-100 hover:shadow-md transition-all">
              <p className="text-gray-500 text-xs sm:text-sm">Blood Type</p>
              <p className="font-semibold text-base sm:text-lg text-gray-900">
                {selectedPatient.bloodType}
              </p>
            </div>
            <div className="p-3 rounded-xl text-center bg-teal-100/50 shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <p className="text-gray-500 text-xs sm:text-sm">Last Visit</p>
              <p className="font-semibold text-base sm:text-lg text-gray-900">
                {selectedPatient.lastVisit}
              </p>
            </div>
          </div>

          {/* Personal Information */}
          <div className="border-t border-white pt-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-1 h-5 bg-teal-600 rounded"></div>
              <h3 className="text-gray-800 font-semibold text-base sm:text-lg">
                Personal Information
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
              {/* Full Name */}
              <div>
                <p className="text-gray-500 text-sm font-medium">Full Name</p>
                <p className="mt-0.5 text-gray-800 font-semibold">
                  {selectedPatient.name || "—"}
                </p>
              </div>

              {/* Age */}
              <div>
                <p className="text-gray-500 text-sm font-medium">Age</p>
                <p className="mt-0.5 text-gray-800 font-semibold">
                  {selectedPatient.age ? `${selectedPatient.age} years` : "—"}
                </p>
              </div>

              {/* Gender */}
              <div>
                <p className="text-gray-500 text-sm font-medium">Gender</p>
                <p className="mt-0.5 text-gray-800 font-semibold">
                  {selectedPatient.gender || "N/A"}
                </p>
              </div>

              {/* Blood Type */}
              <div>
                <p className="text-gray-500 text-sm font-medium">Blood Type</p>
                <p className="mt-0.5 text-gray-800 font-semibold">
                  {selectedPatient.bloodType || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="border-t border-white pt-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-1 h-5 bg-teal-600 rounded"></div>
              <h3 className="text-gray-800 font-semibold text-base sm:text-lg">
                Personal Information
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
              {/* Email */}
              <div>
                <p className="text-gray-500 text-sm font-medium">Email</p>
                <p className="mt-0.5 text-gray-800 font-semibold break-words">
                  {selectedPatient.email || "—"}
                </p>
              </div>

              {/* Phone */}
              <div>
                <p className="text-gray-500 text-sm font-medium">Phone</p>
                <p className="mt-0.5 text-gray-800 font-semibold">
                  {selectedPatient.contact || "—"}
                </p>
              </div>

              {/* Address */}
              <div className="">
                <p className="text-gray-500 text-sm font-medium">Address</p>
                <p className="mt-0.5 text-gray-800 font-semibold break-words">
                  {selectedPatient.address || "—"}
                </p>
              </div>

              {/* Emergency Contact */}
              <div className="">
                <p className="text-gray-500 text-sm font-medium">Emergency</p>
                <p className="mt-0.5 text-gray-800 font-semibold">
                  {selectedPatient.emergencyContact || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Medical Info */}
          <div className="border-t border-white pt-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-1 h-5 bg-teal-600 rounded"></div>
              <h3 className="text-gray-800 font-semibold text-base sm:text-lg">
                Personal Information
              </h3>
            </div>
            <div>
              <h3 className="text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                Primary Condition
              </h3>
              <span className="inline-block bg-green-100 text-green-800 text-xs sm:text-sm font-medium px-3 py-1 rounded-full shadow-sm">
                {selectedPatient.condition}
              </span>
            </div>

            {selectedPatient.medications?.length > 0 && (
              <div className="mt-3">
                <h3 className="text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                  Current Medications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPatient.medications.map((m, i) => (
                    <span
                      key={i}
                      className="inline-block bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium shadow-sm"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedPatient.allergies && (
              <div className="mt-3">
                <h3 className="text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                  Known Allergies
                </h3>
                <span className="inline-flex items-center bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium shadow-sm">
                  ⚠ {selectedPatient.allergies}
                </span>
              </div>
            )}
          </div>

          {/* Notes */}
          {selectedPatient.notes && (
            <div className="border-t border-white pt-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-1 h-5 bg-teal-600 rounded"></div>
                <h3 className="text-gray-800 font-semibold text-base sm:text-lg">
                  Clinical Notes
                </h3>
              </div>

              <div className="bg-white/60 border border-gray-100 p-3 rounded-lg text-gray-700 text-sm shadow-sm">
                {selectedPatient.notes}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 px-4 sm:px-6 py-4 bg-gradient-to-b from-teal-50/80 to-white/70 backdrop-blur-md border-t border-white/20">
          <button
            onClick={() => {
              setProcessing({ active: true, message: "Closing..." });
              setTimeout(() => {
                setProcessing({ active: false, message: "" });
                setSelectedPatient(null);
              }, 500);
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-lg bg-teal-200/50 hover:bg-teal-200/90 text-gray-700 font-medium shadow-md transition-all cursor-pointer"
          >
            Close
          </button>
          <div className="flex gap-2 justify-end w-full sm:w-auto ">
            <button
              onClick={() => {
                Swal.fire({
                  title: `Delete ${selectedPatient.name}?`,
                  text: "This action cannot be undone!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#d33",
                  cancelButtonColor: "#3085d6",
                  confirmButtonText: "Yes, delete it!",
                  cancelButtonText: "Cancel",
                }).then((result) => {
                  if (result.isConfirmed) {
                    setProcessing({
                      active: true,
                      message: "Deleting patient...",
                    });
                    setTimeout(() => {
                      deletePatient(selectedPatient.id);
                      setSelectedPatient(null);
                      setProcessing({ active: false, message: "" });
                      Swal.fire(
                        "Deleted!",
                        `${selectedPatient.name} has been removed.`,
                        "success"
                      );
                    }, 500);
                  }
                });
              }}
              className="flex-1 sm:flex-none px-4 py-2 bg-red-100/80 text-red-600 rounded-lg hover:bg-red-200 flex items-center justify-center gap-1 shadow-sm hover:shadow-md transition-all text-sm sm:text-base cursor-pointer"
              disabled={processing.active}
            >
              🗑 Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientModal;
