import { createContext, useContext, useState, useEffect } from 'react';

export const DarkModeContext = createContext(null);

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if window and localStorage are available (browser environment)
    if (typeof window !== 'undefined') {
      const storedMode = localStorage.getItem('darkMode') === 'true';
      setDarkMode(storedMode);
    }
  }, []);

  const toggleDarkMode = () => {
    const updatedMode = !darkMode;
    setDarkMode(updatedMode);

    // Save to local storage (only in the browser)
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', updatedMode.toString());
    }
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
