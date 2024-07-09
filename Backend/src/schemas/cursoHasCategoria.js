import z from 'zod';

const cursoHasCategoriaSquema = z.object({
    curso_id: z.number().int().positive(),
    categoria_id: z.number().int().positive()
});

export function validateCursoHasCategoria(cursoHasCategoria) {
    return cursoHasCategoriaSquema.safeParse(cursoHasCategoria);
}