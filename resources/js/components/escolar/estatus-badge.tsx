// ==========================================
// Componente de Badge de Estatus Escolar
// ==========================================

import Chip from '@mui/material/Chip';

interface EstatusBadgeProps {
    estatus: string;
    tipo?: 'alumno' | 'maestro';
}

export function EstatusBadge({ estatus, tipo = 'alumno' }: EstatusBadgeProps) {
    // Normalizar texto
    const clave = estatus.toLowerCase();

    // Mapeo de colores y etiquetas
    let color: 'success' | 'error' | 'warning' | 'default' | 'info' = 'default';
    let etiqueta = estatus;

    if (clave === 'activo') {
        color = 'success';
        etiqueta = 'Activo';
    } else if (clave === 'baja' || clave === 'inactivo') {
        color = 'error';
        etiqueta = clave === 'baja' ? 'Baja' : 'Inactivo';
    } else if (clave === 'egresado') {
        color = 'info';
        etiqueta = 'Egresado';
    } else if (clave === 'suspendido' || clave === 'licencia') {
        color = 'warning';
        etiqueta = clave === 'suspendido' ? 'Suspendido' : 'Licencia';
    }

    return (
        <Chip
            size="small"
            label={etiqueta}
            color={color}
            variant="outlined"
            sx={{
                fontWeight: 600,
                fontSize: '0.75rem',
                textTransform: 'capitalize',
            }}
        />
    );
}

export default EstatusBadge;
