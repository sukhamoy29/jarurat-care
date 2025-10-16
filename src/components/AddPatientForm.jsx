import React, { useState } from "react";
import { useApp } from "../AppContext";
import { ArrowLeft, Calendar } from "lucide-react";
import Loader from "./Loader";

const AddPatientForm = () => {
  const { isAddingPatient, setIsAddingPatient, addPatient } = useApp();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    email: "",
    address: "",
    // medicalId: "",
    emergencyContact: "",
    bloodType: "",
    condition: "",
    lastVisit: "",
    medications: "",
    medicationList: [],
    allergies: "",
    allergiesList: [],
    notes: "",
  });

  const [errors, setErrors] = useState({});
  // processing state holds whether an overlay loader should show and the message to display
  const [processing, setProcessing] = useState({ active: false, message: "" });

  if (!isAddingPatient) return null;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Remove an item from a list (medications or allergies)
  const removeFromList = (listKey, index) => {
    setFormData((prev) => {
      const newList = [...(prev[listKey] || [])];
      newList.splice(index, 1);
      return { ...prev, [listKey]: newList };
    });
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.age) newErrors.age = "Age is required";
    if (!formData.contact) newErrors.contact = "Contact is required";
    // if (!formData.medicalId) newErrors.medicalId = "Medical ID is required";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    // show submitting loader briefly so user sees feedback
    setProcessing({ active: true, message: "Adding patient..." });
    setTimeout(() => {
      addPatient({
        ...formData,
        age: Number(formData.age),
        medications: formData.medicationList,
        allergies: formData.allergiesList.join(", "),
        lastVisit: formData.lastVisit || new Date().toISOString().split("T")[0],
      });

      // Reset form after submission
      setFormData({
        name: "",
        age: "",
        gender: "",
        contact: "",
        email: "",
        address: "",
        // medicalId: "",
        emergencyContact: "",
        bloodType: "",
        condition: "",
        lastVisit: "",
        medications: "",
        medicationList: [],
        allergies: "",
        allergiesList: [],
        notes: "",
      });
      setErrors({});
      setIsAddingPatient(false);
      setProcessing({ active: false, message: "" });
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
      {processing.active && <Loader message={processing.message} />}
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-8 relative overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-2">
          <button
            onClick={() => setIsAddingPatient(false)}
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={22} />
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Add New Patient</h2>
        </div>
        <p className="text-gray-500 mb-6">Create a new patient record</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="border border-gray-200 rounded-lg p-5 bg-gray-50/30">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-1 h-6 bg-teal-600 rounded"></div>
              <h3 className="text-gray-900 font-semibold text-lg">
                Personal Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter patient name"
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter age"
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                />
                {errors.age && (
                  <p className="text-red-600 text-sm mt-1">{errors.age}</p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none bg-white"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Blood Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Blood Type
                </label>
                <select
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none bg-white"
                >
                  <option value="">Select</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="border border-gray-200 rounded-lg p-5 bg-gray-50/30">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-1 h-6 bg-teal-600 rounded"></div>
              <h3 className="text-gray-900 font-semibold text-lg">
                Contact Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Emergency Contact
                </label>
                <input
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  placeholder="Enter emergency contact"
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
              {/* Last Visit Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Visit Date
                </label>
                <input
                  type="date"
                  name="lastVisit"
                  value={formData.lastVisit}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 
               focus:ring-2 focus:ring-teal-500 outline-none bg-white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <textarea
                  name="address"
                  rows={2}
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Medical Info */}
          <div className="border border-gray-200 rounded-lg p-5 bg-gray-50/30">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-1 h-6 bg-teal-600 rounded"></div>
              <h3 className="text-gray-900 font-semibold text-lg">
                Medical Information
              </h3>
            </div>

            {/* Condition */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Condition
              </label>
              <input
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                placeholder="Enter medical condition"
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            {/* Medications */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Medications
              </label>
              <div className="flex space-x-2 mt-1">
                <input
                  name="medications"
                  value={formData.medications}
                  onChange={handleChange}
                  placeholder="Add medication"
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (formData.medications.trim()) {
                      setFormData((prev) => ({
                        ...prev,
                        medicationList: [
                          ...(prev.medicationList || []),
                          formData.medications,
                        ],
                        medications: "",
                      }));
                    }
                  }}
                  className="border border-gray-300 px-2 py-1 rounded-md hover:bg-teal-100 transition shadow-md"
                >
                  +
                </button>
              </div>
              {formData.medicationList.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2 text-sm">
                  {formData.medicationList.map((item, i) => (
                    <span
                      key={i}
                      className="bg-teal-50 text-teal-700 border border-teal-500 px-2 py-1 rounded-full flex items-center gap-2"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => removeFromList("medicationList", i)}
                        className="text-teal-700 hover:text-red-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Allergies */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Allergies
              </label>
              <div className="flex space-x-2 mt-1">
                <input
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder="Add allergy"
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (formData.allergies.trim()) {
                      setFormData((prev) => ({
                        ...prev,
                        allergiesList: [
                          ...(prev.allergiesList || []),
                          formData.allergies,
                        ],
                        allergies: "",
                      }));
                    }
                  }}
                  className="border border-gray-300 px-2 py-1 rounded-md hover:bg-teal-100 transition shadow-md"
                >
                  +
                </button>
              </div>
              {formData.allergiesList.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2 text-sm">
                  {formData.allergiesList.map((item, i) => (
                    <span
                      key={i}
                      className="bg-teal-50 text-teal-700 border border-teal-500 px-2 py-1 rounded-full flex items-center gap-2"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => removeFromList("allergiesList", i)}
                        className="text-teal-700 hover:text-red-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="border border-gray-200 rounded-lg p-5 bg-gray-50/30">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-1 h-6 bg-gradient-to-r from-gray-200 to-slate-500 rounded"></div>
              <h3 className="text-gray-900 font-semibold text-lg">
                Additional Notes
              </h3>
            </div>
            <textarea
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
              placeholder="Additional notes"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 ">
            <button
              type="button"
              onClick={() => {
                setProcessing({ active: true, message: "Cancelling..." });
                setTimeout(() => {
                  setProcessing({ active: false, message: "" });
                  setIsAddingPatient(false);
                }, 500);
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition cursor-pointer"
              disabled={processing.active}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-teal-400 to-cyan-700 text-white rounded-md hover:bg-teal-700 transition cursor-pointer"
              disabled={processing.active}
            >
              Add Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatientForm;
