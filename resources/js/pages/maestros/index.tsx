// ==========================================
// Página Principal del Módulo de Maestros y Personal
// ==========================================

// Importaciones de React e Inertia
import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';

// Layouts y Tipos
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Maestro, PaginacionData } from '@/types/escolar';

// Componentes de Material UI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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

// Iconos
import {
    BookOpen,
    Building,
    Eye,
    Pencil,
    Plus,
    RotateCcw,
    Search,
    Shield,
    Trash2,
    UserCheck,
} from 'lucide-react';

// Componentes del Módulo
import { MaestroModal } from '@/components/maestros/maestro-modal';
import { MaestroDetallesModal } from '@/components/maestros/maestro-detalles-modal';
import { ConfirmacionEliminarModal } from '@/components/escolar/confirmacion-eliminar-modal';
import { EstatusBadge } from '@/components/escolar/estatus-badge';
import { PaginacionControls } from '@/components/escolar/paginacion-controls';

const migasDePan: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Maestros y Personal', href: '/maestros' },
];

interface Props {
    maestros: PaginacionData<Maestro>;
    filtros: {
        busqueda?: string;
        tipo_personal?: string;
        estatus?: string;
    };
    estadisticas: {
        total: number;
        docentes: number;
        administrativos: number;
        directivos: number;
    };
}

