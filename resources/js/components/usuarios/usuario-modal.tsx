// ==========================================
// Componente Modal de Formulario de Usuario
// ==========================================

// Importaciones de React e Inertia
import React, { useEffect, FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';

// Tipos
import { Usuario } from '@/types/escolar';

// Componentes de Material UI
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

// Iconos
import {
    KeyRound,
    Mail,
    Phone,
    Shield,
    UserCheck,
    UserCog,
    UserPlus,
} from 'lucide-react';

interface UsuarioFormState {
    name: string;
    email: string;
    password: string;
    rol: string;
    telefono: string;
    estatus: string;
    [key: string]: any;
}

interface UsuarioModalProps {
    abierto: boolean;
    usuario?: Usuario | null;
    onCerrar: () => void;
}

export function UsuarioModal({
    abierto,
    usuario,
    onCerrar,
}: UsuarioModalProps) {
    const esModoEdicion = Boolean(usuario);

    // Formulario de Inertia
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm<UsuarioFormState>({
        name: '',
        email: '',
        password: '',
        rol: 'control_escolar',
        telefono: '',
        estatus: 'activo',
    });

    // Cargar datos al abrir para edición
    useEffect(() => {
        if (usuario) {
            setData({
                name: usuario.name,
                email: usuario.email,
                password: '',
                rol: usuario.rol || 'control_escolar',
                telefono: usuario.telefono || '',
                estatus: usuario.estatus || 'activo',
            });
        } else {
            reset();
        }
        clearErrors();
    }, [usuario, abierto]);

    // Manejador de envío del formulario
    const manejarEnvio: FormEventHandler = (e) => {
        e.preventDefault();

        if (esModoEdicion && usuario) {
            put(`/usuarios/${usuario.id}`, {
                onSuccess: () => {
                    onCerrar();
                    reset();
                },
            });
        } else {
            post('/usuarios', {
                onSuccess: () => {
                    onCerrar();
                    reset();
                },
            });
        }
    };

    return (
        <Dialog
            open={abierto}
            onClose={processing ? undefined : onCerrar}
            maxWidth="sm"
            fullWidth
            slotProps={{
                paper: {
                    sx: { borderRadius: 3, p: 1 },
                },
            }}
        >
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: '#991b1b', fontWeight: 800 }}>
                {esModoEdicion ? (
                    <>
                        <UserCog className="size-6 text-red-600" />
                        Editar Usuario del Sistema
                    </>
                ) : (
                    <>
                        <UserPlus className="size-6 text-red-600" />
                        Registrar Nuevo Usuario
                    </>
                )}
            </DialogTitle>

            <form onSubmit={manejarEnvio}>
                <DialogContent dividers>
                    {/* Alerta de Errores Generales */}
                    {Object.keys(errors).length > 0 && (
                        <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>
                            Por favor corrige los campos señalados antes de guardar.
                        </Alert>
                    )}

                    <Grid container spacing={2.5}>
                        {/* Nombre Completo */}
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                label="Nombre Completo del Usuario"
                                fullWidth
                                size="small"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                error={!!errors.name}
                                helperText={errors.name}
                                required
                                autoFocus
                            />
                        </Grid>

                        {/* Correo Electrónico */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                label="Correo Electrónico (Acceso)"
                                type="email"
                                fullWidth
                                size="small"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                error={!!errors.email}
                                helperText={errors.email}
                                required
                                slotProps={{
                                    input: {
                                        startAdornment: <Mail className="size-4 text-neutral-400 mr-2 shrink-0" />,
                                    },
                                }}
                            />
                        </Grid>

                        {/* Teléfono */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                label="Teléfono de Contacto"
                                fullWidth
                                size="small"
                                value={data.telefono}
                                onChange={(e) => setData('telefono', e.target.value)}
                                error={!!errors.telefono}
                                helperText={errors.telefono}
                                slotProps={{
                                    input: {
                                        startAdornment: <Phone className="size-4 text-neutral-400 mr-2 shrink-0" />,
                                    },
                                    htmlInput: { maxLength: 20 },
                                }}
                            />
                        </Grid>

                        {/* Contraseña */}
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                label={esModoEdicion ? 'Nueva Contraseña (Opcional)' : 'Contraseña de Acceso'}
                                type="password"
                                fullWidth
                                size="small"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                error={!!errors.password}
                                helperText={
                                    errors.password ||
                                    (esModoEdicion
                                        ? 'Dejar en blanco si deseas mantener la contraseña actual'
                                        : 'Mínimo 8 caracteres para el acceso inicial')
                                }
                                required={!esModoEdicion}
                                slotProps={{
                                    input: {
                                        startAdornment: <KeyRound className="size-4 text-neutral-400 mr-2 shrink-0" />,
                                    },
                                }}
                            />
                        </Grid>

                        {/* Rol del Usuario */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                select
                                label="Rol Institucional"
                                fullWidth
                                size="small"
                                value={data.rol}
                                onChange={(e) => setData('rol', e.target.value)}
                                error={!!errors.rol}
                                helperText={errors.rol}
                                required
                            >
                                <MenuItem value="admin">
                                    <div className="flex items-center gap-2">
                                        <Shield className="size-4 text-red-600" />
                                        <span>Administrador General</span>
                                    </div>
                                </MenuItem>
                                <MenuItem value="directivo">
                                    <div className="flex items-center gap-2">
                                        <Shield className="size-4 text-violet-600" />
                                        <span>Directivo / Subdirección</span>
                                    </div>
                                </MenuItem>
                                <MenuItem value="control_escolar">
                                    <div className="flex items-center gap-2">
                                        <UserCheck className="size-4 text-blue-600" />
                                        <span>Control Escolar</span>
                                    </div>
                                </MenuItem>
                                <MenuItem value="docente">
                                    <div className="flex items-center gap-2">
                                        <UserCheck className="size-4 text-orange-600" />
                                        <span>Docente / Profesor</span>
                                    </div>
                                </MenuItem>
                                <MenuItem value="consulta">
                                    <div className="flex items-center gap-2">
                                        <UserCheck className="size-4 text-neutral-500" />
                                        <span>Solo Consulta</span>
                                    </div>
                                </MenuItem>
                            </TextField>
                        </Grid>

                        {/* Estatus */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                select
                                label="Estatus de Cuenta"
                                fullWidth
                                size="small"
                                value={data.estatus}
                                onChange={(e) => setData('estatus', e.target.value)}
                                error={!!errors.estatus}
                                helperText={errors.estatus}
                                required
                            >
                                <MenuItem value="activo">
                                    <span className="text-green-700 font-semibold">Activo (Permitido)</span>
                                </MenuItem>
                                <MenuItem value="inactivo">
                                    <span className="text-neutral-500">Inactivo (Suspendido)</span>
                                </MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
                    <Button
                        onClick={onCerrar}
                        disabled={processing}
                        variant="outlined"
                        sx={{ color: '#475569', borderColor: '#cbd5e1' }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        disabled={processing}
                        variant="contained"
                        startIcon={processing ? <CircularProgress size={16} sx={{ color: '#ffffff' }} /> : undefined}
                        sx={{
                            bgcolor: '#dc2626',
                            color: '#ffffff',
                            '&:hover': { bgcolor: '#b91c1c' },
                            fontWeight: 700,
                            px: 3,
                        }}
                    >
                        {processing ? 'Guardando...' : esModoEdicion ? 'Actualizar Usuario' : 'Registrar Usuario'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default UsuarioModal;
