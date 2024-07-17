"use client";

import { ThemeProvider } from "next-themes";
import { DarkModeProvider, useDarkMode } from "../context/DarkModeContext";
import { AuthContextProvider } from "@/context/AuthContext";
import { ModalProvider } from "@/context/ModalContext";
import { BookProvider } from "@/context/updateContext";

const Provider = ({ children }) => {
  return (
    <ThemeProvider>
      <DarkModeProvider>
        <AuthContextProvider>
          <BookProvider>
            <ModalProvider>{children}</ModalProvider>
          </BookProvider>
        </AuthContextProvider>
      </DarkModeProvider>
    </ThemeProvider>
  );
};

export default Provider;
