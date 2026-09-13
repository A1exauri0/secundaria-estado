// ==========================================
// Barra Lateral Escolar (Sidebar)
// ==========================================

import React from 'react';
import { NavMain } from '@/components/nav-main';
import {
    Sidebar,
    SidebarContent,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { GraduationCap, LayoutGrid, UserCheck, Users } from 'lucide-react';

// Elementos de navegación del sistema escolar
const itemsNavegacion: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Alumnos',
        url: '/alumnos',
        icon: GraduationCap,
    },
    {
        title: 'Maestros y Personal',
        url: '/maestros',
        icon: UserCheck,
    },
    {
        title: 'Tutores',
        url: '/tutores',
        icon: Users,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="sidebar" className="border-r border-red-950/40">
            <SidebarContent className="pt-4">
                <NavMain items={itemsNavegacion} />
            </SidebarContent>
        </Sidebar>
    );
}
