// ==========================================
// Barra de Navegación Superior Roja (Top Navbar)
// ==========================================

import React from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { type BreadcrumbItem as BreadcrumbItemType, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, KeyRound, LogOut, User } from 'lucide-react';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    const { auth } = usePage<SharedData>().props;
    const getInitials = useInitials();

    return (
        <header className="fixed top-0 left-0 right-0 w-full h-16 z-40 bg-[#991b1b] border-b border-red-950/40 flex items-center justify-between px-3 sm:px-6 shadow-md text-white">
            {/* Lado izquierdo: Identidad Escolar + Botón de Sidebar + Migas de Pan */}
            <div className="flex items-center gap-2 sm:gap-3">
                {/* Logo Escolar en la Navbar */}
                <Link href="/dashboard" className="flex items-center gap-2 mr-1 sm:mr-2">
                    <div className="flex aspect-square size-9 items-center justify-center rounded-lg bg-white p-0.5 shadow-sm shrink-0">
                        <img
                            src="/images/logo-secundaria.png"
                            alt="Escuela Secundaria del Estado"
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

                <SidebarTrigger className="text-white hover:text-white hover:bg-red-900/80 transition-colors cursor-pointer" />

                <div className="h-5 w-px bg-red-800/80 hidden sm:block" />

                <div className="text-white [&_a]:text-red-100 [&_a:hover]:text-white [&_span]:text-white [&_svg]:text-red-300 font-medium text-sm">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
            </div>

            {/* Lado derecho: Menú de Opciones del Usuario */}
            <div className="flex items-center gap-3">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            type="button"
                            className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-full sm:rounded-lg border border-red-700/60 bg-red-900/60 hover:bg-red-900 hover:border-red-600 transition-all cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-white/30"
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

                            <ChevronDown className="size-4 text-red-200 ml-0.5" />
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl shadow-xl border-neutral-200 bg-white z-50">
                        <DropdownMenuLabel className="p-3 bg-neutral-50 border-b border-neutral-100 rounded-t-xl">
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-neutral-900 truncate">
                                    {auth?.user?.name || 'Administrador'}
                                </span>
                                <span className="text-xs text-neutral-500 truncate mt-0.5">
                                    {auth?.user?.email || 'admin@secundaria.edu.mx'}
                                </span>
                            </div>
                        </DropdownMenuLabel>

                        <DropdownMenuGroup className="p-1">
                            <DropdownMenuItem asChild>
                                <Link
                                    href="/settings/profile"
                                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg cursor-pointer"
                                >
                                    <User className="size-4 text-neutral-500" />
                                    <span>Mi Perfil</span>
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem asChild>
                                <Link
                                    href="/settings/password"
                                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg cursor-pointer"
                                >
                                    <KeyRound className="size-4 text-neutral-500" />
                                    <span>Seguridad y Contraseña</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator className="my-1 bg-neutral-100" />

                        <div className="p-1">
                            <DropdownMenuItem asChild>
                                <Link
                                    method="post"
                                    href="/logout"
                                    as="button"
                                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg cursor-pointer font-medium"
                                >
                                    <LogOut className="size-4 text-red-600" />
                                    <span>Cerrar Sesión</span>
                                </Link>
                            </DropdownMenuItem>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
