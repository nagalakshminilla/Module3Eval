import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check localStorage for existing session
    const storedUser = localStorage.getItem('restaurantUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password) => {
    // Hardcoded credentials
    const users = [
      { email: 'admin@gmail.com', password: 'admin1234', role: 'admin' },
      { email: 'customer@gmail.com', password: 'customer1234', role: 'customer' }
    ];

    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = { 
        email: foundUser.email, 
        role: foundUser.role 
      };
      setUser(userData);
      localStorage.setItem('restaurantUser', JSON.stringify(userData));
      return { success: true, role: foundUser.role };
    }
    
    return { success: false, message: 'Invalid email or password' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('restaurantUser');
  };

  const value = {
    user,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};