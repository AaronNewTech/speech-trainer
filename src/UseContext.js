import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

function UseContext({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check local storage for user authentication status on component mount
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      setUser(true);
    }
  }, []);

  const login = () => {
    setUser(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const logout = () => {
    setUser(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export default UseContext;
export { useAuth };
