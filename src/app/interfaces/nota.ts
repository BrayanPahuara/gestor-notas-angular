export interface Nota {
    id?: string;
    estudianteId: string;
    estudianteNombre?: string;
    materia: string;
    calificacion: number;
    tipo: TipoEvaluacion;
    periodo: string;
    fecha: any;
    observaciones?: string;
    usuarioId: string;
}
export enum TipoEvaluacion{
    EXAMEN = 'Examen',
    PRACTICA = 'Práctica',
    TAREA = 'Tarea',
    EXPOSICION = 'Exposición',
    PROYECTO = 'Proyecto',
    PARTICIPACION = 'Participación'
}

export const MATERIAS: string[] = [
    'Matemáticas', 'Comunicación', 'Ciencias Naturales', 'Ciencias Sociales', 'Historia', 'Inglés', 'Edicación física',
    'Arte', 'Computación'
];

export const PERIODOS: string[] = [
    '1er Bimestre', '2do Bimestre', '3er Bimestre', '4to Bimestre'
]