// ==========================================
// Componente de Controles de Paginación
// ==========================================

import React from 'react';
import { Link } from '@inertiajs/react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PaginacionData, PaginacionLinks } from '@/types/escolar';

interface PaginacionControlsProps<T> {
    paginacion: PaginacionData<T>;
}

export function PaginacionControls<T>({ paginacion }: PaginacionControlsProps<T>) {
    if (paginacion.last_page <= 1) return null;

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2,
                mt: 3,
                px: 1,
            }}
        >
            <Typography variant="body2" color="text.secondary">
                Mostrando {paginacion.from ?? 0} a {paginacion.to ?? 0} de {paginacion.total} registros
            </Typography>

            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                {paginacion.links.map((link: PaginacionLinks, index: number) => {
                    const esAnterior = link.label.includes('Previous') || link.label.includes('&laquo;');
                    const esSiguiente = link.label.includes('Next') || link.label.includes('&raquo;');
                    let etiqueta = link.label;
                    if (esAnterior) etiqueta = '« Anterior';
                    if (esSiguiente) etiqueta = 'Siguiente »';

                    if (!link.url) {
                        return (
                            <Button
                                key={index}
                                size="small"
                                disabled
                                variant="text"
                                sx={{ minWidth: 36, opacity: 0.5 }}
                            >
                                {etiqueta}
                            </Button>
                        );
                    }

                    return (
                        <Link key={index} href={link.url} preserveScroll preserveState>
                            <Button
                                size="small"
                                variant={link.active ? 'contained' : 'outlined'}
                                color={link.active ? 'primary' : 'inherit'}
                                sx={{
                                    minWidth: 36,
                                    px: 1.5,
                                    borderColor: link.active ? 'primary.main' : 'divider',
                                }}
                            >
                                {etiqueta}
                            </Button>
                        </Link>
                    );
                })}
            </Box>
        </Box>
    );
}

export default PaginacionControls;
