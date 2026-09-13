// ==========================================
// Componente Modal de Confirmación de Eliminación
// ==========================================

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { TriangleAlert } from 'lucide-react';

interface ConfirmacionEliminarModalProps {
    abierto: boolean;
    titulo: string;
    mensaje: string;
    procesando?: boolean;
    onCerrar: () => void;
    onConfirmar: () => void;
}

export function ConfirmacionEliminarModal({
    abierto,
    titulo,
    mensaje,
    procesando = false,
    onCerrar,
    onConfirmar,
}: ConfirmacionEliminarModalProps) {
    return (
        <Dialog
            open={abierto}
            onClose={procesando ? undefined : onCerrar}
            maxWidth="xs"
            fullWidth
            slotProps={{
                paper: {
                    sx: { borderRadius: 3, p: 1 },
                },
            }}
        >
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: '#dc2626', fontWeight: 800 }}>
                <TriangleAlert className="size-6 text-red-600 shrink-0" />
                {titulo}
            </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ color: '#475569', fontSize: '0.95rem' }}>
                    {mensaje}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
                <Button
                    onClick={onCerrar}
                    disabled={procesando}
                    variant="outlined"
                    sx={{ color: '#475569', borderColor: '#cbd5e1' }}
                >
                    Cancelar
                </Button>
                <Button
                    onClick={onConfirmar}
                    disabled={procesando}
                    variant="contained"
                    startIcon={procesando ? <CircularProgress size={16} sx={{ color: '#ffffff' }} /> : undefined}
                    sx={{
                        bgcolor: '#dc2626',
                        color: '#ffffff',
                        '&:hover': { bgcolor: '#b91c1c' },
                        fontWeight: 700,
                    }}
                    autoFocus
                >
                    {procesando ? 'Eliminando...' : 'Sí, Eliminar'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmacionEliminarModal;
