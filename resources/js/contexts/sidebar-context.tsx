// ==========================================
// Contexto de Estado de la Sidebar Escolar
// ==========================================

import React, { createContext, useContext, useEffect, useState } from 'react';

// Tipado del Contexto
interface SidebarContextType {
    sidebarAbierta: boolean;
    sidebarMovilAbierta: boolean;
    toggleSidebar: () => void;
    toggleSidebarMovil: () => void;
    cerrarSidebarMovil: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
    // Estado de colapso en escritorio
    const [sidebarAbierta, setSidebarAbierta] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            const guardado = localStorage.getItem('sidebar_escolar_abierta');
            return guardado !== null ? guardado === 'true' : true;
        }
        return true;
    });

    // Estado para drawer en móviles
    const [sidebarMovilAbierta, setSidebarMovilAbierta] = useState<boolean>(false);

    // Alternar visibilidad en escritorio
    const toggleSidebar = () => {
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            setSidebarMovilAbierta((prev) => !prev);
        } else {
            setSidebarAbierta((prev) => {
                const nuevoValor = !prev;
                localStorage.setItem('sidebar_escolar_abierta', String(nuevoValor));
                return nuevoValor;
            });
        }
    };

    // Alternar en móvil
    const toggleSidebarMovil = () => {
        setSidebarMovilAbierta((prev) => !prev);
    };

    // Cerrar en móvil
    const cerrarSidebarMovil = () => {
        setSidebarMovilAbierta(false);
    };

    // Cerrar menú móvil al cambiar de tamaño de ventana a escritorio
    useEffect(() => {
        const manejarResize = () => {
            if (window.innerWidth >= 768) {
                setSidebarMovilAbierta(false);
            }
        };

        window.addEventListener('resize', manejarResize);
        return () => window.removeEventListener('resize', manejarResize);
    }, []);

    return (
        <SidebarContext.Provider
            value={{
                sidebarAbierta,
                sidebarMovilAbierta,
                toggleSidebar,
                toggleSidebarMovil,
                cerrarSidebarMovil,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
}

// Hook personalizado para consumir el contexto
export function useSidebarEscolar() {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebarEscolar debe utilizarse dentro de un SidebarProvider');
    }
    return context;
}
