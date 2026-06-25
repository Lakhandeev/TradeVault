import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type ThemeType =
  | "futuristic"
  | "professional";

type ThemeContextType = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
};

const ThemeContext =
  createContext<ThemeContextType>({
theme: "professional",    setTheme: () => {},
  });

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] =
  useState<ThemeType>("professional");
  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    const savedTheme =
      await AsyncStorage.getItem("theme");

    if (
      savedTheme === "futuristic" ||
      savedTheme === "professional"
    ) {
      setThemeState(savedTheme);
    }
  };

  const setTheme = async (
    newTheme: ThemeType
  ) => {
    setThemeState(newTheme);

    await AsyncStorage.setItem(
      "theme",
      newTheme
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () =>
  useContext(ThemeContext);