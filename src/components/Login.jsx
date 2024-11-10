import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      setError(false);
      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 2000);
    } else if (username !== "admin") {
      setErrorMsg("Invalid username, please try again.");
      setError(true);
      setUsername("");
    } else if (password !== "admin") {
      setErrorMsg("Invalid password, please try again.");
      setError(true);
      setPassword("");
    }
  };

  return (
    <div className="mt-20 px-5 flex items-center justify-center h-[50vh]">
      <form
        onSubmit={handleLogin}
        className="w-full sm:w-1/3 flex flex-col items-center justify-center gap-5 bg-white p-10 rounded-md shadow-md"
      >
        <p className="text-3xl border-b border-gray-200 pb-2 w-full font-bold">
          Admin Login
        </p>
        <div className="flex flex-col w-full">
          <label htmlFor="username" className="text-sm text-gray-600">
            Username
          </label>
          <input
            type="text"
            value={username}
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="border border-gray-400 rounded-md px-2 py-1 shadow-md text-sm h-10"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="password" className="text-sm text-gray-600">
            Password
          </label>
          <input
            type="password"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border border-gray-400 rounded-md px-2 py-1 shadow-md text-sm h-10"
          />
        </div>
        <div className={`${error ? "flex flex-col w-full" : "hidden"}`}>
          {error && (
            <p className="text-sm border border-red-500 bg-red-100 px-2 py-1 text-red-500 rounded-md">
              {errorMsg}
            </p>
          )}
        </div>
        <div className={`${success ? "flex flex-col w-full" : "hidden"}`}>
          {success && (
            <p className="text-sm border border-green-500 bg-green-100 px-2 py-1 text-green-500 rounded-md">
              Login successful.
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-black hover:bg-gray-800 rounded-md text-white px-2 py-1 shadow-md"
        >
          Login
        </button>

        <p className="text-sm text-red-600">
          *This is just a prototype to show you how this app works. You can
          login with the following credentials or just navigate to the dashboard
          and explore the features.
          <br />
          <span className="text-gray-600">
            Username: <i className="font-bold">admin</i> <br />
            Password: <i className="font-bold">admin</i>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
