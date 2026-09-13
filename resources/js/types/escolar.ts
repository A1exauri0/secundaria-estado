// ==========================================
// Tipos e Interfaces para el Sistema Escolar
// ==========================================

// Interfaz para la información de un Tutor
export interface Tutor {
    id: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno?: string | null;
    nombre_completo?: string;
    parentesco_predeterminado: string;
    telefono: string;
    telefono_secundario?: string | null;
    correo?: string | null;
    direccion?: string | null;
    ocupacion?: string | null;
    alumnos?: Alumno[];
    created_at?: string;
    updated_at?: string;
    pivot?: {
        parentesco?: string;
        es_contacto_principal?: boolean | number;
    };
}

// Interfaz para la información de un Alumno
export interface Alumno {
    id: number;
    matricula: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno?: string | null;
    nombre_completo?: string;
    curp: string;
    fecha_nacimiento: string;
    sexo: 'M' | 'F' | 'Otro';
    direccion: string;
    telefono?: string | null;
    correo_institucional?: string | null;
    grado: string; // '1°' | '2°' | '3°'
    grupo: string; // 'A' | 'B' | 'C' ...
    estatus: 'activo' | 'egresado' | 'baja' | 'suspendido';
    tutores?: Tutor[];
    created_at?: string;
    updated_at?: string;
}

// Interfaz para la información de un Maestro / Personal
export interface Maestro {
    id: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno?: string | null;
    nombre_completo?: string;
    curp: string;
    rfc?: string | null;
    telefono?: string | null;
    correo: string;
    puesto: string;
    tipo_personal: 'docente' | 'administrativo' | 'directivo' | 'apoyo';
    materias?: string[] | null;
    grupos?: string[] | null;
    estatus: 'activo' | 'inactivo' | 'licencia';
    created_at?: string;
    updated_at?: string;
}

// Interfaz para la información de un Usuario del Sistema
export interface Usuario {
    id: number;
    name: string;
    email: string;
    rol: 'admin' | 'directivo' | 'control_escolar' | 'docente' | 'consulta';
    telefono?: string | null;
    estatus: 'activo' | 'inactivo';
    avatar?: string | null;
    created_at?: string;
    updated_at?: string;
}

// Interfaz genérica para paginación de Laravel
export interface PaginacionLinks {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginacionData<T> {
    data: T[];
    current_page: number;
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: PaginacionLinks[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}
