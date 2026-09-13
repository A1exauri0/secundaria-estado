// ==========================================
// Panel Principal (Dashboard) Institucional
// ==========================================

// Importaciones de React e Inertia
import React from 'react';
import { Head, Link } from '@inertiajs/react';

// Layouts y Tipos
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Alumno, Maestro } from '@/types/escolar';

// Componentes de Material UI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// Iconos
import {
    ArrowRight,
    BookOpen,
    GraduationCap,
    School,
    Sparkles,
    UserCheck,
    Users,
} from 'lucide-react';

// Componentes Escolares
import { EstatusBadge } from '@/components/escolar/estatus-badge';

const migasDePan: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
];

interface DashboardProps {
    estadisticas: {
        totalAlumnos: number;
        alumnosActivos: number;
        totalMaestros: number;
        totalDocentes: number;
        totalTutores: number;
        alumnosPorGrado: {
            primer_grado: number;
            segundo_grado: number;
            tercer_grado: number;
        };
        alumnosPorSexo: {
            hombres: number;
            mujeres: number;
        };
    };
    ultimosAlumnos: Alumno[];
    ultimosMaestros: Maestro[];
}

export default function Dashboard({
    estadisticas,
    ultimosAlumnos = [],
    ultimosMaestros = [],
}: DashboardProps) {
    const totalGrados = (estadisticas.alumnosPorGrado.primer_grado + estadisticas.alumnosPorGrado.segundo_grado + estadisticas.alumnosPorGrado.tercer_grado) || 1;
    const totalSexo = (estadisticas.alumnosPorSexo.hombres + estadisticas.alumnosPorSexo.mujeres) || 1;

    const porcPrimerGrado = Math.round((estadisticas.alumnosPorGrado.primer_grado / totalGrados) * 100);
    const porcSegundoGrado = Math.round((estadisticas.alumnosPorGrado.segundo_grado / totalGrados) * 100);
    const porcTercerGrado = Math.round((estadisticas.alumnosPorGrado.tercer_grado / totalGrados) * 100);

    const porcHombres = Math.round((estadisticas.alumnosPorSexo.hombres / totalSexo) * 100);
    const porcMujeres = Math.round((estadisticas.alumnosPorSexo.mujeres / totalSexo) * 100);

    return (
        <AppLayout breadcrumbs={migasDePan}>
            <Head title="Panel de Control Escolar" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Banner Hero Institucional en Tonos Rojos */}
                <Box
                    sx={{
                        background: 'linear-gradient(135deg, #7f1d1d 0%, #b91c1c 50%, #dc2626 100%)',
                        color: '#ffffff',
                        p: { xs: 3, md: 4 },
                        borderRadius: 3,
                        boxShadow: '0 10px 25px -5px rgba(185, 28, 28, 0.3)',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 800 }}>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(255, 255, 255, 0.15)', px: 1.5, py: 0.5, borderRadius: 2, mb: 2 }}>
                            <School className="size-4 text-red-200" />
                            <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                                Escuela Secundaria del Estado — Turno Matutino
                            </Typography>
                        </Box>
                        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, fontSize: { xs: '1.5rem', md: '2.1rem' } }}>
                            Sistema Integral de Gestión y Control Escolar
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 3 }}>
                            Plataforma de administración para alumnos, matrícula estudiantil, plantilla docente y red de tutores.
                        </Typography>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                            <Link href="/alumnos">
                                <Button
                                    variant="contained"
                                    sx={{
                                        bgcolor: '#ffffff',
                                        color: '#991b1b',
                                        fontWeight: 700,
                                        '&:hover': { bgcolor: '#fef2f2' },
                                    }}
                                    startIcon={<GraduationCap className="size-4" />}
                                >
                                    Ir a Alumnos
                                </Button>
                            </Link>
                            <Link href="/maestros">
                                <Button
                                    variant="outlined"
                                    sx={{
                                        borderColor: 'rgba(255, 255, 255, 0.5)',
                                        color: '#ffffff',
                                        fontWeight: 600,
                                        '&:hover': { borderColor: '#ffffff', bgcolor: 'rgba(255, 255, 255, 0.1)' },
                                    }}
                                    startIcon={<UserCheck className="size-4" />}
                                >
                                    Plantilla Docente
                                </Button>
                            </Link>
                            <Link href="/tutores">
                                <Button
                                    variant="outlined"
                                    sx={{
                                        borderColor: 'rgba(255, 255, 255, 0.5)',
                                        color: '#ffffff',
                                        fontWeight: 600,
                                        '&:hover': { borderColor: '#ffffff', bgcolor: 'rgba(255, 255, 255, 0.1)' },
                                    }}
                                    startIcon={<Users className="size-4" />}
                                >
                                    Directorio de Tutores
                                </Button>
                            </Link>
                        </Box>
                    </Box>

                    {/* Decoración geométrica */}
                    <Box
                        sx={{
                            position: 'absolute',
                            right: -30,
                            bottom: -40,
                            opacity: 0.1,
                            pointerEvents: 'none',
                        }}
                    >
                        <School className="size-96" />
                    </Box>
                </Box>

                {/* Métricas Principales en Rojo */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card sx={{ borderTop: '4px solid #dc2626', bgcolor: 'background.paper' }}>
                        <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>ALUMNOS ACTIVOS</Typography>
                                    <Typography variant="h3" sx={{ fontWeight: 800, color: '#991b1b', mt: 0.5 }}>
                                        {estadisticas.alumnosActivos}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        De un total de {estadisticas.totalAlumnos} registrados
                                    </Typography>
                                </div>
                                <Box sx={{ p: 1.5, bgcolor: '#fef2f2', borderRadius: 2 }}>
                                    <GraduationCap className="size-7 text-red-600" />
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>

                    <Card sx={{ borderTop: '4px solid #b91c1c', bgcolor: 'background.paper' }}>
                        <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>DOCENTES TITULARES</Typography>
                                    <Typography variant="h3" sx={{ fontWeight: 800, color: '#991b1b', mt: 0.5 }}>
                                        {estadisticas.totalDocentes}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {estadisticas.totalMaestros} empleados en total
                                    </Typography>
                                </div>
                                <Box sx={{ p: 1.5, bgcolor: '#fef2f2', borderRadius: 2 }}>
                                    <BookOpen className="size-7 text-red-600" />
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>

                    <Card sx={{ borderTop: '4px solid #991b1b', bgcolor: 'background.paper' }}>
                        <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>TUTORES REGISTRADOS</Typography>
                                    <Typography variant="h3" sx={{ fontWeight: 800, color: '#991b1b', mt: 0.5 }}>
                                        {estadisticas.totalTutores}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Padres y contactos de emergencia
                                    </Typography>
                                </div>
                                <Box sx={{ p: 1.5, bgcolor: '#fef2f2', borderRadius: 2 }}>
                                    <Users className="size-7 text-red-600" />
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>

                    <Card sx={{ borderTop: '4px solid #7f1d1d', bgcolor: 'background.paper' }}>
                        <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>GRUPOS ACTIVOS</Typography>
                                    <Typography variant="h3" sx={{ fontWeight: 800, color: '#991b1b', mt: 0.5 }}>
                                        12
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Turno Matutino (1°, 2°, 3°)
                                    </Typography>
                                </div>
                                <Box sx={{ p: 1.5, bgcolor: '#fef2f2', borderRadius: 2 }}>
                                    <School className="size-7 text-red-600" />
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </div>

                {/* Estadísticas de Distribución Escolar */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Alumnos por Grado */}
                    <Card sx={{ p: 3, bgcolor: 'background.paper' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#991b1b', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <GraduationCap className="size-5 text-red-600" />
                            Distribución de Matrícula por Grado
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                            <div>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>1° de Secundaria</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>{estadisticas.alumnosPorGrado.primer_grado}</strong> alumnos ({porcPrimerGrado}%)
                                    </Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={porcPrimerGrado}
                                    sx={{ height: 10, borderRadius: 5, bgcolor: '#fee2e2', '& .MuiLinearProgress-bar': { bgcolor: '#dc2626' } }}
                                />
                            </div>

                            <div>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>2° de Secundaria</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>{estadisticas.alumnosPorGrado.segundo_grado}</strong> alumnos ({porcSegundoGrado}%)
                                    </Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={porcSegundoGrado}
                                    sx={{ height: 10, borderRadius: 5, bgcolor: '#fee2e2', '& .MuiLinearProgress-bar': { bgcolor: '#b91c1c' } }}
                                />
                            </div>

                            <div>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>3° de Secundaria</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>{estadisticas.alumnosPorGrado.tercer_grado}</strong> alumnos ({porcTercerGrado}%)
                                    </Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={porcTercerGrado}
                                    sx={{ height: 10, borderRadius: 5, bgcolor: '#fee2e2', '& .MuiLinearProgress-bar': { bgcolor: '#991b1b' } }}
                                />
                            </div>
                        </Box>
                    </Card>

                    {/* Distribución por Género */}
                    <Card sx={{ p: 3, bgcolor: 'background.paper' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#991b1b', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Users className="size-5 text-red-600" />
                            Composición Estudiantil
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                            <div>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Alumnos Masculinos (Hombres)</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>{estadisticas.alumnosPorSexo.hombres}</strong> ({porcHombres}%)
                                    </Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={porcHombres}
                                    sx={{ height: 10, borderRadius: 5, bgcolor: '#e0f2fe', '& .MuiLinearProgress-bar': { bgcolor: '#0284c7' } }}
                                />
                            </div>

                            <div>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Alumnas Femeninas (Mujeres)</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>{estadisticas.alumnosPorSexo.mujeres}</strong> ({porcMujeres}%)
                                    </Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={porcMujeres}
                                    sx={{ height: 10, borderRadius: 5, bgcolor: '#fce7f3', '& .MuiLinearProgress-bar': { bgcolor: '#db2777' } }}
                                />
                            </div>

                            <Box sx={{ p: 2, bgcolor: '#fef2f2', borderRadius: 2, mt: 1 }}>
                                <Typography variant="caption" sx={{ color: '#991b1b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <Sparkles className="size-3.5" />
                                    Información sincronizada con la base de datos de la secundaria.
                                </Typography>
                            </Box>
                        </Box>
                    </Card>
                </div>

                {/* Tablas de Últimos Registros */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Alumnos Recientes */}
                    <Card sx={{ bgcolor: 'background.paper', overflow: 'hidden' }}>
                        <Box sx={{ p: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                Alumnos Recién Registrados
                            </Typography>
                            <Link href="/alumnos">
                                <Button size="small" endIcon={<ArrowRight className="size-4" />} color="primary">
                                    Ver todos
                                </Button>
                            </Link>
                        </Box>

                        <TableContainer>
                            <Table size="small">
                                <TableHead sx={{ bgcolor: '#fef2f2' }}>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold', color: '#991b1b' }}>Matrícula</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', color: '#991b1b' }}>Nombre</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', color: '#991b1b' }}>Grado / Grupo</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', color: '#991b1b' }}>Estatus</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {ultimosAlumnos.map((a) => (
                                        <TableRow key={a.id} hover>
                                            <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>{a.matricula}</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>{a.nombre_completo || a.nombre}</TableCell>
                                            <TableCell>{a.grado} "{a.grupo}"</TableCell>
                                            <TableCell><EstatusBadge estatus={a.estatus} /></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>

                    {/* Docentes Recientes */}
                    <Card sx={{ bgcolor: 'background.paper', overflow: 'hidden' }}>
                        <Box sx={{ p: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                Plantilla Docente y Administrativa
                            </Typography>
                            <Link href="/maestros">
                                <Button size="small" endIcon={<ArrowRight className="size-4" />} color="primary">
                                    Ver todos
                                </Button>
                            </Link>
                        </Box>

                        <TableContainer>
                            <Table size="small">
                                <TableHead sx={{ bgcolor: '#fef2f2' }}>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold', color: '#991b1b' }}>Personal</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', color: '#991b1b' }}>Puesto</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', color: '#991b1b' }}>Tipo</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', color: '#991b1b' }}>Estatus</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {ultimosMaestros.map((m) => (
                                        <TableRow key={m.id} hover>
                                            <TableCell sx={{ fontWeight: 'bold' }}>{m.nombre_completo || m.nombre}</TableCell>
                                            <TableCell>{m.puesto}</TableCell>
                                            <TableCell>
                                                <Chip label={m.tipo_personal} size="small" sx={{ textTransform: 'capitalize' }} />
                                            </TableCell>
                                            <TableCell><EstatusBadge estatus={m.estatus} tipo="maestro" /></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
