// ==========================================
// Componente Modal de Detalles del Tutor
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
import Chip from '@mui/material/Chip';

// Iconos
import {
    Briefcase,
    GraduationCap,
    Mail,
    MapPin,
    Phone,
    Users,
} from 'lucide-react';

// Tipos
import { Tutor } from '@/types/escolar';

interface TutorDetallesModalProps {
    abierto: boolean;
    tutor: Tutor | null;
    onCerrar: () => void;
    onEditar: (tutor: Tutor) => void;
}

export function TutorDetallesModal({
    abierto,
    tutor,
    onCerrar,
    onEditar,
}: TutorDetallesModalProps) {
    if (!tutor) return null;

    const nombreCompleto = tutor.nombre_completo || `${tutor.nombre} ${tutor.apellido_paterno} ${tutor.apellido_materno || ''}`;

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
                    <Users className="size-6 text-red-600" />
                    <div>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#991b1b', lineHeight: 1.2 }}>
                            {nombreCompleto}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Parentesco: <strong className="text-red-700">{tutor.parentesco_predeterminado}</strong> {tutor.ocupacion ? `— ${tutor.ocupacion}` : ''}
                        </Typography>
                    </div>
                </Box>
                <Chip
                    label={`${tutor.alumnos?.length || 0} Alumno(s)`}
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ fontWeight: 'bold' }}
                />
            </DialogTitle>

            <DialogContent sx={{ py: 3 }}>
                <Grid container spacing={3}>
                    {/* Datos de Contacto */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, height: '100%' }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Phone className="size-4 text-red-600" />
                                INFORMACIÓN DE CONTACTO
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Phone className="size-4 text-neutral-500" />
                                    <div>
                                        <Typography variant="caption" color="text.secondary">Teléfono Principal</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                            {tutor.telefono}
                                        </Typography>
                                    </div>
                                </Box>
                                <Divider />
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Phone className="size-4 text-neutral-500" />
                                    <div>
                                        <Typography variant="caption" color="text.secondary">Teléfono Secundario</Typography>
                                        <Typography variant="body2">
                                            {tutor.telefono_secundario || 'No registrado'}
                                        </Typography>
                                    </div>
                                </Box>
                                <Divider />
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Mail className="size-4 text-neutral-500" />
                                    <div>
                                        <Typography variant="caption" color="text.secondary">Correo Electrónico</Typography>
                                        <Typography variant="body2">
                                            {tutor.correo || 'Sin correo registrado'}
                                        </Typography>
                                    </div>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Domicilio y Ocupación */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, height: '100%' }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <MapPin className="size-4 text-red-600" />
                                DOMICILIO Y PERFIL
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Briefcase className="size-4 text-neutral-500" />
                                    <div>
                                        <Typography variant="caption" color="text.secondary">Ocupación / Empleo</Typography>
                                        <Typography variant="body2">
                                            {tutor.ocupacion || 'No especificada'}
                                        </Typography>
                                    </div>
                                </Box>
                                <Divider />
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                                    <MapPin className="size-4 text-neutral-500 mt-1" />
                                    <div>
                                        <Typography variant="caption" color="text.secondary">Dirección / Residencia</Typography>
                                        <Typography variant="body2">
                                            {tutor.direccion || 'Sin dirección registrada'}
                                        </Typography>
                                    </div>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Alumnos Vinculados */}
                    <Grid size={{ xs: 12 }}>
                        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <GraduationCap className="size-4 text-red-600" />
                                ALUMNOS O TUTELADOS BAJO SU RESPONSABILIDAD ({tutor.alumnos?.length || 0})
                            </Typography>

                            {!tutor.alumnos || tutor.alumnos.length === 0 ? (
                                <Box sx={{ p: 2, textAlign: 'center', bgcolor: 'action.hover', borderRadius: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Este tutor no tiene alumnos asignados actualmente.
                                    </Typography>
                                </Box>
                            ) : (
                                <Grid container spacing={2}>
                                    {tutor.alumnos.map((alumno) => (
                                        <Grid size={{ xs: 12, sm: 6 }} key={alumno.id}>
                                            <Box
                                                sx={{
                                                    p: 2,
                                                    border: '1px solid',
                                                    borderColor: 'divider',
                                                    borderRadius: 2,
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    bgcolor: 'background.paper',
                                                }}
                                            >
                                                <div>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                                        {alumno.nombre_completo || `${alumno.nombre} ${alumno.apellido_paterno} ${alumno.apellido_materno || ''}`}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        Matrícula: {alumno.matricula}
                                                    </Typography>
                                                </div>
                                                <Chip
                                                    label={`${alumno.grado} "${alumno.grupo}"`}
                                                    size="small"
                                                    sx={{ bgcolor: '#fef2f2', color: '#991b1b', fontWeight: 'bold' }}
                                                />
                                            </Box>
                                        </Grid>
                                    ))}
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
                        onEditar(tutor);
                    }}
                    variant="contained"
                    color="primary"
                >
                    Editar Tutor
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default TutorDetallesModal;
