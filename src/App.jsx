import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./AppContext";
import Header from "./components/Header";
import PatientModal from "./components/PatientModal";
import AddPatientForm from "./components/AddPatientForm";

import HomePage from "./pages/HomePage";
import PatientsPage from "./pages/PatientsPage";
import AboutPage from "./pages/AboutPage";
import Footer from "./pages/Footer";
function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/patients" element={<PatientsPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>
          <PatientModal />
          <AddPatientForm />
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
