// ==========================================
// Página Principal del Módulo de Alumnos
// ==========================================

// Importaciones de React e Inertia
import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';

// Layouts y Tipos
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Alumno, PaginacionData, Tutor } from '@/types/escolar';

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
    Award,
    Eye,
    GraduationCap,
    Pencil,
    Plus,
    RotateCcw,
    Search,
    Trash2,
    UserCheck,
    UserX,
} from 'lucide-react';

// Componentes del Módulo
import { AlumnoModal } from '@/components/alumnos/alumno-modal';
import { AlumnoDetallesModal } from '@/components/alumnos/alumno-detalles-modal';
import { ConfirmacionEliminarModal } from '@/components/escolar/confirmacion-eliminar-modal';
import { EstatusBadge } from '@/components/escolar/estatus-badge';
import { PaginacionControls } from '@/components/escolar/paginacion-controls';

const migasDePan: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Alumnos', href: '/alumnos' },
];

interface Props {
    alumnos: PaginacionData<Alumno>;
    listaTutores: Tutor[];
    filtros: {
        busqueda?: string;
        grado?: string;
        grupo?: string;
        estatus?: string;
    };
    estadisticas: {
        total: number;
        activos: number;
        bajas: number;
        egresados: number;
    };
}

export default function AlumnosIndex({
    alumnos,
    listaTutores,
    filtros,
    estadisticas,
}: Props) {
    // Estados para filtros
    const [busqueda, setBusqueda] = useState(filtros.busqueda || '');
    const [grado, setGrado] = useState(filtros.grado || '');
    const [grupo, setGrupo] = useState(filtros.grupo || '');
    const [estatus, setEstatus] = useState(filtros.estatus || '');

    // Estados para modales
    const [modalFormularioAbierto, setModalFormularioAbierto] = useState(false);
    const [modalDetallesAbierto, setModalDetallesAbierto] = useState(false);
    const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);

    const [alumnoSeleccionado, setAlumnoSeleccionado] = useState<Alumno | null>(null);
    const [alumnoParaEliminar, setAlumnoParaEliminar] = useState<Alumno | null>(null);
    const [eliminando, setEliminando] = useState(false);

    // Función para aplicar filtros de búsqueda
    const aplicarFiltros = (nuevosValores = {}) => {
        router.get(
            '/alumnos',
            {
                busqueda,
                grado,
                grupo,
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
        setGrado('');
        setGrupo('');
        setEstatus('');
        router.get('/alumnos', {}, { preserveState: true });
    };

    // Abrir modal de nuevo alumno
    const abrirCrear = () => {
        setAlumnoSeleccionado(null);
        setModalFormularioAbierto(true);
    };

    // Abrir modal para editar alumno
    const abrirEditar = (alumno: Alumno) => {
        setAlumnoSeleccionado(alumno);
        setModalFormularioAbierto(true);
    };

    // Abrir modal de detalles
    const abrirDetalles = (alumno: Alumno) => {
        setAlumnoSeleccionado(alumno);
        setModalDetallesAbierto(true);
    };

    // Abrir modal para confirmar eliminación
    const abrirEliminar = (alumno: Alumno) => {
        setAlumnoParaEliminar(alumno);
        setModalEliminarAbierto(true);
    };

    // Ejecutar eliminación
    const confirmarEliminacion = () => {
        if (!alumnoParaEliminar) return;
        setEliminando(true);
        router.delete(`/alumnos/${alumnoParaEliminar.id}`, {
            onSuccess: () => {
                setModalEliminarAbierto(false);
                setAlumnoParaEliminar(null);
                setEliminando(false);
            },
            onError: () => setEliminando(false),
        });
    };

    return (
        <AppLayout breadcrumbs={migasDePan}>
            <Head title="Gestión de Alumnos" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Encabezado Principal */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#991b1b', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <GraduationCap className="size-7 text-red-600" />
                            Control Escolar de Alumnos
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Administración de expedientes, matrículas, estatus y asignación de tutores.
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
                        Nuevo Alumno
                    </Button>
                </div>



                {/* Barra de Filtros y Búsqueda */}
                <Card sx={{ p: 2.5, bgcolor: 'background.paper' }}>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                        <div className="md:col-span-4">
                            <TextField
                                size="small"
                                fullWidth
                                placeholder="Buscar por nombre, CURP, matrícula..."
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

                        <div className="md:col-span-2">
                            <TextField
                                select
                                size="small"
                                fullWidth
                                label="Grado"
                                value={grado}
                                onChange={(e) => {
                                    setGrado(e.target.value);
                                    aplicarFiltros({ grado: e.target.value });
                                }}
                            >
                                <MenuItem value="">Todos los Grados</MenuItem>
                                <MenuItem value="1°">1° de Secundaria</MenuItem>
                                <MenuItem value="2°">2° de Secundaria</MenuItem>
                                <MenuItem value="3°">3° de Secundaria</MenuItem>
                            </TextField>
                        </div>

                        <div className="md:col-span-2">
                            <TextField
                                select
                                size="small"
                                fullWidth
                                label="Grupo"
                                value={grupo}
                                onChange={(e) => {
                                    setGrupo(e.target.value);
                                    aplicarFiltros({ grupo: e.target.value });
                                }}
                            >
                                <MenuItem value="">Todos los Grupos</MenuItem>
                                {['A', 'B', 'C', 'D', 'E', 'F'].map((g) => (
                                    <MenuItem key={g} value={g}>
                                        Grupo {g}
                                    </MenuItem>
                                ))}
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
                                <MenuItem value="egresado">Egresado</MenuItem>
                                <MenuItem value="baja">Baja</MenuItem>
                                <MenuItem value="suspendido">Suspendido</MenuItem>
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
                            {(busqueda || grado || grupo || estatus) && (
                                <Tooltip title="Limpiar filtros">
                                    <IconButton onClick={limpiarFiltros} color="inherit">
                                        <RotateCcw className="size-5" />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </div>
                    </div>
                </Card>

                {/* Tabla de Alumnos */}
                <Card sx={{ bgcolor: 'background.paper', overflow: 'hidden' }}>
                    <TableContainer>
                        <Table sx={{ minWidth: 800 }}>
                            <TableHead sx={{ bgcolor: '#fef2f2' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#991b1b' }}>Matrícula</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#991b1b' }}>Nombre Completo</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#991b1b' }}>CURP</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#991b1b' }}>Grado y Grupo</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#991b1b' }}>Tutor(es) Responsable(s)</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#991b1b' }}>Estatus</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold', color: '#991b1b' }}>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {alumnos.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                                            <Typography variant="body1" color="text.secondary">
                                                No se encontraron alumnos con los criterios seleccionados.
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    alumnos.data.map((alumno) => {
                                        const nombre = alumno.nombre_completo || `${alumno.nombre} ${alumno.apellido_paterno} ${alumno.apellido_materno || ''}`;
                                        return (
                                            <TableRow key={alumno.id} hover>
                                                <TableCell sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
                                                    {alumno.matricula}
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                        {nombre}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {alumno.correo_institucional || 'Sin correo'}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                                                    {alumno.curp}
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={`${alumno.grado} "${alumno.grupo}"`}
                                                        size="small"
                                                        sx={{ fontWeight: 'bold', bgcolor: '#fef2f2', color: '#991b1b' }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    {alumno.tutores && alumno.tutores.length > 0 ? (
                                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                                            {alumno.tutores.map((t) => (
                                                                <Typography key={t.id} variant="caption" sx={{ display: 'block' }}>
                                                                    <strong>{t.nombre_completo || `${t.nombre} ${t.apellido_paterno}`}</strong> ({t.pivot?.parentesco || t.parentesco_predeterminado})
                                                                </Typography>
                                                            ))}
                                                        </Box>
                                                    ) : (
                                                        <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                                            Sin tutor asignado
                                                        </Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <EstatusBadge estatus={alumno.estatus} />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                                                        <Tooltip title="Ver Detalles">
                                                            <IconButton
                                                                size="small"
                                                                color="info"
                                                                onClick={() => abrirDetalles(alumno)}
                                                            >
                                                                <Eye className="size-4" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Editar">
                                                            <IconButton
                                                                size="small"
                                                                color="primary"
                                                                onClick={() => abrirEditar(alumno)}
                                                            >
                                                                <Pencil className="size-4" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Eliminar">
                                                            <IconButton
                                                                size="small"
                                                                color="error"
                                                                onClick={() => abrirEliminar(alumno)}
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

                    {/* Controles de Paginación */}
                    <Box sx={{ p: 2 }}>
                        <PaginacionControls paginacion={alumnos} />
                    </Box>
                </Card>
            </div>

            {/* Modal de Creación / Edición */}
            <AlumnoModal
                abierto={modalFormularioAbierto}
                alumnoParaEditar={alumnoSeleccionado}
                listaTutores={listaTutores}
                onCerrar={() => setModalFormularioAbierto(false)}
            />

            {/* Modal de Ver Detalles */}
            <AlumnoDetallesModal
                abierto={modalDetallesAbierto}
                alumno={alumnoSeleccionado}
                onCerrar={() => setModalDetallesAbierto(false)}
                onEditar={(a) => abrirEditar(a)}
            />

            {/* Modal de Confirmación de Eliminación */}
            <ConfirmacionEliminarModal
                abierto={modalEliminarAbierto}
                titulo="¿Eliminar Alumno?"
                mensaje={`¿Estás seguro de que deseas eliminar a ${alumnoParaEliminar?.nombre_completo || alumnoParaEliminar?.nombre}? Esta acción desvinculará sus tutores y eliminará su expediente escolar.`}
                procesando={eliminando}
                onCerrar={() => setModalEliminarAbierto(false)}
                onConfirmar={confirmarEliminacion}
            />
        </AppLayout>
    );
}
