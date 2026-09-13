// ==========================================
// Configuración de Tema Material UI (MUI)
// ==========================================

import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Definición de paleta institucional en tonos rojos
export const crearTemaMui = (modoOscuro: boolean = false) => {
    let tema = createTheme({
        palette: {
            mode: modoOscuro ? 'dark' : 'light',
            primary: {
                main: '#dc2626',      // Rojo 600
                light: '#ef4444',     // Rojo 500
                dark: '#991b1b',      // Rojo 800
                contrastText: '#ffffff',
            },
            secondary: {
                main: '#b91c1c',      // Rojo 700
                light: '#f87171',     // Rojo 400
                dark: '#7f1d1d',      // Rojo 900
                contrastText: '#ffffff',
            },
            error: {
                main: '#e11d48',
            },
            warning: {
                main: '#f59e0b',
            },
            info: {
                main: '#3b82f6',
            },
            success: {
                main: '#10b981',
            },
            background: {
                default: modoOscuro ? '#09090b' : '#fcfcfc',
                paper: modoOscuro ? '#18181b' : '#ffffff',
            },
        },
        typography: {
            fontFamily: [
                'Instrument Sans',
                'system-ui',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                'sans-serif',
            ].join(','),
            button: {
                textTransform: 'none',
                fontWeight: 600,
            },
        },
        shape: {
            borderRadius: 10,
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        padding: '8px 16px',
                        boxShadow: 'none',
                        '&:hover': {
                            boxShadow: '0 2px 8px rgba(220, 38, 38, 0.25)',
                        },
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 12,
                        boxShadow: modoOscuro
                            ? '0 1px 3px 0 rgba(0, 0, 0, 0.5)'
                            : '0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
                    },
                },
            },
            MuiChip: {
                styleOverrides: {
                    root: {
                        fontWeight: 500,
                        borderRadius: 6,
                    },
                },
            },
        },
    });

    return responsiveFontSizes(tema);
};

export const temaPredeterminado = crearTemaMui(false);
