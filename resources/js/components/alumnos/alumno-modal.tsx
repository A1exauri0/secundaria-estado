// ==========================================
// Componente Modal para Crear / Editar Alumno
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
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

// Iconos
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

// Tipos
import { Alumno, Tutor } from '@/types/escolar';

interface TutorAsignado {
    id: number;
    parentesco: string;
    es_contacto_principal: boolean;
    [key: string]: any;
}

interface FormularioAlumno {
    matricula: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    curp: string;
    fecha_nacimiento: string;
    sexo: 'M' | 'F' | 'Otro';
    direccion: string;
    telefono: string;
    correo_institucional: string;
    grado: string;
    grupo: string;
    estatus: 'activo' | 'egresado' | 'baja' | 'suspendido';
    tutores: TutorAsignado[];
    [key: string]: any;
}

interface AlumnoModalProps {
    abierto: boolean;
    alumnoParaEditar: Alumno | null;
    listaTutores: Tutor[];
    onCerrar: () => void;
}

export function AlumnoModal({
    abierto,
    alumnoParaEditar,
    listaTutores,
    onCerrar,
}: AlumnoModalProps) {
    // Formulario de Inertia
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm<FormularioAlumno>({
        matricula: '',
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        curp: '',
        fecha_nacimiento: '',
        sexo: 'M',
        direccion: '',
        telefono: '',
        correo_institucional: '',
        grado: '1°',
        grupo: 'A',
        estatus: 'activo',
        tutores: [],
    });

    // Cargar datos al abrir modal para edición o creación
    useEffect(() => {
        if (alumnoParaEditar) {
            const tutoresMapeados: TutorAsignado[] = (alumnoParaEditar.tutores || []).map((t) => ({
                id: t.id,
                parentesco: t.pivot?.parentesco || t.parentesco_predeterminado || 'Tutor',
                es_contacto_principal: Boolean(t.pivot?.es_contacto_principal),
            }));

            setData({
                matricula: alumnoParaEditar.matricula || '',
                nombre: alumnoParaEditar.nombre || '',
                apellido_paterno: alumnoParaEditar.apellido_paterno || '',
                apellido_materno: alumnoParaEditar.apellido_materno || '',
                curp: alumnoParaEditar.curp || '',
                fecha_nacimiento: alumnoParaEditar.fecha_nacimiento ? String(alumnoParaEditar.fecha_nacimiento).slice(0, 10) : '',
                sexo: alumnoParaEditar.sexo || 'M',
                direccion: alumnoParaEditar.direccion || '',
                telefono: alumnoParaEditar.telefono || '',
                correo_institucional: alumnoParaEditar.correo_institucional || '',
                grado: alumnoParaEditar.grado || '1°',
                grupo: alumnoParaEditar.grupo || 'A',
                estatus: alumnoParaEditar.estatus || 'activo',
                tutores: tutoresMapeados,
            });
        } else {
            reset();
            // Generar matrícula sugerida por defecto
            const anio = new Date().getFullYear();
            const aleatorio = Math.floor(1000 + Math.random() * 9000);
            setData('matricula', `SEC${anio}-${aleatorio}`);
        }
        clearErrors();
    }, [alumnoParaEditar, abierto]);

    // Manejador de agregar tutor a la lista
    const agregarTutor = () => {
        if (listaTutores.length === 0) return;
        const primerDisponible = listaTutores.find((t) => !data.tutores.some((at) => at.id === t.id)) || listaTutores[0];
        setData('tutores', [
            ...data.tutores,
            {
                id: primerDisponible.id,
                parentesco: primerDisponible.parentesco_predeterminado || 'Padre',
                es_contacto_principal: data.tutores.length === 0,
            },
        ]);
    };

    // Manejador de remover tutor
    const removerTutor = (index: number) => {
        const nuevos = [...data.tutores];
        nuevos.splice(index, 1);
        setData('tutores', nuevos);
    };

    // Manejador de cambio en tutor asignado
    const actualizarTutor = (index: number, campo: keyof TutorAsignado, valor: any) => {
        const nuevos = [...data.tutores];
        nuevos[index] = { ...nuevos[index], [campo]: valor };
        setData('tutores', nuevos);
    };

    // Manejador de envío de formulario
    const manejarEnvio = (e: React.FormEvent) => {
        e.preventDefault();
        if (alumnoParaEditar) {
            put(`/alumnos/${alumnoParaEditar.id}`, {
                onSuccess: () => onCerrar(),
            });
        } else {
            post('/alumnos', {
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
                    <GraduationCap className="size-6 text-red-600" />
                    {alumnoParaEditar ? 'Editar Expediente de Alumno' : 'Registrar Nuevo Alumno'}
                </DialogTitle>

                <DialogContent sx={{ py: 3 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', mb: 2, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: 1 }}>
                        Información Académica y Escolar
                    </Typography>

                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                                label="Matrícula / ID"
                                value={data.matricula}
                                onChange={(e) => setData('matricula', e.target.value.toUpperCase())}
                                error={!!errors.matricula}
                                helperText={errors.matricula}
                                required
                                fullWidth
                                size="small"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                                select
                                label="Grado"
                                value={data.grado}
                                onChange={(e) => setData('grado', e.target.value)}
                                error={!!errors.grado}
                                helperText={errors.grado}
                                required
                                fullWidth
                                size="small"
                            >
                                <MenuItem value="1°">1° de Secundaria</MenuItem>
                                <MenuItem value="2°">2° de Secundaria</MenuItem>
                                <MenuItem value="3°">3° de Secundaria</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                                select
                                label="Grupo"
                                value={data.grupo}
                                onChange={(e) => setData('grupo', e.target.value)}
                                error={!!errors.grupo}
                                helperText={errors.grupo}
                                required
                                fullWidth
                                size="small"
                            >
                                {['A', 'B', 'C', 'D', 'E', 'F'].map((g) => (
                                    <MenuItem key={g} value={g}>
                                        Grupo {g}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>

                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', mb: 2, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: 1 }}>
                        Datos Personales del Alumno
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
                                helperText={errors.curp || 'Clave Única de Registro de Población'}
                                required
                                fullWidth
                                size="small"
                                slotProps={{
                                    htmlInput: { maxLength: 18 },
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 3 }}>
                            <TextField
                                type="date"
                                label="Fecha de Nacimiento"
                                slotProps={{
                                    inputLabel: { shrink: true },
                                }}
                                value={data.fecha_nacimiento}
                                onChange={(e) => setData('fecha_nacimiento', e.target.value)}
                                error={!!errors.fecha_nacimiento}
                                helperText={errors.fecha_nacimiento}
                                required
                                fullWidth
                                size="small"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 3 }}>
                            <TextField
                                select
                                label="Sexo"
                                value={data.sexo}
                                onChange={(e) => setData('sexo', e.target.value as 'M' | 'F' | 'Otro')}
                                error={!!errors.sexo}
                                helperText={errors.sexo}
                                required
                                fullWidth
                                size="small"
                            >
                                <MenuItem value="M">Masculino (M)</MenuItem>
                                <MenuItem value="F">Femenino (F)</MenuItem>
                                <MenuItem value="Otro">Otro</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                label="Correo Institucional"
                                type="email"
                                value={data.correo_institucional}
                                onChange={(e) => setData('correo_institucional', e.target.value)}
                                error={!!errors.correo_institucional}
                                helperText={errors.correo_institucional || 'Opcional (ej: alumno@secundaria.edu.mx)'}
                                fullWidth
                                size="small"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 3 }}>
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
                        <Grid size={{ xs: 12, sm: 3 }}>
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
                                <MenuItem value="egresado">Egresado</MenuItem>
                                <MenuItem value="baja">Baja</MenuItem>
                                <MenuItem value="suspendido">Suspendido</MenuItem>
                            </TextField>
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
                                required
                                fullWidth
                                size="small"
                                placeholder="Calle, número, colonia, código postal..."
                            />
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <div>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: 1 }}>
                                Tutores o Responsables Vinculados
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Asigna uno o varios tutores legales para este alumno
                            </Typography>
                        </div>
                        <Button
                            startIcon={<Plus className="size-4" />}
                            size="small"
                            variant="outlined"
                            color="primary"
                            onClick={agregarTutor}
                            disabled={listaTutores.length === 0}
                        >
                            Agregar Tutor
                        </Button>
                    </Box>

                    {data.tutores.length === 0 ? (
                        <Box sx={{ p: 2, textAlign: 'center', bgcolor: 'action.hover', borderRadius: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                No se han asignado tutores aún. Haz clic en "Agregar Tutor" para vincular uno.
                            </Typography>
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            {data.tutores.map((tut, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        p: 1.5,
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        borderRadius: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1.5,
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    <TextField
                                        select
                                        label="Tutor Registrado"
                                        size="small"
                                        value={tut.id}
                                        onChange={(e) => actualizarTutor(index, 'id', Number(e.target.value))}
                                        sx={{ minWidth: 240, flex: 2 }}
                                    >
                                        {listaTutores.map((t) => (
                                            <MenuItem key={t.id} value={t.id}>
                                                {t.nombre_completo || `${t.nombre} ${t.apellido_paterno}`} ({t.telefono})
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    <TextField
                                        select
                                        label="Parentesco"
                                        size="small"
                                        value={tut.parentesco}
                                        onChange={(e) => actualizarTutor(index, 'parentesco', e.target.value)}
                                        sx={{ minWidth: 140, flex: 1 }}
                                    >
                                        <MenuItem value="Padre">Padre</MenuItem>
                                        <MenuItem value="Madre">Madre</MenuItem>
                                        <MenuItem value="Tutor Legal">Tutor Legal</MenuItem>
                                        <MenuItem value="Abuelo/a">Abuelo/a</MenuItem>
                                        <MenuItem value="Tío/a">Tío/a</MenuItem>
                                        <MenuItem value="Hermano/a">Hermano/a</MenuItem>
                                        <MenuItem value="Otro">Otro</MenuItem>
                                    </TextField>

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={tut.es_contacto_principal}
                                                onChange={(e) => actualizarTutor(index, 'es_contacto_principal', e.target.checked)}
                                                color="primary"
                                                size="small"
                                            />
                                        }
                                        label={<Typography variant="caption">Contacto Principal</Typography>}
                                    />

                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => removerTutor(index)}
                                    >
                                        <Trash2 className="size-4" />
                                    </IconButton>
                                </Box>
                            ))}
                        </Box>
                    )}
                </DialogContent>

                <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                    <Button onClick={onCerrar} disabled={processing} variant="outlined" color="inherit">
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={processing} variant="contained" color="primary">
                        {processing ? 'Guardando...' : alumnoParaEditar ? 'Guardar Cambios' : 'Registrar Alumno'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default AlumnoModal;
