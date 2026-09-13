// ==========================================
// Proveedor del Tema Material UI Escolar
// ==========================================

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { crearTemaMui } from '@/lib/theme';

interface AppThemeProviderProps {
    children: React.ReactNode;
}

export function AppThemeProvider({ children }: AppThemeProviderProps) {
    // Tema institucional en modo claro permanente
    const tema = React.useMemo(() => crearTemaMui(false), []);

    return (
        <ThemeProvider theme={tema}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}

export default AppThemeProvider;
