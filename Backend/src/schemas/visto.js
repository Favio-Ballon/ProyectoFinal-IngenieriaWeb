import z from 'zod';

const vistoSquema = z.object({
    leccion_id: z.number().int().positive(),
    mis_cursos_id: z.number().int().positive(),
    completado: z.boolean()
});

export function validateVisto(visto) {
    return vistoSquema.safeParse(visto);
}

export function validatePartialVisto(visto) {
    return vistoSquema.partial().safeParse(visto);
}
