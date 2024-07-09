import z from 'zod';

const leccionSquema = z.object({
    titulo: z.string().min(5).max(100),
    contenido: z.string(),
    curso_id: z.number().int().positive(),
    tipo: z.boolean()
});

export function validateLeccion(leccion) {
    return leccionSquema.safeParse(leccion);
}

export function validatePartialLeccion(leccion) {
    return leccionSquema.partial().safeParse(leccion);
}