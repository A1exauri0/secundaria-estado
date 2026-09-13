// ==========================================
// Componente de Círculo de Carga Rojo (Spinner)
// ==========================================

import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { router } from '@inertiajs/react';

interface CargandoSpinnerProps {
    tamano?: number;
    grosor?: number;
    mensaje?: string;
    pantallaCompleta?: boolean;
}

export function CargandoSpinner({
    tamano = 40,
    grosor = 4,
    mensaje,
    pantallaCompleta = false,
}: CargandoSpinnerProps) {
    if (pantallaCompleta) {
        return (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-xs transition-opacity duration-200">
                <CircularProgress
                    size={tamano}
                    thickness={grosor}
                    sx={{ color: '#dc2626' }}
                />
                {mensaje && (
                    <Typography
                        variant="body2"
                        sx={{ mt: 2, color: '#991b1b', fontWeight: 600, letterSpacing: 0.3 }}
                    >
                        {mensaje}
                    </Typography>
                )}
            </div>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 2 }}>
            <CircularProgress
                size={tamano}
                thickness={grosor}
                sx={{ color: '#dc2626' }}
            />
            {mensaje && (
                <Typography variant="caption" sx={{ mt: 1, color: '#7f1d1d', fontWeight: 600 }}>
                    {mensaje}
                </Typography>
            )}
        </Box>
    );
}

// Escuchador global de navegación de Inertia para mostrar spinner rojo durante cambios de página
export function CargandoRouterListener() {
    const [cargandoPagina, setCargandoPagina] = useState<boolean>(false);

    useEffect(() => {
        const desuscribirInicio = router.on('start', () => {
            setCargandoPagina(true);
        });

        const desuscribirFin = router.on('finish', () => {
            setCargandoPagina(false);
        });

        return () => {
            desuscribirInicio();
            desuscribirFin();
        };
    }, []);

    if (!cargandoPagina) return null;

    return (
        <div className="fixed top-3 right-20 z-50 flex items-center gap-2 bg-white/95 px-3 py-1.5 rounded-full shadow-lg border border-red-200 animate-in fade-in zoom-in-95 duration-150">
            <CircularProgress size={18} thickness={5} sx={{ color: '#dc2626' }} />
            <span className="text-xs font-bold text-red-800">Cargando...</span>
        </div>
    );
}
