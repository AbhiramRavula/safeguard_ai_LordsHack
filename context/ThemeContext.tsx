import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Load saved theme preference
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('isDarkMode');
      if (savedTheme !== null) {
        setIsDarkMode(JSON.parse(savedTheme));
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  const toggleDarkMode = async () => {
    try {
      const newValue = !isDarkMode;
      setIsDarkMode(newValue);
      await AsyncStorage.setItem('isDarkMode', JSON.stringify(newValue));
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Define theme colors
export const theme = {
  light: {
    background: '#f5f5f7',
    surface: '#ffffff',
    surfaceSecondary: '#f0f0f0',
    text: '#333333',
    textSecondary: '#666666',
    border: '#eaeaea',
    accent: '#4CAF50',
    accentLight: '#a5d6a7',
    error: '#F44336',
    errorLight: '#ffebee',
    warning: '#FF9800',
    warningLight: '#ffe0b2',
  },
  dark: {
    background: '#121212',
    surface: '#1e1e1e',
    surfaceSecondary: '#2c2c2c',
    text: '#ffffff',
    textSecondary: '#b3b3b3',
    border: '#2c2c2c',
    accent: '#66bb6a',
    accentLight: '#1b5e20',
    error: '#ef5350',
    errorLight: '#4c1515',
    warning: '#ffa726',
    warningLight: '#4d3319',
  },
};
