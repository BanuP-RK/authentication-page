import React, { useState, useEffect } from "react";
import { UserPlus, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");

  const navigate = useNavigate();

  // Load saved email ONCE
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email required");
      return;
    }
    if (!email.includes("@")) {
      setError("Enter a valid email");
      return;
    }
    if (!pass) {
      setError("Password required");
      return;
    }

    // Check users in localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email && u.password === pass);

    if (user) {
      setSuccessMessage("Logged in successfully!");
      if (rememberMe) localStorage.setItem("email", email);
      else localStorage.removeItem("email");

      localStorage.setItem("loggedInUser", email);
      setTimeout(() => navigate("/dashboard"), 1000);
    } else {
      setError("Invalid email or password");
    }

    setPass("");
  };

  const handleResetPassword = () => {
    if (!resetEmail) {
      setResetError("Email required");
      setResetSuccess("");
      return;
    } else if (!resetEmail.includes("@")) {
      setResetError("Enter a valid email");
      setResetSuccess("");
      return;
    }

    setResetError("");
    setResetSuccess("If this email exists, we sent a reset link!");
    setResetEmail("");

    setTimeout(() => {
      setIsModalOpen(false);
      setResetSuccess("");
    }, 3000);
  };

  return (
    <div
      className="h-screen flex items-center justify-end"
      style={{
        backgroundImage: "url('/bg-2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="p-8 rounded-xl shadow-xl shadow-[#2708A0] w-80 bg-amber-50 mr-10">
        <h2 className="text-[#7C98B3] text-2xl font-extrabold mb-6 text-center">
          Login
        </h2>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center rounded-lg border border-gray-300 w-full focus-within:border-blue-500 px-2">
            <UserPlus className="w-4 h-4 flex-shrink-0 text-gray-400" />
            <input
              id="email"
              type="email"
              value={email}
              className="flex-1 p-4 w-full outline-none text-sm text-[#7C98B3]"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center px-2 rounded-lg border border-gray-300 w-full focus-within:border-blue-500">
            <Lock className="w-4 h-4 flex-shrink-0 text-gray-400"></Lock>
            <input
              id="password"
              type="password"
              value={pass}
              className="flex-1 p-4 w-full outline-none text-sm text-[#7C98B3]"
              placeholder="Enter your password"
              onChange={(e) => {
                setPass(e.target.value);
                setError("");
              }}
            />
          </div>

          <div className="flex items-center text-sm text-[#7C98B3]">
            <input
              id="remember"
              type="checkbox"
              className="mr-2"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember" className="mr-0">
              Remember me
            </label>
          </div>

          {error && <p className="font-light text-sm text-red-600">{error}</p>}
          {successMessage && (
            <p className="font-light text-sm text-green-600">{successMessage}</p>
          )}

          <button
            type="submit"
            className="bg-[#7C98B3] hover:bg-amber-500 text-white font-semibold py-2 rounded-lg transition shadow-md shadow-[#CADF9E]"
          >
            Submit
          </button>

          <div className="flex items-center justify-end">
            <a
              href="#"
              className="underline text-sm text-[#7C98B3]"
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(true);
              }}
            >
              Forgot password?
            </a>
          </div>

          <p className="mt-4 text-center text-sm text-gray-700">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-no-repeat bg-cover bg-center">
          <div className="bg-white p-6 rounded-xl w-80 shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-4 text-center">
              Reset Password
            </h3>
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-2 border rounded mb-2"
            />
            {resetError && <p className="text-red-500 text-sm">{resetError}</p>}
            {resetSuccess && (
              <p className="text-green-500 text-sm">{resetSuccess}</p>
            )}
            <button
              className="w-full bg-[#7C98B3] text-white py-2 rounded mt-2"
              onClick={() => handleResetPassword()}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
