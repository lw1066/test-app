'use client';

import { ThemeProvider } from 'next-themes';
import { DarkModeProvider, UseDarkMode } from '../context/DarkModeContext';
import { AuthContextProvider } from '@/context/AuthContext';

const Provider = ({ children }) => {

    return (
        <ThemeProvider>
            <DarkModeProvider>
                <AuthContextProvider>
                    {children}
                </AuthContextProvider>
            </DarkModeProvider>
        </ThemeProvider>
    )

};

export default Provider;

