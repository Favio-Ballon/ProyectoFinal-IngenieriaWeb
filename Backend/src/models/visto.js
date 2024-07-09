import createConnection  from '../connection.js';


const connection = await createConnection();

export class vistoModel{
    static async getByLeccionCurso({ leccion_id, mis_cursos_id }) {
        const vistos = await connection.query('SELECT completado FROM visto WHERE leccion_id = $1 AND mis_cursos_id = $2', [leccion_id, mis_cursos_id]);
        return vistos.rows[0];
    }

    static async create({ leccion_id, mis_cursos_id}) {
        await connection.query('INSERT INTO visto (leccion_id, mis_cursos_id, completado) VALUES ($1, $2, $3)', [leccion_id, mis_cursos_id, false]);
    }

    static async update({ leccion_id, mis_cursos_id}) {
        await connection.query('UPDATE visto SET completado = $1 WHERE leccion_id = $2 AND mis_cursos_id = $3', [true, leccion_id, mis_cursos_id]);
    }

    static async getLeccionesCompletadas({ curso_id, usuario_id }) {
        const lecciones = await connection.query('SELECT * FROM get_completed_lessons( $1 , $2 );', [curso_id, usuario_id]);
        console.log(lecciones.rows);
        return lecciones.rows[0];
    }
    
}