import z from 'zod';

const misCursosSquema = z.object({
    usuario_id: z.number().int().positive(),
    curso_id: z.number().int().positive()
});

export function validateMisCursos(misCursos) {
    return misCursosSquema.safeParse(misCursos);
}

export function validatePartialMisCursos(misCursos) {
    return misCursosSquema.partial().safeParse(misCursos);
}
