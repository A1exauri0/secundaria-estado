// ==========================================
// Página de Inicio de Sesión (Login Escolar)
// Escuela Secundaria del Estado - Turno Matutino
// ==========================================

// Importaciones de React e Inertia
import React, { useState, FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';

// Componentes de Material UI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';

// Iconos
import {
    Eye,
    EyeOff,
    Lock,
    LogIn,
    Mail,
    ShieldAlert,
} from 'lucide-react';

// Tipado del Formulario
interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
    [key: string]: any;
}

interface LoginProps {
    status?: string;
    canResetPassword?: boolean;
}

export default function Login({ status }: LoginProps) {
    // Estado para visibilidad de la contraseña
    const [mostrarContrasenia, setMostrarContrasenia] = useState<boolean>(false);

    // Formulario reactivo de Inertia
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    // Manejador de envío del formulario
    const manejarEnvio: FormEventHandler = (e) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-4 sm:p-6 bg-slate-100 relative">
            <Head title="Iniciar Sesión - Escuela Secundaria del Estado" />

            {/* Fondo sutil y limpio con detalles arquitectónicos */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="w-full max-w-md z-10 my-auto">
                {/* Encabezado con Logotipo Oficial e Identidad Institucional */}
                <div className="text-center mb-6">
                    <div className="inline-block p-2 bg-white rounded-full shadow-md border border-neutral-200 mb-3 transition-transform hover:scale-105 duration-300">
                        <img
                            src="/images/logo-secundaria.png"
                            alt="Escudo Escuela Secundaria del Estado"
                            className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
                        />
                    </div>

                    <Typography
                        variant="h5"
                        component="h1"
                        sx={{
                            fontWeight: 800,
                            color: '#991b1b',
                            fontSize: { xs: '1.25rem', sm: '1.45rem' },
                            lineHeight: 1.25,
                            mb: 0.5,
                        }}
                    >
                        Escuela Secundaria del Estado
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 0.5, mb: 1 }}>
                        <Chip
                            label="TURNO MATUTINO"
                            size="small"
                            sx={{
                                bgcolor: '#dc2626',
                                color: '#ffffff',
                                fontWeight: 700,
                                fontSize: '0.7rem',
                                height: 22,
                                letterSpacing: 0.5,
                            }}
                        />
                    </Box>
                </div>

                {/* Tarjeta del Formulario en Fondo Blanco de Alto Contraste */}
                <Card
                    sx={{
                        borderRadius: 3,
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
                        border: '1px solid #e2e8f0',
                        bgcolor: '#ffffff',
                        overflow: 'hidden',
                    }}
                >
                    {/* Franja de acento institucional rojo */}
                    <Box sx={{ height: 5, bgcolor: '#dc2626' }} />

                    <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                        <Typography
                            variant="h6"
                            component="h2"
                            sx={{ fontWeight: 800, color: '#0f172a', mb: 0.5 }}
                        >
                            Acceso al Sistema
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#475569', mb: 3 }}>
                            Ingresa tus credenciales institucionales para continuar.
                        </Typography>

                        {/* Mensaje de estado de sesión */}
                        {status && (
                            <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                                {status}
                            </Alert>
                        )}

                        {/* Alerta de error de autenticación */}
                        {errors.email && (
                            <Alert
                                severity="error"
                                icon={<ShieldAlert className="size-5 text-red-600" />}
                                sx={{ mb: 3, borderRadius: 2 }}
                            >
                                {errors.email}
                            </Alert>
                        )}

                        <form onSubmit={manejarEnvio} className="space-y-4">
                            {/* Campo de Correo Institucional */}
                            <TextField
                                label="Correo Electrónico Institucional"
                                type="email"
                                fullWidth
                                size="medium"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                error={!!errors.email}
                                required
                                autoFocus
                                slotProps={{
                                    input: {
                                        startAdornment: <Mail className="size-4 text-slate-400 mr-2 shrink-0" />,
                                        sx: { bgcolor: '#ffffff', borderRadius: 2 },
                                    },
                                    inputLabel: {
                                        shrink: true,
                                        sx: {
                                            color: '#334155',
                                            fontWeight: 600,
                                            '&.Mui-focused': { color: '#dc2626' },
                                        },
                                    },
                                    htmlInput: {
                                        style: {
                                            color: '#0f172a',
                                            fontWeight: 500,
                                            backgroundColor: '#ffffff',
                                        },
                                    },
                                }}
                            />

                            {/* Campo de Contraseña */}
                            <TextField
                                label="Contraseña"
                                type={mostrarContrasenia ? 'text' : 'password'}
                                fullWidth
                                size="medium"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                error={!!errors.password}
                                helperText={errors.password}
                                required
                                slotProps={{
                                    input: {
                                        startAdornment: <Lock className="size-4 text-slate-400 mr-2 shrink-0" />,
                                        endAdornment: (
                                            <IconButton
                                                size="small"
                                                onClick={() => setMostrarContrasenia(!mostrarContrasenia)}
                                                edge="end"
                                                aria-label="mostrar u ocultar contraseña"
                                                sx={{ color: '#64748b' }}
                                            >
                                                {mostrarContrasenia ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                            </IconButton>
                                        ),
                                        sx: { bgcolor: '#ffffff', borderRadius: 2 },
                                    },
                                    inputLabel: {
                                        shrink: true,
                                        sx: {
                                            color: '#334155',
                                            fontWeight: 600,
                                            '&.Mui-focused': { color: '#dc2626' },
                                        },
                                    },
                                    htmlInput: {
                                        style: {
                                            color: '#0f172a',
                                            fontWeight: 500,
                                            backgroundColor: '#ffffff',
                                        },
                                    },
                                }}
                            />

                            {/* Opción de Recordar Sesión */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 0.5 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                            sx={{
                                                color: '#94a3b8',
                                                '&.Mui-checked': { color: '#dc2626' },
                                            }}
                                            size="small"
                                        />
                                    }
                                    label={
                                        <Typography variant="body2" sx={{ color: '#334155', fontWeight: 500 }}>
                                            Recordar sesión
                                        </Typography>
                                    }
                                />
                            </Box>

                            {/* Botón de Ingreso al Sistema */}
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                disabled={processing}
                                startIcon={<LogIn className="size-5" />}
                                sx={{
                                    bgcolor: '#dc2626',
                                    color: '#ffffff',
                                    '&:hover': { bgcolor: '#b91c1c' },
                                    fontWeight: 700,
                                    py: 1.3,
                                    borderRadius: 2,
                                    boxShadow: '0 4px 12px rgba(220, 38, 38, 0.25)',
                                    mt: 1,
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                }}
                            >
                                {processing ? 'Comprobando acceso...' : 'Iniciar Sesión'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Pie de Página Institucional Visible y de Alto Contraste */}
                <div className="text-center mt-4">
                    <Typography
                        variant="caption"
                        sx={{
                            display: 'block',
                            color: '#64748b',
                            fontWeight: 500,
                            fontSize: '0.78rem',
                        }}
                    >
                        © {new Date().getFullYear()} Escuela Secundaria del Estado — Turno Matutino
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            display: 'block',
                            color: '#94a3b8',
                            fontSize: '0.72rem',
                            mt: 0.2,
                        }}
                    >
                        Tuxtla Gutiérrez, Chiapas
                    </Typography>
                </div>
            </div>
        </div>
    );
}
