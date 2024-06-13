"use client";

import { ThemeProvider } from "next-themes";
import { DarkModeProvider, useDarkMode } from "../context/DarkModeContext";
import { AuthContextProvider } from "@/context/AuthContext";
import { ModalProvider } from "@/context/ModalContext";

const Provider = ({ children }) => {
  return (
    <ThemeProvider>
      <DarkModeProvider>
        <AuthContextProvider>
          <ModalProvider>{children}</ModalProvider>
        </AuthContextProvider>
      </DarkModeProvider>
    </ThemeProvider>
  );
};

export default Provider;
