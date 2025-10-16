import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useApp } from "../AppContext";

const Navigation = ({ mobile = false }) => {
  const location = useLocation();
  const { setMobileMenuOpen } = useApp();

  const items = [
    { name: "Home", path: "/" },
    { name: "Patients", path: "/patients" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav
      className={mobile ? "px-4 py-3 space-y-1" : "hidden md:flex space-x-4"}
    >
      {items.map(({ name, path }) => (
        <Link
          key={name}
          to={path}
          onClick={() => mobile && setMobileMenuOpen(false)}
          className={`block px-3 py-2 rounded-md text-lg font-medium ${
            location.pathname === path
              ? "bg-teal-100 text-teal-700"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          {name}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
