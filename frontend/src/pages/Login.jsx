import { useState } from "react";
import { apiRequest } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await apiRequest("/auth/login", "POST", {
      email,
      password,
    });
    login(data);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h2 className="text-xl mb-4 font-semibold">Login</h2>

        <input
          className="w-full mb-3 border p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-3 border p-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-black text-white p-2">Login</button>

        <p className="text-sm mt-3">
          Don't have an account?
          <a href="/register" className="underline text-blue-600">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
