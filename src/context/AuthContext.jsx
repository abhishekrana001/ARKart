import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// Sample initial user for instant testing if storage is empty
const INITIAL_DEMO_USERS = [
  {
    name: "Abhishek",
    email: "abhishek@arkart.com",
    password: "password123",
    phone: "9876543210",
    joined: "30 Sep 2026",
  },
];

export function AuthProvider({ children }) {
  // All registered users stored in localStorage
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem("arkart_users");
      if (saved) return JSON.parse(saved);
      localStorage.setItem("arkart_users", JSON.stringify(INITIAL_DEMO_USERS));
      return INITIAL_DEMO_USERS;
    } catch {
      return INITIAL_DEMO_USERS;
    }
  });

  // Current logged in user session
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("arkart_current_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("arkart_users", JSON.stringify(users));
    } catch {
      // ignore
    }
  }, [users]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem("arkart_current_user", JSON.stringify(currentUser));
        // Keep legacy key synced for compatibility
        localStorage.setItem("arkart_user", JSON.stringify(currentUser));
      } else {
        localStorage.removeItem("arkart_current_user");
        localStorage.removeItem("arkart_user");
      }
    } catch {
      // ignore
    }
  }, [currentUser]);

  // Register a new user
  const register = ({ name, email, password, phone }) => {
    const cleanEmail = email.trim().toLowerCase();

    // Check if user already exists
    const existing = users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return { success: false, message: "An account with this email already exists." };
    }

    const newUser = {
      id: "USR-" + Date.now(),
      name: name.trim(),
      email: cleanEmail,
      password: password,
      phone: phone ? phone.trim() : "",
      joined: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUser(newUser);

    return { success: true, user: newUser };
  };

  // Login existing user
  const login = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const user = users.find(
      (u) => u.email.toLowerCase() === cleanEmail && u.password === password
    );

    if (!user) {
      return { success: false, message: "Invalid email address or password." };
    }

    setCurrentUser(user);
    return { success: true, user };
  };

  // Logout current user
  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout, users }}>
      {children}
    </AuthContext.Provider>
  );
}
