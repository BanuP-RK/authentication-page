import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("loggedInUser");

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center "style={{
        backgroundImage: "url('/bg-2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      <div className="bg-white p-8 rounded-xl shadow-xl w-96 text-center">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Dashboard</h2>
        <p className="text-gray-700 mb-6">
          Welcome, <span className="font-semibold">{email}</span>
        </p>
        <button
          onClick={handleLogout}
          className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
