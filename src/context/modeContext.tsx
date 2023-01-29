import { createContext, useCallback, useMemo, useState } from "react";

// check if dark mode is enabled from user's browser
const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

type ModeContextValue = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export const ModeContext = createContext<ModeContextValue>({
  darkMode: isDarkMode,
  toggleDarkMode: () => {
    throw new Error(
      "attemp to toggle dark mode outside of ModeProvider, please initialize the ModeContext with ModeProvider"
    );
  }
});

export const ModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = useState(isDarkMode);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    navigator?.vibrate(100);
  }, [darkMode]);

  const contextValue = useMemo(() => ({ darkMode, toggleDarkMode }), [darkMode, toggleDarkMode]);

  return <ModeContext.Provider value={contextValue}>{children}</ModeContext.Provider>;
};
