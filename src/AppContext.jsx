import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
  useEffect,
} from "react";
import { mockPatients } from "./data/mockPatients";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [patients, setPatients] = useState(() => {
    const stored = localStorage.getItem("patients");
    return stored ? JSON.parse(stored) : mockPatients;
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAddingPatient, setIsAddingPatient] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Simulated API fetch (replace later with backend call)
  const fetchPatients = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800)); // simulate delay
      setPatients(mockPatients);
    } catch (err) {
      setError(err?.message || "Failed to fetch patients.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const filteredPatients = useMemo(() => {
    if (!searchQuery) return patients;
    return patients.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.contact.includes(searchQuery) ||
        p.medicalId.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [patients, searchQuery]);

  // Save patients to localStorage whenever patients change
  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  const addPatient = (newPatient) => {
    const id = patients.length ? Math.max(...patients.map((p) => p.id)) + 1 : 1;
    setPatients([...patients, { ...newPatient, id }]);
  };

  const deletePatient = (id) => {
    setPatients(patients.filter((p) => p.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        patients,
        filteredPatients,
        fetchPatients,
        searchQuery,
        setSearchQuery,
        selectedPatient,
        setSelectedPatient,
        isLoading,
        error,
        isAddingPatient,
        setIsAddingPatient,
        mobileMenuOpen,
        setMobileMenuOpen,
        addPatient,
        deletePatient,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// react-refresh requires files to only export components; this file also exports a hook used across the app
// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => useContext(AppContext);
