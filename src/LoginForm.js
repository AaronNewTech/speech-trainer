import React, { useState, useEffect } from "react";
import { useAuth } from "./UseContext"; // Import the useAuth hook

function LoginForm({ email, setEmail }) {
  const { user, login, logout } = useAuth();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if the user is logged in on component mount
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      login(true); // Update the user state using the login function from useAuth
    }
  }, [login]);

  const handleLogin = async () => {
    try {
      const response = await fetch("https://arnhsmith.pythonanywhere.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Login successful, update your app's state to indicate the user is logged in
          login(); // Update the user state using the login function from useAuth
          localStorage.setItem("isLoggedIn", "true"); // Store login status
          setEmail(""); // Clear email field
          setPassword(""); // Clear password field
          setError(""); // Clear error

          // console.log("user logged in");
        } else {
          // Login failed, display an error message
          setError("Invalid email or password.");
        }
      } else {
        // Request failed for some reason, display a general error message
        setError("Login failed. Please try again later.");
      }
    } catch (error) {
      // Handle any unexpected errors here
      console.error("Error:", error);
    }
  };

  const handleLogout = () => {
    // Logout the user by removing their login status from localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.clear();
    logout(); // Update the user state using the logout function from useAuth
  };

  return (
    <div id="login-container">
      {user ? (
        <>
          <p id="logged-in-message" >Welcome back, {email}! You are now logged in.</p>
          <button id="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <form className="login-form">
          <div>
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button id="button" type="button" onClick={handleLogin}>
            Submit
          </button>
        </form>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div id="create-account-container">
        <p id="create-account-text">Not Registered?</p>
        <a id="create-account-link" href="/create-account">
          Create an account
        </a>
      </div>
    </div>
  );
}

export default LoginForm;
