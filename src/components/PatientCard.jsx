import React, { useState } from "react";
import { useApp } from "../AppContext";
import { Eye, Edit2, Trash2, Mail, Phone, Calendar, Heart } from "lucide-react";
import Swal from "sweetalert2";
import Loader from "./Loader";

const PatientCard = ({ patient }) => {
  const { setSelectedPatient, deletePatient } = useApp();
  const [processing, setProcessing] = useState({ active: false, message: "" });

  const handleDelete = () => {
    Swal.fire({
      title: `Delete ${patient.name}?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setProcessing({ active: true, message: "Deleting patient..." });
        setTimeout(() => {
          deletePatient(patient.id);
          setProcessing({ active: false, message: "" });
          Swal.fire("Deleted!", `${patient.name} has been removed.`, "success");
        }, 500);
      }
    });
  };

  const handleView = () => {
    setProcessing({ active: true, message: "Loading patient..." });
    setTimeout(() => {
      setProcessing({ active: false, message: "" });
      setSelectedPatient(patient);
    }, 500);
  };

  return (
    <div className="relative overflow-hidden rounded-xl p-6 shadow-inner hover:bg-gradient-to-br from-teal-50/80 via-cyan-50/60 to-teal-100/70 border border-teal-200 w-full min-h-[320px] flex flex-col justify-between ">
      {processing.active && <Loader message={processing.message} />}

      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-2xl font-bold text-teal-900 truncate">
            {patient.name}
          </h3>
          <div className="mt-1 text-sm text-teal-700">
            <span className="mr-3">{patient.age} years</span>
            <span className="capitalize">{patient.gender}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs font-medium text-teal-800 bg-teal-100/80 px-3 py-1 rounded-full shadow-sm">
            {patient.bloodType || "O+"}
          </span>
          <span className="text-xs font-medium text-teal-800 bg-teal-100/80 px-3 py-1 rounded-full shadow-sm">
            ID: {patient.medicalId || "N/A"}
          </span>
        </div>
      </div>

      {/* Contact Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-teal-800">
        <div className="flex items-center gap-2">
          <Mail size={16} />
          <span className="text-gray-700 truncate">{patient.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={16} />
          <span className="text-gray-700 truncate">{patient.contact}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span className="text-gray-700">
            Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
          </span>
        </div>
      </div>

      <hr className="border-t border-teal-200 my-3" />

      {/* Buttons */}
      <div className="flex items-center justify-start gap-2 mt-3">
        <button
          onClick={handleView}
          className="flex items-center gap-2 bg-teal-800 text-white px-6 py-2 rounded-md shadow hover:opacity-95 transition cursor-pointer"
          disabled={processing.active}
        >
          <Eye size={16} />
          <span>View</span>
        </button>

        <button
          onClick={handleDelete}
          aria-label="delete"
          className="w-10 h-10 rounded-md bg-white/60 flex items-center justify-center shadow hover:bg-white/80 transition cursor-pointer"
          disabled={processing.active}
        >
          <Trash2 size={16} className="text-red-600" />
        </button>
      </div>
    </div>
  );
};

export default React.memo(PatientCard);
