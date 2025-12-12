import { useState } from "react";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      return setError("No user found! Please signup first.");
    }

    if (form.email !== savedUser.email || form.password !== savedUser.password) {
      return setError("Invalid email or password");
    }

    setError("");
    alert("Login Successful!");
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-80 bg-white p-6 rounded shadow"
    >
      <h2 className="text-xl font-bold mb-4">Login</h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}

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

      <button className="w-full bg-blue-500 text-white py-2 rounded">
        Login
      </button>
    </form>
  );
}

export default Login;
