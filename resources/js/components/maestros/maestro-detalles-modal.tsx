// ==========================================
// Componente Modal de Detalles del Maestro
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
    BookOpen,
    Briefcase,
    Mail,
    Phone,
    UserCheck,
    Users,
} from 'lucide-react';

// Componentes Escolares
import { EstatusBadge } from '@/components/escolar/estatus-badge';

// Tipos
import { Maestro } from '@/types/escolar';

interface MaestroDetallesModalProps {
    abierto: boolean;
    maestro: Maestro | null;
    onCerrar: () => void;
    onEditar: (maestro: Maestro) => void;
}

export function MaestroDetallesModal({
    abierto,
    maestro,
    onCerrar,
    onEditar,
}: MaestroDetallesModalProps) {
    if (!maestro) return null;

    const nombreCompleto = maestro.nombre_completo || `${maestro.nombre} ${maestro.apellido_paterno} ${maestro.apellido_materno || ''}`;

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
                    <UserCheck className="size-6 text-red-600" />
                    <div>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#991b1b', lineHeight: 1.2 }}>
                            {nombreCompleto}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {maestro.puesto} — <span className="uppercase font-semibold">{maestro.tipo_personal}</span>
                        </Typography>
                    </div>
                </Box>
                <EstatusBadge estatus={maestro.estatus} tipo="maestro" />
            </DialogTitle>

            <DialogContent sx={{ py: 3 }}>
                <Grid container spacing={3}>
                    {/* Tarjeta de Identificación y Fiscal */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, height: '100%' }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Briefcase className="size-4 text-red-600" />
                                IDENTIFICACIÓN LABORAL
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">Tipo de Personal:</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                                        {maestro.tipo_personal}
                                    </Typography>
                                </Box>
                                <Divider />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">CURP:</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }} className="font-mono">
                                        {maestro.curp}
                                    </Typography>
                                </Box>
                                <Divider />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">RFC:</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }} className="font-mono">
                                        {maestro.rfc || 'No registrado'}
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Tarjeta de Contacto */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, height: '100%' }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Mail className="size-4 text-red-600" />
                                CONTACTO INSTITUCIONAL
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Mail className="size-4 text-neutral-500" />
                                    <div>
                                        <Typography variant="caption" color="text.secondary">Correo Electrónico</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                            {maestro.correo}
                                        </Typography>
                                    </div>
                                </Box>
                                <Divider />
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Phone className="size-4 text-neutral-500" />
                                    <div>
                                        <Typography variant="caption" color="text.secondary">Teléfono de Contacto</Typography>
                                        <Typography variant="body2">
                                            {maestro.telefono || 'Sin teléfono registrado'}
                                        </Typography>
                                    </div>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Materias que Imparte */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, height: '100%' }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <BookOpen className="size-4 text-red-600" />
                                MATERIAS QUE IMPARTE ({maestro.materias?.length || 0})
                            </Typography>

                            {!maestro.materias || maestro.materias.length === 0 ? (
                                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                    No tiene materias asignadas actualmente.
                                </Typography>
                            ) : (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {maestro.materias.map((materia, idx) => (
                                        <Chip
                                            key={idx}
                                            label={materia}
                                            size="medium"
                                            sx={{ bgcolor: '#fef2f2', color: '#991b1b', fontWeight: 600 }}
                                        />
                                    ))}
                                </Box>
                            )}
                        </Paper>
                    </Grid>

                    {/* Grupos Asignados */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, height: '100%' }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Users className="size-4 text-red-600" />
                                GRUPOS ASIGNADOS ({maestro.grupos?.length || 0})
                            </Typography>

                            {!maestro.grupos || maestro.grupos.length === 0 ? (
                                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                    No tiene grupos asignados actualmente.
                                </Typography>
                            ) : (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {maestro.grupos.map((grupo, idx) => (
                                        <Chip
                                            key={idx}
                                            label={`Grupo ${grupo}`}
                                            size="medium"
                                            color="primary"
                                            variant="outlined"
                                            sx={{ fontWeight: 600 }}
                                        />
                                    ))}
                                </Box>
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
                        onEditar(maestro);
                    }}
                    variant="contained"
                    color="primary"
                >
                    Editar Docente
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default MaestroDetallesModal;
