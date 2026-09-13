// ==========================================
// Menú Principal del Sidebar Escolar
// ==========================================

import React from 'react';
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel className="text-red-200/70 text-xs font-semibold tracking-wider uppercase">
                Módulos Escolares
            </SidebarGroupLabel>
            <SidebarMenu className="gap-1 mt-1">
                {items.map((item) => {
                    const estaActivo = page.url === item.url || page.url.startsWith(`${item.url}/`);
                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={estaActivo}
                                className={`text-white/90 hover:text-white hover:bg-red-900/60 font-medium transition-colors ${
                                    estaActivo ? 'bg-red-900 text-white font-bold shadow-xs' : ''
                                }`}
                            >
                                <Link href={item.url} prefetch>
                                    {item.icon && <item.icon className="size-4 shrink-0 text-red-200" />}
                                    <span className="text-sm">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