export default function MaestrosIndex({
    maestros,
    filtros,
    estadisticas,
}: Props) {
    // Estados para filtros
    const [busqueda, setBusqueda] = useState(filtros.busqueda || '');
    const [tipoPersonal, setTipoPersonal] = useState(filtros.tipo_personal || '');
    const [estatus, setEstatus] = useState(filtros.estatus || '');

    // Estados para modales
    const [modalFormularioAbierto, setModalFormularioAbierto] = useState(false);
    const [modalDetallesAbierto, setModalDetallesAbierto] = useState(false);
    const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);

    const [maestroSeleccionado, setMaestroSeleccionado] = useState<Maestro | null>(null);
    const [maestroParaEliminar, setMaestroParaEliminar] = useState<Maestro | null>(null);
    const [eliminando, setEliminando] = useState(false);

    // Aplicar filtros
    const aplicarFiltros = (nuevosValores = {}) => {
        router.get(
            '/maestros',
            {
                busqueda,
                tipo_personal: tipoPersonal,
                estatus,
                ...nuevosValores,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const manejarEnterBusqueda = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') aplicarFiltros();
    };

    const limpiarFiltros = () => {
        setBusqueda('');
        setTipoPersonal('');
        setEstatus('');
        router.get('/maestros', {}, { preserveState: true });
    };

    const abrirCrear = () => {
        setMaestroSeleccionado(null);
        setModalFormularioAbierto(true);
    };

    const abrirEditar = (maestro: Maestro) => {
        setMaestroSeleccionado(maestro);
        setModalFormularioAbierto(true);
    };

    const abrirDetalles = (maestro: Maestro) => {
        setMaestroSeleccionado(maestro);
        setModalDetallesAbierto(true);
    };

    const abrirEliminar = (maestro: Maestro) => {
        setMaestroParaEliminar(maestro);
        setModalEliminarAbierto(true);
    };

    const confirmarEliminacion = () => {
        if (!maestroParaEliminar) return;
        setEliminando(true);
        router.delete(`/maestros/${maestroParaEliminar.id}`, {
            onSuccess: () => {
                setModalEliminarAbierto(false);
                setMaestroParaEliminar(null);
                setEliminando(false);
            },
            onError: () => setEliminando(false),
        });
    };

    return (
        <AppLayout breadcrumbs={migasDePan}>
            <Head title="Maestros y Personal" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Encabezado Principal */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#991b1b', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <UserCheck className="size-7 text-red-600" />
                            Personal Docente y Administrativo
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Gestión de maestros, asignación de materias, grupos y plantilla laboral.
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
                        Nuevo Maestro/Personal
                    </Button>
                </div>



                {/* Filtros */}
                <Card sx={{ p: 2.5, bgcolor: 'background.paper' }}>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                        <div className="md:col-span-5">
                            <TextField
                                size="small"
                                fullWidth
                                placeholder="Buscar por nombre, CURP, RFC, correo..."
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
                                label="Tipo de Personal"
                                value={tipoPersonal}
                                onChange={(e) => {
                                    setTipoPersonal(e.target.value);
                                    aplicarFiltros({ tipo_personal: e.target.value });
                                }}
                            >
                                <MenuItem value="">Todos los Tipos</MenuItem>
                                <MenuItem value="docente">Docente</MenuItem>
                                <MenuItem value="directivo">Directivo</MenuItem>
                                <MenuItem value="administrativo">Administrativo</MenuItem>
                                <MenuItem value="apoyo">Personal de Apoyo</MenuItem>
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
                                <MenuItem value="licencia">Con Licencia</MenuItem>
                            </TextField>
                        </div>

                        <div className="md:col-span-2 flex gap-2">
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="medium"
                                onClick={() => aplicarFiltros()}
                            >
                                Filtrar
                            </Button>
                            {(busqueda || tipoPersonal || estatus) && (
                                <Tooltip title="Limpiar filtros">
                                    <IconButton onClick={limpiarFiltros} color="inherit">
                                        <RotateCcw className="size-5" />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </div>
                    </div>
                </Card>

                {/* Tabla de Maestros */}
                <Card sx={{ bgcolor: 'background.paper', overflow: 'hidden' }}>
                    <TableContainer>
                        <Table sx={{ minWidth: 800 }}>
                            <TableHead sx={{ bgcolor: '#fef2f2' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#991b1b' }}>Docente / Personal</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#991b1b' }}>CURP / RFC</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#991b1b' }}>Puesto / Tipo</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#991b1b' }}>Materias Asignadas</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#991b1b' }}>Grupos</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#991b1b' }}>Estatus</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold', color: '#991b1b' }}>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {maestros.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                                            <Typography variant="body1" color="text.secondary">
                                                No se encontró personal con los filtros indicados.
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    maestros.data.map((maestro) => {
                                        const nombre = maestro.nombre_completo || `${maestro.nombre} ${maestro.apellido_paterno} ${maestro.apellido_materno || ''}`;
                                        return (
                                            <TableRow key={maestro.id} hover>
                                                <TableCell>
                                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                        {nombre}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                                        {maestro.correo}
                                                    </Typography>
                                                    {maestro.telefono && (
                                                        <Typography variant="caption" color="text.secondary">
                                                            Tel: {maestro.telefono}
                                                        </Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                                                    <div>{maestro.curp}</div>
                                                    {maestro.rfc && <span className="text-neutral-500">{maestro.rfc}</span>}
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                        {maestro.puesto}
                                                    </Typography>
                                                    <Chip
                                                        label={maestro.tipo_personal}
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{ textTransform: 'capitalize', fontSize: '0.7rem' }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    {maestro.materias && maestro.materias.length > 0 ? (
                                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, maxWidth: 220 }}>
                                                            {maestro.materias.map((m, i) => (
                                                                <Chip key={i} label={m} size="small" sx={{ fontSize: '0.7rem' }} />
                                                            ))}
                                                        </Box>
                                                    ) : (
                                                        <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                                            Sin materias
                                                        </Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {maestro.grupos && maestro.grupos.length > 0 ? (
                                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                            {maestro.grupos.map((g, i) => (
                                                                <Chip key={i} label={g} size="small" color="primary" variant="outlined" sx={{ fontWeight: 'bold' }} />
                                                            ))}
                                                        </Box>
                                                    ) : (
                                                        <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                                            Sin grupos
                                                        </Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <EstatusBadge estatus={maestro.estatus} tipo="maestro" />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                                                        <Tooltip title="Ver Detalles">
                                                            <IconButton
                                                                size="small"
                                                                color="info"
                                                                onClick={() => abrirDetalles(maestro)}
                                                            >
                                                                <Eye className="size-4" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Editar">
                                                            <IconButton
                                                                size="small"
                                                                color="primary"
                                                                onClick={() => abrirEditar(maestro)}
                                                            >
                                                                <Pencil className="size-4" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Eliminar">
                                                            <IconButton
                                                                size="small"
                                                                color="error"
                                                                onClick={() => abrirEliminar(maestro)}
                                                            >
                                                                <Trash2 className="size-4" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Paginación */}
                    <Box sx={{ p: 2 }}>
                        <PaginacionControls paginacion={maestros} />
                    </Box>
                </Card>
            </div>

            {/* Modal de Creación / Edición */}
            <MaestroModal
                abierto={modalFormularioAbierto}
                maestroParaEditar={maestroSeleccionado}
                onCerrar={() => setModalFormularioAbierto(false)}
            />

            {/* Modal de Ver Detalles */}
            <MaestroDetallesModal
                abierto={modalDetallesAbierto}
                maestro={maestroSeleccionado}
                onCerrar={() => setModalDetallesAbierto(false)}
                onEditar={(m) => abrirEditar(m)}
            />

            {/* Modal de Confirmación de Eliminación */}
            <ConfirmacionEliminarModal
                abierto={modalEliminarAbierto}
                titulo="¿Eliminar Maestro/Personal?"
                mensaje={`¿Estás seguro de que deseas eliminar el registro de ${maestroParaEliminar?.nombre_completo || maestroParaEliminar?.nombre}?`}
                procesando={eliminando}
                onCerrar={() => setModalEliminarAbierto(false)}
                onConfirmar={confirmarEliminacion}
            />
        </AppLayout>
    );
}
