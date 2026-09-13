// ==========================================
// Componente Modal de Detalles del Alumno
// ==========================================

// Importaciones de React
import React from 'react';

// Componentes de Material UI
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';

// Iconos
import {
    Calendar,
    GraduationCap,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
    User,
    Users,
} from 'lucide-react';

// Componentes Escolares
import { EstatusBadge } from '@/components/escolar/estatus-badge';

// Tipos
import { Alumno } from '@/types/escolar';

interface AlumnoDetallesModalProps {
    abierto: boolean;
    alumno: Alumno | null;
    onCerrar: () => void;
    onEditar: (alumno: Alumno) => void;
}

export function AlumnoDetallesModal({
    abierto,
    alumno,
    onCerrar,
    onEditar,
}: AlumnoDetallesModalProps) {
    if (!alumno) return null;

    const nombreCompleto = alumno.nombre_completo || `${alumno.nombre} ${alumno.apellido_paterno} ${alumno.apellido_materno || ''}`;

    return (
        <Dialog
            open={abierto}
            onClose={onCerrar}
            maxWidth="md"
            fullWidth
            slotProps={{
                paper: {
                    sx: { borderRadius: 3 },
                },
            }}
        >
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#fef2f2',
                    borderBottom: '1px solid #fee2e2',
                    py: 2,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <GraduationCap className="size-6 text-red-600" />
                    <div>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#991b1b', lineHeight: 1.2 }}>
                            {nombreCompleto}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Matrícula: <strong className="font-mono">{alumno.matricula}</strong>
                        </Typography>
                    </div>
                </Box>
                <EstatusBadge estatus={alumno.estatus} />
            </DialogTitle>

            <DialogContent sx={{ py: 3 }}>
                <Grid container spacing={3}>
                    {/* Tarjeta de Datos Escolares */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, height: '100%' }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <GraduationCap className="size-4 text-red-600" />
                                INFORMACIÓN ESCOLAR
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">Grado y Grupo:</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                        {alumno.grado} de Secundaria - Grupo "{alumno.grupo}"
                                    </Typography>
                                </Box>
                                <Divider />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">CURP:</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }} className="font-mono">
                                        {alumno.curp}
                                    </Typography>
                                </Box>
                                <Divider />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">Sexo:</Typography>
                                    <Typography variant="body2">
                                        {alumno.sexo === 'M' ? 'Masculino' : alumno.sexo === 'F' ? 'Femenino' : 'Otro'}
                                    </Typography>
                                </Box>
                                <Divider />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">Fecha de Nacimiento:</Typography>
                                    <Typography variant="body2">
                                        {alumno.fecha_nacimiento}
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Tarjeta de Contacto y Domicilio */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, height: '100%' }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <User className="size-4 text-red-600" />
                                DATOS DE CONTACTO Y DOMICILIO
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Mail className="size-4 text-neutral-500" />
                                    <div>
                                        <Typography variant="caption" color="text.secondary">Correo Institucional</Typography>
                                        <Typography variant="body2">
                                            {alumno.correo_institucional || 'Sin correo registrado'}
                                        </Typography>
                                    </div>
                                </Box>
                                <Divider />
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Phone className="size-4 text-neutral-500" />
                                    <div>
                                        <Typography variant="caption" color="text.secondary">Teléfono Alumno</Typography>
                                        <Typography variant="body2">
                                            {alumno.telefono || 'Sin teléfono propio'}
                                        </Typography>
                                    </div>
                                </Box>
                                <Divider />
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                                    <MapPin className="size-4 text-neutral-500 mt-1" />
                                    <div>
                                        <Typography variant="caption" color="text.secondary">Dirección / Residencia</Typography>
                                        <Typography variant="body2">
                                            {alumno.direccion}
                                        </Typography>
                                    </div>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Tutores y Responsables */}
                    <Grid size={{ xs: 12 }}>
                        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Users className="size-4 text-red-600" />
                                TUTORES / RESPONSABLES LEGALES ({alumno.tutores?.length || 0})
                            </Typography>

                            {!alumno.tutores || alumno.tutores.length === 0 ? (
                                <Box sx={{ p: 2, textAlign: 'center', bgcolor: 'action.hover', borderRadius: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        No hay tutores asociados a este alumno.
                                    </Typography>
                                </Box>
                            ) : (
                                <Grid container spacing={2}>
                                    {alumno.tutores.map((tutor) => {
                                        const esPrincipal = Boolean(tutor.pivot?.es_contacto_principal);
                                        const parentesco = tutor.pivot?.parentesco || tutor.parentesco_predeterminado;

                                        return (
                                            <Grid size={{ xs: 12, sm: 6 }} key={tutor.id}>
                                                <Box
                                                    sx={{
                                                        p: 2,
                                                        border: '1px solid',
                                                        borderColor: esPrincipal ? 'error.light' : 'divider',
                                                        bgcolor: esPrincipal ? '#fef2f2' : 'background.paper',
                                                        borderRadius: 2,
                                                    }}
                                                >
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                                            {tutor.nombre_completo || `${tutor.nombre} ${tutor.apellido_paterno}`}
                                                        </Typography>
                                                        {esPrincipal && (
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#dc2626' }}>
                                                                <ShieldCheck className="size-4" />
                                                                <Typography variant="caption" sx={{ fontWeight: 'bold' }}>Principal</Typography>
                                                            </Box>
                                                        )}
                                                    </Box>

                                                    <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', mb: 1 }}>
                                                        Parentesco: <strong>{parentesco}</strong>
                                                    </Typography>

                                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <Phone className="size-3.5 text-neutral-500" />
                                                            {tutor.telefono}
                                                        </Typography>
                                                        {tutor.correo && (
                                                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                <Mail className="size-3.5 text-neutral-500" />
                                                                {tutor.correo}
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                <Button onClick={onCerrar} variant="outlined" color="inherit">
                    Cerrar
                </Button>
                <Button
                    onClick={() => {
                        onCerrar();
                        onEditar(alumno);
                    }}
                    variant="contained"
                    color="primary"
                >
                    Editar Alumno
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AlumnoDetallesModal;
