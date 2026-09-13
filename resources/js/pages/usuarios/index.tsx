// ==========================================
// Página Principal del Módulo de Usuarios
// ==========================================

// Importaciones de React e Inertia
import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';

// Layouts y Tipos
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { PaginacionData, Usuario } from '@/types/escolar';

// Componentes de Material UI
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';

// Iconos
import {
    CheckCircle2,
    Eye,
    Pencil,
    Plus,
    RotateCcw,
    Search,
    Shield,
    Trash2,
    UserCheck,
    UserCog,
    UserPlus,
    XCircle,
} from 'lucide-react';

// Componentes del Módulo
import { UsuarioModal } from '@/components/usuarios/usuario-modal';
import { UsuarioDetallesModal } from '@/components/usuarios/usuario-detalles-modal';
import { ConfirmacionEliminarModal } from '@/components/escolar/confirmacion-eliminar-modal';
import { PaginacionControls } from '@/components/escolar/paginacion-controls';

const migasDePan: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Usuarios del Sistema', href: '/usuarios' },
];

interface Props {
    usuarios: PaginacionData<Usuario>;
    filtros: {
        busqueda?: string;
        rol?: string;
        estatus?: string;
    };
    estadisticas: {
        total: number;
        activos: number;
        inactivos: number;
        administradores: number;
    };
}

