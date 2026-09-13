// ==========================================
// Componente Modal para Crear / Editar Tutor
// ==========================================

// Importaciones de React e Inertia
import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

// Componentes de Material UI
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';

// Iconos
import { Users } from 'lucide-react';

// Tipos
import { Alumno, Tutor } from '@/types/escolar';

interface TutorModalProps {
    abierto: boolean;
    tutorParaEditar: Tutor | null;
    listaAlumnos: Alumno[];
    onCerrar: () => void;
}

export function TutorModal({
    abierto,
    tutorParaEditar,
    listaAlumnos,
    onCerrar,
}: TutorModalProps) {
    // Formulario de Inertia
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        parentesco_predeterminado: 'Padre',
        telefono: '',
        telefono_secundario: '',
        correo: '',
        direccion: '',
        ocupacion: '',
        alumnos_ids: [] as number[],
    });

    // Cargar información al abrir el modal
    useEffect(() => {
        if (tutorParaEditar) {
            setData({
                nombre: tutorParaEditar.nombre || '',
                apellido_paterno: tutorParaEditar.apellido_paterno || '',
                apellido_materno: tutorParaEditar.apellido_materno || '',
                parentesco_predeterminado: tutorParaEditar.parentesco_predeterminado || 'Padre',
                telefono: tutorParaEditar.telefono || '',
                telefono_secundario: tutorParaEditar.telefono_secundario || '',
                correo: tutorParaEditar.correo || '',
                direccion: tutorParaEditar.direccion || '',
                ocupacion: tutorParaEditar.ocupacion || '',
                alumnos_ids: (tutorParaEditar.alumnos || []).map((a) => a.id),
            });
        } else {
            reset();
        }
        clearErrors();
    }, [tutorParaEditar, abierto]);

    // Manejador de envío
    const manejarEnvio = (e: React.FormEvent) => {
        e.preventDefault();
        if (tutorParaEditar) {
            put(`/tutores/${tutorParaEditar.id}`, {
                onSuccess: () => onCerrar(),
            });
        } else {
            post('/tutores', {
                onSuccess: () => onCerrar(),
            });
        }
    };

    return (
        <Dialog
            open={abierto}
            onClose={processing ? undefined : onCerrar}
            maxWidth="md"
            fullWidth
            slotProps={{
                paper: {
                    sx: { borderRadius: 3 },
                },
            }}
        >
            <form onSubmit={manejarEnvio}>
                <DialogTitle
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        backgroundColor: '#fef2f2',
                        color: '#991b1b',
                        fontWeight: 'bold',
                        borderBottom: '1px solid #fee2e2',
                        py: 2,
                    }}
                >
                    <Users className="size-6 text-red-600" />
                    {tutorParaEditar ? 'Editar Tutor / Padre de Familia' : 'Registrar Nuevo Tutor'}
                </DialogTitle>

                <DialogContent sx={{ py: 3 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', mb: 2, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: 1 }}>
                        Datos Personales del Tutor
                    </Typography>

                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                                label="Nombre(s)"
                                value={data.nombre}
                                onChange={(e) => setData('nombre', e.target.value)}
                                error={!!errors.nombre}
                                helperText={errors.nombre}
                                required
                                fullWidth
                                size="small"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                                label="Apellido Paterno"
                                value={data.apellido_paterno}
                                onChange={(e) => setData('apellido_paterno', e.target.value)}
                                error={!!errors.apellido_paterno}
                                helperText={errors.apellido_paterno}
                                required
                                fullWidth
                                size="small"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                                label="Apellido Materno"
                                value={data.apellido_materno}
                                onChange={(e) => setData('apellido_materno', e.target.value)}
                                error={!!errors.apellido_materno}
                                helperText={errors.apellido_materno}
                                fullWidth
                                size="small"
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                select
                                label="Parentesco Predeterminado"
                                value={data.parentesco_predeterminado}
                                onChange={(e) => setData('parentesco_predeterminado', e.target.value)}
                                error={!!errors.parentesco_predeterminado}
                                helperText={errors.parentesco_predeterminado}
                                required
                                fullWidth
                                size="small"
                            >
                                <MenuItem value="Padre">Padre</MenuItem>
                                <MenuItem value="Madre">Madre</MenuItem>
                                <MenuItem value="Tutor Legal">Tutor Legal</MenuItem>
                                <MenuItem value="Abuelo/a">Abuelo/a</MenuItem>
                                <MenuItem value="Tío/a">Tío/a</MenuItem>
                                <MenuItem value="Hermano/a">Hermano/a</MenuItem>
                                <MenuItem value="Otro">Otro</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                label="Ocupación / Profesión"
                                value={data.ocupacion}
                                onChange={(e) => setData('ocupacion', e.target.value)}
                                error={!!errors.ocupacion}
                                helperText={errors.ocupacion}
                                fullWidth
                                size="small"
                                placeholder="Ej: Abogado, Comerciante, Ama de casa..."
                            />
                        </Grid>
                    </Grid>

                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', mb: 2, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: 1 }}>
                        Información de Contacto y Domicilio
                    </Typography>

                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                label="Teléfono Principal (Móvil/WhatsApp)"
                                value={data.telefono}
                                onChange={(e) => setData('telefono', e.target.value)}
                                error={!!errors.telefono}
                                helperText={errors.telefono}
                                required
                                fullWidth
                                size="small"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                label="Teléfono Secundario / Fijo"
                                value={data.telefono_secundario}
                                onChange={(e) => setData('telefono_secundario', e.target.value)}
                                error={!!errors.telefono_secundario}
                                helperText={errors.telefono_secundario}
                                fullWidth
                                size="small"
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                label="Correo Electrónico"
                                type="email"
                                value={data.correo}
                                onChange={(e) => setData('correo', e.target.value)}
                                error={!!errors.correo}
                                helperText={errors.correo}
                                fullWidth
                                size="small"
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                label="Dirección / Domicilio Particular"
                                multiline
                                rows={2}
                                value={data.direccion}
                                onChange={(e) => setData('direccion', e.target.value)}
                                error={!!errors.direccion}
                                helperText={errors.direccion}
                                fullWidth
                                size="small"
                                placeholder="Calle, número, colonia, código postal..."
                            />
                        </Grid>
                    </Grid>

                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', mb: 2, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: 1 }}>
                        Alumnos / Hijos Asignados
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12 }}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Seleccionar Alumnos Vinculados</InputLabel>
                                <Select
                                    multiple
                                    value={data.alumnos_ids}
                                    onChange={(e) => {
                                        const valor = typeof e.target.value === 'string' ? e.target.value.split(',').map(Number) : e.target.value;
                                        setData('alumnos_ids', valor);
                                    }}
                                    input={<OutlinedInput label="Seleccionar Alumnos Vinculados" />}
                                    renderValue={(seleccionados) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {seleccionados.map((id) => {
                                                const alumno = listaAlumnos.find((a) => a.id === id);
                                                const nombre = alumno ? (alumno.nombre_completo || `${alumno.nombre} ${alumno.apellido_paterno}`) : `ID ${id}`;
                                                return <Chip key={id} label={nombre} size="small" color="primary" variant="outlined" />;
                                            })}
                                        </Box>
                                    )}
                                >
                                    {listaAlumnos.map((a) => (
                                        <MenuItem key={a.id} value={a.id}>
                                            {a.nombre_completo || `${a.nombre} ${a.apellido_paterno} ${a.apellido_materno || ''}`} ({a.grado} "{a.grupo}") - {a.matricula}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                    <Button onClick={onCerrar} disabled={processing} variant="outlined" color="inherit">
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={processing} variant="contained" color="primary">
                        {processing ? 'Guardando...' : tutorParaEditar ? 'Guardar Cambios' : 'Registrar Tutor'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default TutorModal;
