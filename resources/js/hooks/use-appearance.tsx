// ==========================================
// Configuración de Apariencia del Sistema
// (Forzado a Modo Claro Institucional)
// ==========================================

import { useEffect, useState } from 'react';

export type Appearance = 'light' | 'dark' | 'system';

export function initializeTheme() {
    // Forzar siempre modo claro en toda la plataforma
    if (typeof document !== 'undefined') {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('appearance', 'light');
    }
}

export function useAppearance() {
    const [appearance, setAppearance] = useState<Appearance>('light');

    const updateAppearance = (_mode: Appearance) => {
        setAppearance('light');
        if (typeof document !== 'undefined') {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('appearance', 'light');
        }
    };

    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('appearance', 'light');
        }
    }, []);

    return { appearance, updateAppearance };
}
