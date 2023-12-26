import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const handleLogin = async () => {
    console.warn(email, password);

    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    if (result?.auth) {
      //   localStorage.setItem("user", JSON.stringify(result));
      localStorage.setItem("user", JSON.stringify(result?.result));
      localStorage.setItem("token", JSON.stringify(result?.auth));
      navigate("/");
    } else {
      alert("Please enter connect details");
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        className="inputBox"
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button className="appButton" type="button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
