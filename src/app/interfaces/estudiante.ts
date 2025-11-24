export interface Estudiante {
    id?: string;
    nombre: string;
    codigo: string;
    correo: string;
    grado: string;
    usuarioId: string;
    fechaCreacion: any;
    activo: boolean;
}

export const GRADOS: string[] = [
    '1er',
    '2do',
    '3er',
    '4to',
    '5to',
    '6to'
]
