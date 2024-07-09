import z from 'zod';

const categoriaSquema = z.object({
    nombre: z.string().min(3).max(50)
});

export function validateCategoria(categoria) {
    return categoriaSquema.safeParse(categoria);
}

export function validatePartialCategoria(categoria) {
    return categoriaSquema.partial().safeParse(categoria);
}