export default function UsuariosIndex({
    usuarios,
    filtros,
}: Props) {
    const { auth } = usePage<SharedData>().props;

    // Estados para filtros
    const [busqueda, setBusqueda] = useState(filtros.busqueda || '');
    const [rol, setRol] = useState(filtros.rol || '');
    const [estatus, setEstatus] = useState(filtros.estatus || '');

    // Estados para modales
    const [modalFormularioAbierto, setModalFormularioAbierto] = useState(false);
    const [modalDetallesAbierto, setModalDetallesAbierto] = useState(false);
    const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);

    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
    const [usuarioParaEliminar, setUsuarioParaEliminar] = useState<Usuario | null>(null);
    const [eliminando, setEliminando] = useState(false);
    const [mensajeError, setMensajeError] = useState<string | null>(null);

    // Aplicar filtros de búsqueda
    const aplicarFiltros = (nuevosValores = {}) => {
        router.get(
            '/usuarios',
            {
                busqueda,
                rol,
                estatus,
                ...nuevosValores,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    // Manejador de tecla Enter en búsqueda
    const manejarEnterBusqueda = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            aplicarFiltros();
        }
    };

    // Limpiar todos los filtros
    const limpiarFiltros = () => {
        setBusqueda('');
        setRol('');
        setEstatus('');
        router.get('/usuarios', {}, { preserveState: true });
    };

    // Abrir modal de nuevo usuario
    const abrirCrear = () => {
        setUsuarioSeleccionado(null);
        setModalFormularioAbierto(true);
    };

    // Abrir modal para editar usuario
    const abrirEditar = (usuario: Usuario) => {
        setUsuarioSeleccionado(usuario);
        setModalFormularioAbierto(true);
    };

    // Abrir modal de detalles
    const abrirDetalles = (usuario: Usuario) => {
        setUsuarioSeleccionado(usuario);
        setModalDetallesAbierto(true);
    };

    // Abrir modal para confirmar eliminación
    const abrirEliminar = (usuario: Usuario) => {
        if (auth?.user?.id === usuario.id) {
            setMensajeError('No puedes eliminar tu propia cuenta en sesión activa.');
            return;
        }
        setMensajeError(null);
        setUsuarioParaEliminar(usuario);
        setModalEliminarAbierto(true);
    };

    // Ejecutar eliminación
    const confirmarEliminacion = () => {
        if (!usuarioParaEliminar) return;
        setEliminando(true);
        router.delete(`/usuarios/${usuarioParaEliminar.id}`, {
            onSuccess: () => {
                setModalEliminarAbierto(false);
                setUsuarioParaEliminar(null);
                setEliminando(false);
            },
            onError: (err) => {
                setEliminando(false);
                setMensajeError('Ocurrió un error al intentar eliminar el usuario.');
            },
        });
    };

    // Mapeo visual de roles
    const mapeoRoles: Record<string, { label: string; color: string; bg: string }> = {
        admin: { label: 'Administrador General', color: '#991b1b', bg: '#fef2f2' },
        directivo: { label: 'Directivo / Subdirección', color: '#6d28d9', bg: '#f5f3ff' },
        control_escolar: { label: 'Control Escolar', color: '#1d4ed8', bg: '#eff6ff' },
        docente: { label: 'Docente / Profesor', color: '#c2410c', bg: '#fff7ed' },
        consulta: { label: 'Solo Consulta', color: '#475569', bg: '#f1f5f9' },
    };

    return (
        <AppLayout breadcrumbs={migasDePan}>
            <Head title="Usuarios del Sistema" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Encabezado Principal */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#991b1b', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <UserCog className="size-7 text-red-600" />
                            Usuarios del Sistema
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Administración de cuentas de acceso, roles institucionales y permisos de la plataforma.
                        </Typography>
                    </div>

                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Plus className="size-5" />}
                        onClick={abrirCrear}
                        sx={{
                            backgroundColor: '#dc2626',
                            '&:hover': { backgroundColor: '#b91c1c' },
                            fontWeight: 700,
                            px: 3,
                            py: 1,
                        }}
                    >
                        Nuevo Usuario
                    </Button>
                </div>

                {/* Alerta de Error si aplica */}
                {mensajeError && (
                    <Alert severity="warning" onClose={() => setMensajeError(null)} sx={{ borderRadius: 2 }}>
                        {mensajeError}
                    </Alert>
                )}

                {/* Barra de Filtros y Búsqueda */}
                <Paper variant="outlined" sx={{ p: 2.5, bgcolor: '#ffffff', borderRadius: 2.5, borderColor: '#e2e8f0' }}>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                        <div className="md:col-span-5">
                            <TextField
                                size="small"
                                fullWidth
                                placeholder="Buscar por nombre, correo o teléfono..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                onKeyDown={manejarEnterBusqueda}
                                slotProps={{
                                    input: {
                                        startAdornment: <Search className="size-4 text-neutral-400 mr-2" />,
                                    },
                                }}
                            />
                        </div>

                        <div className="md:col-span-3">
                            <TextField
                                select
                                size="small"
                                fullWidth
                                label="Rol Institucional"
                                value={rol}
                                onChange={(e) => {
                                    setRol(e.target.value);
                                    aplicarFiltros({ rol: e.target.value });
                                }}
                            >
                                <MenuItem value="">Todos los Roles</MenuItem>
                                <MenuItem value="admin">Administrador General</MenuItem>
                                <MenuItem value="directivo">Directivo / Subdirección</MenuItem>
                                <MenuItem value="control_escolar">Control Escolar</MenuItem>
                                <MenuItem value="docente">Docente / Profesor</MenuItem>
                                <MenuItem value="consulta">Solo Consulta</MenuItem>
                            </TextField>
                        </div>

                        <div className="md:col-span-2">
                            <TextField
                                select
                                size="small"
                                fullWidth
                                label="Estatus"
                                value={estatus}
                                onChange={(e) => {
                                    setEstatus(e.target.value);
                                    aplicarFiltros({ estatus: e.target.value });
                                }}
                            >
                                <MenuItem value="">Todos los Estatus</MenuItem>
                                <MenuItem value="activo">Activo</MenuItem>
                                <MenuItem value="inactivo">Inactivo</MenuItem>
                            </TextField>
                        </div>

                        <div className="md:col-span-2 flex gap-2">
                            <Button
                                variant="contained"
                                onClick={() => aplicarFiltros()}
                                fullWidth
                                sx={{
                                    bgcolor: '#991b1b',
                                    '&:hover': { bgcolor: '#7f1d1d' },
                                    fontWeight: 600,
                                }}
                            >
                                Filtrar
                            </Button>
                            <Tooltip title="Limpiar filtros">
                                <IconButton onClick={limpiarFiltros} size="small" sx={{ border: '1px solid #e2e8f0', p: 1 }}>
                                    <RotateCcw className="size-4 text-neutral-600" />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                </Paper>

                {/* Tabla de Usuarios */}
                <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead sx={{ bgcolor: '#f8fafc' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Usuario</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Rol Institucional</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Teléfono</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Estatus</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Fecha de Registro</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold', color: '#475569' }}>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usuarios.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                                        <UserCog className="size-12 mx-auto text-neutral-300 mb-2" />
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>No se encontraron usuarios registrados.</Typography>
                                        <Typography variant="body2">Intenta ajustar los filtros o registra un nuevo usuario.</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                usuarios.data.map((usuario) => {
                                    const infoRol = mapeoRoles[usuario.rol] || { label: usuario.rol, color: '#475569', bg: '#f1f5f9' };
                                    const iniciales = usuario.name
                                        ? usuario.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
                                        : 'US';
                                    const esUsuarioActual = auth?.user?.id === usuario.id;

                                    return (
                                        <TableRow key={usuario.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            {/* Usuario (Avatar + Nombre + Correo) */}
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar
                                                        sx={{
                                                            width: 38,
                                                            height: 38,
                                                            bgcolor: '#991b1b',
                                                            fontSize: '0.85rem',
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        {iniciales}
                                                    </Avatar>
                                                    <div>
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="font-bold text-neutral-900 text-sm">
                                                                {usuario.name}
                                                            </span>
                                                            {esUsuarioActual && (
                                                                <Chip
                                                                    label="Tú"
                                                                    size="small"
                                                                    sx={{
                                                                        height: 18,
                                                                        fontSize: '0.65rem',
                                                                        fontWeight: 700,
                                                                        bgcolor: '#fef2f2',
                                                                        color: '#991b1b',
                                                                    }}
                                                                />
                                                            )}
                                                        </div>
                                                        <span className="text-xs text-neutral-500 font-medium block">
                                                            {usuario.email}
                                                        </span>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            {/* Rol Institucional */}
                                            <TableCell>
                                                <span
                                                    style={{
                                                        backgroundColor: infoRol.bg,
                                                        color: infoRol.color,
                                                        padding: '3px 9px',
                                                        borderRadius: 6,
                                                        fontSize: '0.75rem',
                                                        fontWeight: 700,
                                                        display: 'inline-block',
                                                    }}
                                                >
                                                    {infoRol.label}
                                                </span>
                                            </TableCell>

                                            {/* Teléfono */}
                                            <TableCell sx={{ color: '#475569', fontSize: '0.875rem' }}>
                                                {usuario.telefono || '—'}
                                            </TableCell>

                                            {/* Estatus */}
                                            <TableCell>
                                                <Chip
                                                    icon={usuario.estatus === 'activo' ? <CheckCircle2 className="size-3.5" /> : <XCircle className="size-3.5" />}
                                                    label={usuario.estatus === 'activo' ? 'Activo' : 'Inactivo'}
                                                    size="small"
                                                    color={usuario.estatus === 'activo' ? 'success' : 'default'}
                                                    sx={{ fontWeight: 600, fontSize: '0.72rem' }}
                                                />
                                            </TableCell>

                                            {/* Fecha de Registro */}
                                            <TableCell sx={{ color: '#64748b', fontSize: '0.8rem' }}>
                                                {usuario.created_at
                                                    ? new Date(usuario.created_at).toLocaleDateString('es-MX', {
                                                          day: '2-digit',
                                                          month: 'short',
                                                          year: 'numeric',
                                                      })
                                                    : '—'}
                                            </TableCell>

                                            {/* Acciones */}
                                            <TableCell align="right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Tooltip title="Ver Detalles">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => abrirDetalles(usuario)}
                                                            sx={{ color: '#0284c7', '&:hover': { bgcolor: '#f0f9ff' } }}
                                                        >
                                                            <Eye className="size-4" />
                                                        </IconButton>
                                                    </Tooltip>

                                                    <Tooltip title="Editar Usuario">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => abrirEditar(usuario)}
                                                            sx={{ color: '#f59e0b', '&:hover': { bgcolor: '#fffbeb' } }}
                                                        >
                                                            <Pencil className="size-4" />
                                                        </IconButton>
                                                    </Tooltip>

                                                    <Tooltip title={esUsuarioActual ? 'No puedes eliminar tu propio usuario' : 'Eliminar Usuario'}>
                                                        <span>
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => abrirEliminar(usuario)}
                                                                disabled={esUsuarioActual}
                                                                sx={{
                                                                    color: esUsuarioActual ? '#cbd5e1' : '#e11d48',
                                                                    '&:hover': { bgcolor: '#fff1f2' },
                                                                }}
                                                            >
                                                                <Trash2 className="size-4" />
                                                            </IconButton>
                                                        </span>
                                                    </Tooltip>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>

                    {/* Controles de Paginación */}
                    <PaginacionControls paginacion={usuarios} />
                </TableContainer>
            </div>

            {/* Modal de Formulario (Crear / Editar) */}
            <UsuarioModal
                abierto={modalFormularioAbierto}
                usuario={usuarioSeleccionado}
                onCerrar={() => setModalFormularioAbierto(false)}
            />

            {/* Modal de Detalles */}
            <UsuarioDetallesModal
                abierto={modalDetallesAbierto}
                usuario={usuarioSeleccionado}
                onCerrar={() => setModalDetallesAbierto(false)}
                onEditar={abrirEditar}
            />

            {/* Modal de Confirmación de Eliminación */}
            <ConfirmacionEliminarModal
                abierto={modalEliminarAbierto}
                titulo="¿Eliminar Usuario?"
                mensaje={`¿Estás seguro de que deseas eliminar al usuario "${usuarioParaEliminar?.name}"? Esta acción revocará su acceso al sistema.`}
                procesando={eliminando}
                onCerrar={() => setModalEliminarAbierto(false)}
                onConfirmar={confirmarEliminacion}
            />
        </AppLayout>
    );
}
