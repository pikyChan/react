import React from "react";
import { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    const handleLogout = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          localStorage.removeItem("isLoggedIn");
          window.location.href = "/login";
        } else {
          console.error("Logout failed");
        }
      } catch (error) {
        console.error("Logout error:", error);
      }
    };
    handleLogout();
  }, []);
  return null;
};

export default Logout;
