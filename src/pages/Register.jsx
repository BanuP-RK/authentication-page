import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!name) return setError("Name required");
    if (!email) return setError("Email required");
    if (!email.includes("@")) return setError("Enter valid email");
    if (!pass) return setError("Password required");

    const pattern =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#£$%^&*()]).{6,}$/;
    if (!pattern.test(pass))
      return setError(
        "Password must contain upper, lower case, number & special character"
      );

    // Save user in localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((u) => u.email === email)) {
      setError("Email already registered");
      return;
    }
    users.push({ name, email, password: pass });
    localStorage.setItem("users", JSON.stringify(users));

    setSuccessMessage("Registered successfully! Redirecting to Login...");
    setName(""); setEmail(""); setPass("");
    setTimeout(() => navigate("/login"), 2000);
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
          Register
        </h2>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 p-4 w-full outline-none text-sm text-[#7C98B3] border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 p-4 w-full outline-none text-sm text-[#7C98B3] border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="flex-1 p-4 w-full outline-none text-sm text-[#7C98B3] border rounded"
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {successMessage && (
            <p className="text-green-600 text-sm">{successMessage}</p>
          )}

          <button
            type="submit"
            className="bg-[#7C98B3] hover:bg-amber-500 text-white font-semibold py-2 rounded-lg shadow-md shadow-[#CADF9E]"
          >
            Register
          </button>

          <p className="mt-4 text-center text-sm text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
