// ==========================================
// Layout Principal Escolar (Navbar + Sidebar)
// ==========================================

import React from 'react';
import { SidebarProvider, useSidebarEscolar } from '@/contexts/sidebar-context';
import { NavbarEscolar } from '@/components/escolar/navbar-escolar';
import { SidebarEscolar } from '@/components/escolar/sidebar-escolar';
import { CargandoRouterListener } from '@/components/escolar/cargando-spinner';
import { type BreadcrumbItem } from '@/types';

// Contenedor principal que se desplaza suavemente al colapsar la barra lateral
function ContenedorPrincipal({ children }: { children: React.ReactNode }) {
    const { sidebarAbierta } = useSidebarEscolar();

    return (
        <main
            className={`
                flex-1 w-full min-h-[calc(100vh-4rem)] bg-slate-50 transition-all duration-200 ease-in-out
                ${sidebarAbierta ? 'md:ml-64' : 'md:ml-20'}
            `}
        >
            {children}
        </main>
    );
}

export default function AppSidebarLayout({ children, breadcrumbs = [] }: { children: React.ReactNode; breadcrumbs?: BreadcrumbItem[] }) {
    return (
        <SidebarProvider>
            <div className="min-h-screen bg-slate-50 text-neutral-900 flex flex-col font-sans">
                {/* 1. Indicador de carga de páginas (círculo rojo) */}
                <CargandoRouterListener />

                {/* 2. Barra de Navegación Superior Fija al 100% de ancho */}
                <NavbarEscolar breadcrumbs={breadcrumbs} />

                {/* 3. Contenedor inferior: Sidebar posicionado a la izquierda debajo de la Navbar + Contenido */}
                <div className="flex w-full pt-16 min-h-screen">
                    <SidebarEscolar />
                    <ContenedorPrincipal>
                        {children}
                    </ContenedorPrincipal>
                </div>
            </div>
        </SidebarProvider>
    );
}
