import { Permission } from "./shared/permissions";

// Asignamos unos permisos iniciales para pruebas,
// en un entorno real sería el back quien indicase los permisos del usuario
export const permissions: string[] = [
    Permission.readUsuarios,
    Permission.readRoles,
];