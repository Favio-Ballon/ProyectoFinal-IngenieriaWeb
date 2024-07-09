import createConnection  from '../connection.js';

const connection = await createConnection();

export class misCursosModel{
    static async getByUsuario({ usuario_id }) {
        const cursos = await connection.query('SELECT * FROM curso WHERE id IN (SELECT curso_id FROM mis_cursos WHERE usuario_id = $1) ORDER BY titulo', [usuario_id]);
        return cursos.rows;
    }


    static async getByCurso({ curso_id, usuario_id }) {
        const usuarios = await connection.query('SELECT true WHERE $1 IN (SELECT usuario_id FROM mis_cursos WHERE curso_id = $2)', [usuario_id,curso_id]);
        return usuarios.rows;
    }

    static async getIdByCursoUsuario({ curso_id, usuario_id }) {
        const id = await connection.query('SELECT id FROM mis_cursos WHERE curso_id = $1 AND usuario_id = $2', [curso_id, usuario_id]);
        return id.rows[0];
    }
    

    static async create({ usuario_id, curso_id }) {
        await connection.query('INSERT INTO mis_cursos (usuario_id, curso_id) VALUES ($1, $2)', [usuario_id, curso_id]);
    }

    static async delete({ usuario_id, curso_id }) {
        await connection.query('DELETE FROM mis_cursos WHERE usuario_id = $1 AND curso_id = $2', [usuario_id, curso_id]);
    }
}