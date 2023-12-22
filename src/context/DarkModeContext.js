// DarkModeContext.js
import { createContext, useContext, useState } from 'react';

export const DarkModeContext = createContext(null);

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false); // Assuming initial state is false

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};
