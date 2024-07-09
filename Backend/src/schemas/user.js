import z from 'zod';

const userSquema = z.object({
    username: z.string().min(2).max(30),
    email: z.string().email(),
    password: z.string().min(5),
    is_admin : z.boolean().optional()
});

export function validateUser(user) {
    return userSquema.safeParse(user);
}

export function validatePartialUser(user) {
    return userSquema.partial().safeParse(user);
}