// ==========================================
// Componente Modal para Crear / Editar Maestro
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
import { UserCheck } from 'lucide-react';

// Tipos
import { Maestro } from '@/types/escolar';

// Catálogo sugerido de materias de secundaria
const MATERIAS_DISPONIBLES = [
    'Español I', 'Español II', 'Español III',
    'Matemáticas I', 'Matemáticas II', 'Matemáticas III',
    'Ciencias I (Biología)', 'Ciencias II (Física)', 'Ciencias III (Química)',
    'Historia de México', 'Historia Universal',
    'Geografía de México y del Mundo',
    'Formación Cívica y Ética',
    'Inglés', 'Artes', 'Educación Física', 'Tecnología / Taller',
];

// Grupos disponibles
const GRUPOS_DISPONIBLES = [
    '1°A', '1°B', '1°C', '1°D',
    '2°A', '2°B', '2°C', '2°D',
    '3°A', '3°B', '3°C', '3°D',
];

interface MaestroModalProps {
    abierto: boolean;
    maestroParaEditar: Maestro | null;
    onCerrar: () => void;
}

export function MaestroModal({
    abierto,
    maestroParaEditar,
    onCerrar,
}: MaestroModalProps) {
    // Formulario de Inertia
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        curp: '',
        rfc: '',
        telefono: '',
        correo: '',
        puesto: 'Docente frente a grupo',
        tipo_personal: 'docente' as 'docente' | 'administrativo' | 'directivo' | 'apoyo',
        materias: [] as string[],
        grupos: [] as string[],
        estatus: 'activo' as 'activo' | 'inactivo' | 'licencia',
    });

    // Cargar información al abrir el modal
    useEffect(() => {
        if (maestroParaEditar) {
            setData({
                nombre: maestroParaEditar.nombre || '',
                apellido_paterno: maestroParaEditar.apellido_paterno || '',
                apellido_materno: maestroParaEditar.apellido_materno || '',
                curp: maestroParaEditar.curp || '',
                rfc: maestroParaEditar.rfc || '',
                telefono: maestroParaEditar.telefono || '',
                correo: maestroParaEditar.correo || '',
                puesto: maestroParaEditar.puesto || 'Docente frente a grupo',
                tipo_personal: maestroParaEditar.tipo_personal || 'docente',
                materias: maestroParaEditar.materias || [],
                grupos: maestroParaEditar.grupos || [],
                estatus: maestroParaEditar.estatus || 'activo',
            });
        } else {
            reset();
        }
        clearErrors();
    }, [maestroParaEditar, abierto]);

    // Manejador de envío
    const manejarEnvio = (e: React.FormEvent) => {
        e.preventDefault();
        if (maestroParaEditar) {
            put(`/maestros/${maestroParaEditar.id}`, {
                onSuccess: () => onCerrar(),
            });
        } else {
            post('/maestros', {
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
                    <UserCheck className="size-6 text-red-600" />
                    {maestroParaEditar ? 'Editar Personal / Docente' : 'Registrar Personal / Docente'}
                </DialogTitle>

                <DialogContent sx={{ py: 3 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', mb: 2, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: 1 }}>
                        Datos Personales y de Contacto
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
                                label="CURP (18 caracteres)"
                                value={data.curp}
                                onChange={(e) => setData('curp', e.target.value.toUpperCase())}
                                error={!!errors.curp}
                                helperText={errors.curp}
                                required
                                fullWidth
                                size="small"
                                slotProps={{
                                    htmlInput: { maxLength: 18 },
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                label="RFC (Opcional / si lo requieren)"
                                value={data.rfc}
                                onChange={(e) => setData('rfc', e.target.value.toUpperCase())}
                                error={!!errors.rfc}
                                helperText={errors.rfc}
                                fullWidth
                                size="small"
                                slotProps={{
                                    htmlInput: { maxLength: 13 },
                                }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                label="Correo Electrónico Institucional"
                                type="email"
                                value={data.correo}
                                onChange={(e) => setData('correo', e.target.value)}
                                error={!!errors.correo}
                                helperText={errors.correo}
                                required
                                fullWidth
                                size="small"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                label="Teléfono de Contacto"
                                value={data.telefono}
                                onChange={(e) => setData('telefono', e.target.value)}
                                error={!!errors.telefono}
                                helperText={errors.telefono}
                                fullWidth
                                size="small"
                            />
                        </Grid>
                    </Grid>

                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', mb: 2, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: 1 }}>
                        Puesto y Asignación Académica
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                                select
                                label="Tipo de Personal"
                                value={data.tipo_personal}
                                onChange={(e) => setData('tipo_personal', e.target.value as any)}
                                error={!!errors.tipo_personal}
                                helperText={errors.tipo_personal}
                                required
                                fullWidth
                                size="small"
                            >
                                <MenuItem value="docente">Docente</MenuItem>
                                <MenuItem value="directivo">Directivo</MenuItem>
                                <MenuItem value="administrativo">Administrativo</MenuItem>
                                <MenuItem value="apoyo">Personal de Apoyo</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                                label="Puesto / Cargo"
                                value={data.puesto}
                                onChange={(e) => setData('puesto', e.target.value)}
                                error={!!errors.puesto}
                                helperText={errors.puesto}
                                required
                                fullWidth
                                size="small"
                                placeholder="Ej: Profesor de Matemáticas, Director..."
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                                select
                                label="Estatus"
                                value={data.estatus}
                                onChange={(e) => setData('estatus', e.target.value as any)}
                                error={!!errors.estatus}
                                helperText={errors.estatus}
                                required
                                fullWidth
                                size="small"
                            >
                                <MenuItem value="activo">Activo</MenuItem>
                                <MenuItem value="inactivo">Inactivo</MenuItem>
                                <MenuItem value="licencia">Con Licencia</MenuItem>
                            </TextField>
                        </Grid>

                        {/* Selección múltiple de materias */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Materias que Imparte</InputLabel>
                                <Select
                                    multiple
                                    value={data.materias}
                                    onChange={(e) => {
                                        const valor = typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value;
                                        setData('materias', valor);
                                    }}
                                    input={<OutlinedInput label="Materias que Imparte" />}
                                    renderValue={(seleccionados) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {seleccionados.map((valor) => (
                                                <Chip key={valor} label={valor} size="small" />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {MATERIAS_DISPONIBLES.map((materia) => (
                                        <MenuItem key={materia} value={materia}>
                                            {materia}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Selección múltiple de grupos */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Grupos Asignados</InputLabel>
                                <Select
                                    multiple
                                    value={data.grupos}
                                    onChange={(e) => {
                                        const valor = typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value;
                                        setData('grupos', valor);
                                    }}
                                    input={<OutlinedInput label="Grupos Asignados" />}
                                    renderValue={(seleccionados) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {seleccionados.map((valor) => (
                                                <Chip key={valor} label={valor} size="small" color="primary" variant="outlined" />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {GRUPOS_DISPONIBLES.map((grupo) => (
                                        <MenuItem key={grupo} value={grupo}>
                                            {grupo}
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
                        {processing ? 'Guardando...' : maestroParaEditar ? 'Guardar Cambios' : 'Registrar Docente'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default MaestroModal;
