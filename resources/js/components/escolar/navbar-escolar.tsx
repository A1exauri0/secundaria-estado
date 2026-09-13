// ==========================================
// Barra de Navegación Superior Roja (Navbar Escolar)
// ==========================================

import React, { useState, useRef, useEffect } from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { useSidebarEscolar } from '@/contexts/sidebar-context';
import { type BreadcrumbItem as BreadcrumbItemType, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, KeyRound, LogOut, Menu, User } from 'lucide-react';

interface NavbarEscolarProps {
    breadcrumbs?: BreadcrumbItemType[];
}

export function NavbarEscolar({ breadcrumbs = [] }: NavbarEscolarProps) {
    const { auth } = usePage<SharedData>().props;
    const getInitials = useInitials();
    const { toggleSidebar } = useSidebarEscolar();

    // Estado del menú desplegable de usuario
    const [menuUsuarioAbierto, setMenuUsuarioAbierto] = useState<boolean>(false);
    const refMenu = useRef<HTMLDivElement>(null);

    // Cerrar el menú al hacer clic fuera
    useEffect(() => {
        const manejarClicFuera = (e: MouseEvent) => {
            if (refMenu.current && !refMenu.current.contains(e.target as Node)) {
                setMenuUsuarioAbierto(false);
            }
        };

        if (menuUsuarioAbierto) {
            document.addEventListener('mousedown', manejarClicFuera);
        }

        return () => {
            document.removeEventListener('mousedown', manejarClicFuera);
        };
    }, [menuUsuarioAbierto]);

    return (
        <header className="fixed top-0 left-0 right-0 w-full h-16 z-40 bg-[#991b1b] border-b border-red-950/40 flex items-center justify-between px-3 sm:px-6 shadow-md text-white">
            {/* Lado izquierdo: Botón Hamburguesa + Logotipo + Migas de Pan */}
            <div className="flex items-center gap-2 sm:gap-3.5">
                {/* Botón de Menú Hamburguesa */}
                <button
                    type="button"
                    onClick={toggleSidebar}
                    className="p-1.5 sm:p-2 rounded-lg text-white hover:bg-red-900/80 active:bg-red-950 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer"
                    aria-label="Abrir o cerrar menú de navegación"
                >
                    <Menu className="size-6 text-white" />
                </button>

                <div className="h-5 w-px bg-red-800/80 hidden sm:block" />

                {/* Logotipo e Identidad Escolar */}
                <Link href="/dashboard" className="flex items-center gap-2 mr-1 sm:mr-2">
                    <div className="flex aspect-square size-9 items-center justify-center rounded-lg bg-white p-0.5 shadow-xs shrink-0">
                        <img
                            src="/images/logo-secundaria.png"
                            alt="Escudo Escuela Secundaria del Estado"
                            className="size-full object-contain"
                        />
                    </div>
                    <div className="hidden lg:flex flex-col text-left">
                        <span className="truncate text-sm font-bold text-white tracking-tight leading-tight">
                            Secundaria del Estado
                        </span>
                        <span className="truncate text-xs font-semibold text-red-200">
                            Turno Matutino
                        </span>
                    </div>
                </Link>

                <div className="h-5 w-px bg-red-800/80 hidden lg:block" />

                {/* Migas de Pan */}
                <div className="hidden md:block text-white [&_a]:text-red-100 [&_a:hover]:text-white [&_span]:text-white [&_svg]:text-red-300 font-medium text-sm">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
            </div>

            {/* Lado derecho: Menú de Usuario con Dropdown Autónomo (sin bloqueos de DOM) */}
            <div className="relative" ref={refMenu}>
                <button
                    type="button"
                    onClick={() => setMenuUsuarioAbierto((prev) => !prev)}
                    className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-full sm:rounded-lg border border-red-700/60 bg-red-900/60 hover:bg-red-900 hover:border-red-600 transition-all cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                    aria-expanded={menuUsuarioAbierto}
                >
                    <Avatar className="size-8 border border-white/20 bg-white text-red-800">
                        <AvatarImage src={auth?.user?.avatar} alt={auth?.user?.name} />
                        <AvatarFallback className="bg-white text-red-900 font-bold text-xs">
                            {auth?.user ? getInitials(auth.user.name) : 'AD'}
                        </AvatarFallback>
                    </Avatar>

                    <div className="hidden md:flex flex-col text-left">
                        <span className="text-sm font-semibold text-white leading-tight">
                            {auth?.user?.name || 'Administrador'}
                        </span>
                        <span className="text-xs text-red-200 font-medium">
                            Control Escolar
                        </span>
                    </div>

                    <ChevronDown
                        className={`size-4 text-red-200 ml-0.5 transition-transform duration-200 ${
                            menuUsuarioAbierto ? 'rotate-180' : ''
                        }`}
                    />
                </button>

                {/* Dropdown del Menú de Usuario */}
                {menuUsuarioAbierto && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-2xl border border-neutral-200 bg-white z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                        <div className="p-3 bg-neutral-50 border-b border-neutral-100">
                            <span className="block text-sm font-bold text-neutral-900 truncate">
                                {auth?.user?.name || 'Administrador'}
                            </span>
                            <span className="block text-xs text-neutral-500 truncate mt-0.5">
                                {auth?.user?.email || 'admin@secundaria.edu.mx'}
                            </span>
                        </div>

                        <div className="p-1 space-y-0.5">
                            <Link
                                href="/settings/profile"
                                onClick={() => setMenuUsuarioAbierto(false)}
                                className="flex items-center gap-2.5 px-3 py-2 text-sm text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg cursor-pointer transition-colors"
                            >
                                <User className="size-4 text-neutral-500" />
                                <span>Mi Perfil</span>
                            </Link>

                            <Link
                                href="/settings/password"
                                onClick={() => setMenuUsuarioAbierto(false)}
                                className="flex items-center gap-2.5 px-3 py-2 text-sm text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg cursor-pointer transition-colors"
                            >
                                <KeyRound className="size-4 text-neutral-500" />
                                <span>Seguridad y Contraseña</span>
                            </Link>
                        </div>

                        <div className="border-t border-neutral-100 p-1">
                            <Link
                                method="post"
                                href="/logout"
                                as="button"
                                onClick={() => setMenuUsuarioAbierto(false)}
                                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg cursor-pointer font-medium transition-colors"
                            >
                                <LogOut className="size-4 text-red-600" />
                                <span>Cerrar Sesión</span>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
