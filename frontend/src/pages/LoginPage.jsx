import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../api/authApi";
import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();


  const handleLogin = async(e) => {
    e.preventDefault();
 try {
    const res = await axios.post("http://localhost:4000/api/auth/login", {
      username,
      password,
    });
    const token = res.data.token;
    localStorage.setItem("token", token); 
    login(token); 
    navigate("/"); 
  } catch (err) {
    console.error(err);
    setError("Invalid credentials");
  }
  };

 return (
    <div className="p-6 max-w-md mx-auto mt-20 border rounded-lg shadow-md bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button className="bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
