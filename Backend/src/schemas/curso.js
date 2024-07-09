import z from 'zod';

const cursoSquema = z.object({
    titulo: z.string().min(5).max(50),
    descripcion: z.string().min(10).max(255),
    autor: z.string().min(3).max(50),
    admin_id : z.number().int().positive(),
    imagen_path: z.string().min(5).max(255)
});

export function validateCurso(curso) {
    return cursoSquema.safeParse(curso);
}

export function validatePartialCurso(curso) {
    return cursoSquema.partial().safeParse(curso);
}