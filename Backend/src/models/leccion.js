import createConnection  from '../connection.js';


const connection = await createConnection();

export class leccionModel{
    static async getByCurso({ curso_id }) {
        const lecciones = await connection.query('SELECT * FROM leccion WHERE curso_id = $1 ORDER BY posicion', [curso_id]);
        return lecciones.rows;
    }

    static async create({ leccion }) {
        const {curso_id, titulo, contenido, tipo} = leccion;
        await connection.query('INSERT INTO leccion (curso_id, titulo, contenido, tipo) VALUES ($1, $2, $3, $4)', [curso_id, titulo, contenido, tipo]);
    }

    static async delete({ id }) {
        await connection.query('DELETE FROM leccion WHERE id = $1', [id]);
    }

    static async update({ id, leccion }) {
        const {titulo , contenido, tipo} = leccion;
        await connection.query('UPDATE leccion SET titulo = $1, contenido = $2, tipo = $3 WHERE id = $4', [titulo, contenido, tipo, id]);
    }

    static async getById({ id }) {
        const leccion = await connection.query('SELECT * FROM leccion WHERE id = $1', [id]);
        return leccion.rows;
    }

    static async moveDown({id}){
        await connection.query('SELECT swap_with_next_lesson($1)', [id])
    }

    static async moveUp({id}){
        await connection.query('SELECT swap_with_past_lesson($1)', [id])
    }
}