import { useState } from "react";

function Signup() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignup = (e) => {
    e.preventDefault();

    if (!form.fullName || !form.email || !form.password || !form.confirm) {
      return setError("All fields are required");
    }

    if (!validateEmail(form.email)) {
      return setError("Invalid email format");
    }

    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    if (form.password !== form.confirm) {
      return setError("Passwords do not match");
    }

    // Save in localStorage
    localStorage.setItem("user", JSON.stringify(form));

    setError("");
    alert("Signup Successful!");
  };

  return (
    <form
      onSubmit={handleSignup}
      className="w-80 bg-white p-6 rounded shadow"
    >
      <h2 className="text-xl font-bold mb-4">Signup</h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        className="w-full border p-2 mb-3"
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full border p-2 mb-3"
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full border p-2 mb-3"
        onChange={handleChange}
      />

      <input
        type="password"
        name="confirm"
        placeholder="Confirm Password"
        className="w-full border p-2 mb-3"
        onChange={handleChange}
      />

      <button className="w-full bg-blue-500 text-white py-2 rounded">
        Sign Up
      </button>
    </form>
  );
}

export default Signup;
