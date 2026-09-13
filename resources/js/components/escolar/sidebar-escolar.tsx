// ==========================================
// Barra Lateral Escolar Roja (Sidebar Escolar)
// ==========================================

import React from 'react';
import { useSidebarEscolar } from '@/contexts/sidebar-context';
import { Link, usePage } from '@inertiajs/react';
import {
    GraduationCap,
    LayoutGrid,
    UserCheck,
    UserCog,
    Users,
    X,
} from 'lucide-react';
import Tooltip from '@mui/material/Tooltip';

interface ItemNavegacion {
    titulo: string;
    url: string;
    icono: React.ElementType;
}

const itemsNavegacion: ItemNavegacion[] = [
    {
        titulo: 'Dashboard',
        url: '/dashboard',
        icono: LayoutGrid,
    },
    {
        titulo: 'Alumnos',
        url: '/alumnos',
        icono: GraduationCap,
    },
    {
        titulo: 'Maestros y Personal',
        url: '/maestros',
        icono: UserCheck,
    },
    {
        titulo: 'Tutores',
        url: '/tutores',
        icono: Users,
    },
    {
        titulo: 'Usuarios',
        url: '/usuarios',
        icono: UserCog,
    },
];

export function SidebarEscolar() {
    const page = usePage();
    const { sidebarAbierta, sidebarMovilAbierta, cerrarSidebarMovil } = useSidebarEscolar();

    return (
        <>
            {/* Backdrop para móviles */}
            {sidebarMovilAbierta && (
                <div
                    onClick={cerrarSidebarMovil}
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden transition-opacity duration-200"
                    aria-hidden="true"
                />
            )}

            {/* Contenedor Principal de la Sidebar */}
            <aside
                className={`
                    fixed top-16 bottom-0 z-40 bg-[#7f1d1d] border-r border-red-950/40 text-white
                    transition-all duration-200 ease-in-out flex flex-col justify-between
                    ${/* Comportamiento móvil */ ''}
                    ${sidebarMovilAbierta ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'}
                    ${/* Comportamiento escritorio */ ''}
                    ${sidebarAbierta ? 'md:w-64' : 'md:w-20'}
                `}
            >
                {/* Cabecera Móvil con botón para cerrar */}
                <div className="flex md:hidden items-center justify-between px-4 py-3 border-b border-red-900/40">
                    <span className="text-xs font-bold uppercase tracking-wider text-red-200">
                        Menú Escolar
                    </span>
                    <button
                        type="button"
                        onClick={cerrarSidebarMovil}
                        className="p-1 rounded-md text-red-200 hover:text-white hover:bg-red-900/60 transition-colors"
                        aria-label="Cerrar menú"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                {/* Lista de Navegación con Scrollbar personalizado y fino */}
                <div className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto overflow-x-hidden [scrollbar-width:thin] [scrollbar-color:#5c1010_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-red-950 [&::-webkit-scrollbar-track]:bg-transparent">
                    {/* Etiqueta de Sección en Escritorio */}
                    {sidebarAbierta && (
                        <div className="hidden md:block px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-red-200/70">
                            Módulos Escolares
                        </div>
                    )}

                    {itemsNavegacion.map((item) => {
                        const Icono = item.icono;
                        const estaActivo = page.url === item.url || page.url.startsWith(`${item.url}/`);

                        const enlace = (
                            <Link
                                key={item.url}
                                href={item.url}
                                onClick={cerrarSidebarMovil}
                                prefetch
                                className={`
                                    flex items-center gap-3.5 px-3.5 py-3 rounded-xl font-medium transition-all duration-150
                                    ${estaActivo
                                        ? 'bg-red-950 text-white font-bold shadow-sm border border-red-800/40'
                                        : 'text-red-100 hover:text-white hover:bg-red-900/60'
                                    }
                                    ${!sidebarAbierta ? 'md:justify-center md:px-0' : ''}
                                `}
                            >
                                <Icono className={`size-5 shrink-0 ${estaActivo ? 'text-white' : 'text-red-200'}`} />
                                {sidebarAbierta && (
                                    <span className="truncate text-sm">
                                        {item.titulo}
                                    </span>
                                )}
                            </Link>
                        );

                        if (!sidebarAbierta) {
                            return (
                                <Tooltip key={item.url} title={item.titulo} placement="right" arrow>
                                    <div>{enlace}</div>
                                </Tooltip>
                            );
                        }

                        return enlace;
                    })}
                </div>

            </aside>
        </>
    );
}
