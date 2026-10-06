import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("netflix-theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("netflix-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      // Background colors
      primary: isDarkMode ? "bg-black" : "bg-white",
      secondary: isDarkMode ? "bg-gray-900" : "bg-gray-100",
      tertiary: isDarkMode ? "bg-gray-800" : "bg-gray-200",
      
      // Text colors
      text: isDarkMode ? "text-white" : "text-gray-900",
      textSecondary: isDarkMode ? "text-gray-300" : "text-gray-600",
      textTertiary: isDarkMode ? "text-gray-400" : "text-gray-500",
      
      // Border colors
      border: isDarkMode ? "border-gray-700" : "border-gray-300",
      borderLight: isDarkMode ? "border-gray-800" : "border-gray-200",
      
      // Input colors
      input: isDarkMode ? "bg-gray-700" : "bg-gray-100",
      inputBorder: isDarkMode ? "border-gray-600" : "border-gray-300",
      inputText: isDarkMode ? "text-white" : "text-gray-900",
      inputPlaceholder: isDarkMode ? "placeholder-gray-400" : "placeholder-gray-500",
      
      // Hover states
      hover: isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-200",
      hoverText: isDarkMode ? "hover:text-white" : "hover:text-gray-900",
      
      // Nav specific
      navBg: isDarkMode ? "from-black" : "from-white",
      navBgSolid: isDarkMode ? "bg-black" : "bg-white",
    },
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};