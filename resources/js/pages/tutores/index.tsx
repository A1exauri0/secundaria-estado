// ==========================================
// Página Principal del Módulo de Tutores
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
    Eye,
    Pencil,
    Plus,
    RotateCcw,
    Search,
    Trash2,
    UserCheck,
    UserMinus,
    Users,
} from 'lucide-react';

// Componentes del Módulo
import { TutorModal } from '@/components/tutores/tutor-modal';
import { TutorDetallesModal } from '@/components/tutores/tutor-detalles-modal';
import { ConfirmacionEliminarModal } from '@/components/escolar/confirmacion-eliminar-modal';
import { PaginacionControls } from '@/components/escolar/paginacion-controls';

const migasDePan: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Tutores', href: '/tutores' },
];

interface Props {
    tutores: PaginacionData<Tutor>;
    listaAlumnos: Alumno[];
    filtros: {
        busqueda?: string;
        parentesco?: string;
    };
    estadisticas: {
        total: number;
        con_alumnos: number;
        sin_alumnos: number;
    };
}

export default function TutoresIndex({
    tutores,
    listaAlumnos,
    filtros,
    estadisticas,
}: Props) {
    // Estados para filtros
    const [busqueda, setBusqueda] = useState(filtros.busqueda || '');
    const [parentesco, setParentesco] = useState(filtros.parentesco || '');

    // Estados para modales
    const [modalFormularioAbierto, setModalFormularioAbierto] = useState(false);
    const [modalDetallesAbierto, setModalDetallesAbierto] = useState(false);
    const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);

    const [tutorSeleccionado, setTutorSeleccionado] = useState<Tutor | null>(null);
    const [tutorParaEliminar, setTutorParaEliminar] = useState<Tutor | null>(null);
    const [eliminando, setEliminando] = useState(false);

    // Aplicar filtros
    const aplicarFiltros = (nuevosValores = {}) => {
        router.get(
            '/tutores',
            {
                busqueda,
                parentesco,
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
        setParentesco('');
        router.get('/tutores', {}, { preserveState: true });
    };

    const abrirCrear = () => {
        setTutorSeleccionado(null);
        setModalFormularioAbierto(true);
    };

    const abrirEditar = (tutor: Tutor) => {
        setTutorSeleccionado(tutor);
        setModalFormularioAbierto(true);
    };

    const abrirDetalles = (tutor: Tutor) => {
        setTutorSeleccionado(tutor);
        setModalDetallesAbierto(true);
    };

    const abrirEliminar = (tutor: Tutor) => {
        setTutorParaEliminar(tutor);
        setModalEliminarAbierto(true);
    };

    const confirmarEliminacion = () => {
        if (!tutorParaEliminar) return;
        setEliminando(true);
        router.delete(`/tutores/${tutorParaEliminar.id}`, {
            onSuccess: () => {
                setModalEliminarAbierto(false);
                setTutorParaEliminar(null);
                setEliminando(false);
            },
            onError: () => setEliminando(false),
        });
    };

    return (
        <AppLayout breadcrumbs={migasDePan}>
            <Head title="Tutores y Padres de Familia" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Encabezado Principal */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#991b1b', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Users className="size-7 text-red-600" />
                            Tutores y Padres de Familia
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Directorio de contactos de emergencia, padres y tutores responsables de alumnos.
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
                        Nuevo Tutor
                    </Button>
                </div>



                {/* Filtros */}
                <Card sx={{ p: 2.5, bgcolor: 'background.paper' }}>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                        <div className="md:col-span-6">
                            <TextField
                                size="small"
                                fullWidth
                                placeholder="Buscar por nombre, teléfono, correo u ocupación..."
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

                        <div className="md:col-span-4">
                            <TextField
                                select
                                size="small"
                                fullWidth
                                label="Parentesco"
                                value={parentesco}
                                onChange={(e) => {
                                    setParentesco(e.target.value);
                                    aplicarFiltros({ parentesco: e.target.value });
                                }}
                            >
                                <MenuItem value="">Todos los Parentescos</MenuItem>
                                <MenuItem value="Padre">Padre</MenuItem>
                                <MenuItem value="Madre">Madre</MenuItem>
                                <MenuItem value="Tutor Legal">Tutor Legal</MenuItem>
                                <MenuItem value="Abuelo/a">Abuelo/a</MenuItem>
                                <MenuItem value="Tío/a">Tío/a</MenuItem>
                                <MenuItem value="Hermano/a">Hermano/a</MenuItem>
                                <MenuItem value="Otro">Otro</MenuItem>
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
                            {(busqueda || parentesco) && (
                                <Tooltip title="Limpiar filtros">
                                    <IconButton onClick={limpiarFiltros} color="inherit">
                                        <RotateCcw className="size-5" />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </div>
                    </div>
                </Card>

                {/* Tabla de Tutores */}
                <Card sx={{ bgcolor: 'background.paper', overflow: 'hidden' }}>
                    <TableContainer>
                        <Table sx={{ minWidth: 800 }}>
                            <TableHead sx={{ bgcolor: '#fef2f2' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#991b1b' }}>Tutor / Responsable</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#991b1b' }}>Parentesco</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#991b1b' }}>Teléfono Principal</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#991b1b' }}>Correo Electrónico</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#991b1b' }}>Alumnos a Cargo</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold', color: '#991b1b' }}>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tutores.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                                            <Typography variant="body1" color="text.secondary">
                                                No se encontraron tutores con los filtros actuales.
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    tutores.data.map((tutor) => {
                                        const nombre = tutor.nombre_completo || `${tutor.nombre} ${tutor.apellido_paterno} ${tutor.apellido_materno || ''}`;
                                        return (
                                            <TableRow key={tutor.id} hover>
                                                <TableCell>
                                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                        {nombre}
                                                    </Typography>
                                                    {tutor.ocupacion && (
                                                        <Typography variant="caption" color="text.secondary">
                                                            {tutor.ocupacion}
                                                        </Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={tutor.parentesco_predeterminado}
                                                        size="small"
                                                        sx={{ fontWeight: 'bold', bgcolor: '#fef2f2', color: '#991b1b' }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                        {tutor.telefono}
                                                    </Typography>
                                                    {tutor.telefono_secundario && (
                                                        <Typography variant="caption" color="text.secondary">
                                                            Alt: {tutor.telefono_secundario}
                                                        </Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {tutor.correo ? (
                                                        <Typography variant="body2">{tutor.correo}</Typography>
                                                    ) : (
                                                        <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                                            Sin correo
                                                        </Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {tutor.alumnos && tutor.alumnos.length > 0 ? (
                                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                                            {tutor.alumnos.map((a) => (
                                                                <Chip
                                                                    key={a.id}
                                                                    label={`${a.nombre_completo || a.nombre} (${a.grado} "${a.grupo}")`}
                                                                    size="small"
                                                                    variant="outlined"
                                                                    sx={{ fontSize: '0.75rem', justifyContent: 'flex-start' }}
                                                                />
                                                            ))}
                                                        </Box>
                                                    ) : (
                                                        <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                                            Ningún alumno asociado
                                                        </Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                                                        <Tooltip title="Ver Detalles">
                                                            <IconButton
                                                                size="small"
                                                                color="info"
                                                                onClick={() => abrirDetalles(tutor)}
                                                            >
                                                                <Eye className="size-4" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Editar">
                                                            <IconButton
                                                                size="small"
                                                                color="primary"
                                                                onClick={() => abrirEditar(tutor)}
                                                            >
                                                                <Pencil className="size-4" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Eliminar">
                                                            <IconButton
                                                                size="small"
                                                                color="error"
                                                                onClick={() => abrirEliminar(tutor)}
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
                        <PaginacionControls paginacion={tutores} />
                    </Box>
                </Card>
            </div>

            {/* Modal de Creación / Edición */}
            <TutorModal
                abierto={modalFormularioAbierto}
                tutorParaEditar={tutorSeleccionado}
                listaAlumnos={listaAlumnos}
                onCerrar={() => setModalFormularioAbierto(false)}
            />

            {/* Modal de Ver Detalles */}
            <TutorDetallesModal
                abierto={modalDetallesAbierto}
                tutor={tutorSeleccionado}
                onCerrar={() => setModalDetallesAbierto(false)}
                onEditar={(t) => abrirEditar(t)}
            />

            {/* Modal de Confirmación de Eliminación */}
            <ConfirmacionEliminarModal
                abierto={modalEliminarAbierto}
                titulo="¿Eliminar Tutor?"
                mensaje={`¿Estás seguro de que deseas eliminar a ${tutorParaEliminar?.nombre_completo || tutorParaEliminar?.nombre}? Esto removerá la relación con los alumnos que tenía vinculados.`}
                procesando={eliminando}
                onCerrar={() => setModalEliminarAbierto(false)}
                onConfirmar={confirmarEliminacion}
            />
        </AppLayout>
    );
}
