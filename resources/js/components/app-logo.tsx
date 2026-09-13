// ==========================================
// Logotipo Institucional de la Escuela
// ==========================================

import React from 'react';

export default function AppLogo() {
    return (
        <div className="flex items-center gap-2.5">
            <div className="flex aspect-square size-9 items-center justify-center rounded-lg bg-white p-0.5 shadow-sm">
                <img
                    src="/images/logo-secundaria.png"
                    alt="Escuela Secundaria del Estado"
                    className="size-full object-contain"
                />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-bold text-white tracking-tight">
                    Secundaria del Estado
                </span>
                <span className="truncate text-xs font-semibold text-red-200">
                    Turno Matutino
                </span>
            </div>
        </div>
    );
}
