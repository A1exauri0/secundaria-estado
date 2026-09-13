# Sistema de Control Escolar
## Escuela Secundaria del Estado — Turno Matutino
**Tuxtla Gutiérrez, Chiapas (Fundada en 1944)**

Sistema integral de administración y control escolar desarrollado para la **Escuela Secundaria del Estado (Turno Matutino)**. Desarrollado con **Laravel 12**, **Inertia.js**, **React**, **TypeScript**, **Material UI** y **Tailwind CSS**.

---

### Módulos del Sistema

1. **Alumnos**:
   - Registro de matrícula, CURP, fecha de nacimiento, sexo, dirección, teléfono, correo institucional, grado (1°, 2°, 3°), grupo (A-F) y estatus (Activo, Egresado, Baja temporal, Baja definitiva).
   - Asignación y vinculación con uno o múltiples tutores.
   - Búsqueda en tiempo real y filtrado dinámico.

2. **Maestros y Personal**:
   - Registro de docentes y personal administrativo.
   - CURP, RFC, teléfono, correo institucional, puesto y tipo de personal (Docente, Administrativo, Directivo, Prefectura, Apoyo).
   - Materias asignadas y grupos a cargo.
   - Búsqueda y filtrado por puesto.

3. **Tutores**:
   - Padrón de padres de familia y tutores legales.
   - Nombre, parentesco, teléfono principal, correo de contacto y dirección.
   - Relación N:M con alumnos a su cargo.

4. **Panel de Estadísticas (Dashboard)**:
   - Resumen en tiempo real de alumnos activos, personal docente y tutores registrados.
   - Distribución de matrícula por grado (1°, 2°, 3°) y sexo.
   - Accesos directos a operaciones frecuentes.

---

### Acceso Inicial / Demo

- **URL de Acceso**: `http://secundaria-estado.test/login` o `http://localhost:8000/login`
- **Correo Administrador**: `admin@secundaria.edu.mx`
- **Contraseña**: `password`

---

### Requisitos y Ejecución con Laragon

1. **Servidor Web y Base de Datos**:
   - Iniciar Apache y MySQL en Laragon.
   - Base de datos MySQL: `secundaria-estado` (Puerto estándar `3306`, usuario `root`, sin contraseña).

2. **Migraciones y Datos de Prueba**:
   ```bash
   php artisan migrate:fresh --seed
   ```

3. **Compilación de Assets Frontend**:
   ```bash
   npm run build
   ```
   o en modo desarrollo:
   ```bash
   npm run dev
   ```

4. **Pruebas Automatizadas**:
   ```bash
   php artisan test
   ```
