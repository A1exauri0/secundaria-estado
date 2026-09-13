// ==========================================
// Componente Modal de Detalles de Usuario
// ==========================================

// Importaciones de React
import React from 'react';

// Tipos
import { Usuario } from '@/types/escolar';

// Componentes de Material UI
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';

// Iconos
import {
    Calendar,
    CheckCircle2,
    Mail,
    Phone,
    Shield,
    UserCheck,
    XCircle,
} from 'lucide-react';

interface UsuarioDetallesModalProps {
    abierto: boolean;
    usuario: Usuario | null;
    onCerrar: () => void;
    onEditar: (usuario: Usuario) => void;
}

export function UsuarioDetallesModal({
    abierto,
    usuario,
    onCerrar,
    onEditar,
}: UsuarioDetallesModalProps) {
    if (!usuario) return null;

    // Obtener iniciales para avatar
    const iniciales = usuario.name
        ? usuario.name
              .split(' ')
              .map((n) => n[0])
              .slice(0, 2)
              .join('')
              .toUpperCase()
        : 'US';

    // Etiqueta legible de rol
    const mapeoRoles: Record<string, { label: string; color: string; bg: string }> = {
        admin: { label: 'Administrador General', color: '#991b1b', bg: '#fef2f2' },
        directivo: { label: 'Directivo / Subdirección', color: '#6d28d9', bg: '#f5f3ff' },
        control_escolar: { label: 'Control Escolar', color: '#1d4ed8', bg: '#eff6ff' },
        docente: { label: 'Docente / Profesor', color: '#c2410c', bg: '#fff7ed' },
        consulta: { label: 'Solo Consulta', color: '#475569', bg: '#f1f5f9' },
    };

    const infoRol = mapeoRoles[usuario.rol] || { label: usuario.rol, color: '#475569', bg: '#f1f5f9' };

    return (
        <Dialog
            open={abierto}
            onClose={onCerrar}
            maxWidth="sm"
            fullWidth
            slotProps={{
                paper: {
                    sx: { borderRadius: 3, p: 1 },
                },
            }}
        >
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#991b1b' }}>
                    Expediente del Usuario
                </Typography>
                <Chip
                    icon={usuario.estatus === 'activo' ? <CheckCircle2 className="size-3.5" /> : <XCircle className="size-3.5" />}
                    label={usuario.estatus === 'activo' ? 'ACTIVO' : 'INACTIVO'}
                    size="small"
                    color={usuario.estatus === 'activo' ? 'success' : 'default'}
                    sx={{ fontWeight: 'bold', fontSize: '0.7rem' }}
                />
            </DialogTitle>

            <DialogContent dividers>
                {/* Cabecera del Usuario con Avatar */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 3 }}>
                    <Avatar
                        sx={{
                            width: 64,
                            height: 64,
                            bgcolor: '#991b1b',
                            fontSize: '1.4rem',
                            fontWeight: 'bold',
                            boxShadow: '0 4px 12px rgba(153, 27, 27, 0.25)',
                        }}
                    >
                        {iniciales}
                    </Avatar>
                    <div>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
                            {usuario.name}
                        </Typography>
                        <Box sx={{ display: 'inline-flex', mt: 0.8 }}>
                            <span
                                style={{
                                    backgroundColor: infoRol.bg,
                                    color: infoRol.color,
                                    padding: '3px 10px',
                                    borderRadius: 6,
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                }}
                            >
                                {infoRol.label}
                            </span>
                        </Box>
                    </div>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Información de Contacto y Seguridad */}
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#334155', mb: 2 }}>
                    Datos de la Cuenta Institucional
                </Typography>

                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                            <Mail className="size-4 text-neutral-400 mt-1 shrink-0" />
                            <div>
                                <Typography variant="caption" color="text.secondary">CORREO ELECTRÓNICO</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a' }}>
                                    {usuario.email}
                                </Typography>
                            </div>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                            <Phone className="size-4 text-neutral-400 mt-1 shrink-0" />
                            <div>
                                <Typography variant="caption" color="text.secondary">TELÉFONO DE CONTACTO</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a' }}>
                                    {usuario.telefono || 'Sin registrar'}
                                </Typography>
                            </div>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                            <Shield className="size-4 text-neutral-400 mt-1 shrink-0" />
                            <div>
                                <Typography variant="caption" color="text.secondary">ROL ASIGNADO</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a' }}>
                                    {infoRol.label}
                                </Typography>
                            </div>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                            <Calendar className="size-4 text-neutral-400 mt-1 shrink-0" />
                            <div>
                                <Typography variant="caption" color="text.secondary">FECHA DE ALTA</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a' }}>
                                    {usuario.created_at
                                        ? new Date(usuario.created_at).toLocaleDateString('es-MX', {
                                              year: 'numeric',
                                              month: 'long',
                                              day: 'numeric',
                                          })
                                        : 'Reciente'}
                                </Typography>
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
                <Button onClick={onCerrar} variant="outlined" sx={{ color: '#475569', borderColor: '#cbd5e1' }}>
                    Cerrar
                </Button>
                <Button
                    onClick={() => {
                        onCerrar();
                        onEditar(usuario);
                    }}
                    variant="contained"
                    sx={{
                        bgcolor: '#dc2626',
                        color: '#ffffff',
                        '&:hover': { bgcolor: '#b91c1c' },
                        fontWeight: 700,
                    }}
                >
                    Editar Usuario
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default UsuarioDetallesModal;
