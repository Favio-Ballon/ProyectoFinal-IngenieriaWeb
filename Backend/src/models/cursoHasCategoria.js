import createConnection from '../connection.js';

const connection = await createConnection();

export class cursoHasCategoriaModel {

    static async create({ curso_id, categoria_id }) {
        await connection.query('INSERT INTO curso_has_categoria (curso_id, categoria_id) VALUES ($1, $2)', [curso_id, categoria_id]);
    }

    static async deleteAll({ curso_id }) {
        await connection.query('DELETE FROM curso_has_categoria WHERE curso_id = $1', [curso_id]);
    }

    static async getCursoByCategoria({ categoria_id }) {
        const cursos = await connection.query('SELECT c.* FROM curso c JOIN curso_has_categoria chc ON c.id = chc.curso_id WHERE chc.categoria_id = $1;', [categoria_id]);
        return cursos.rows;
    }

    static async getCategoriaByCurso({ curso_id }) {
        const categorias = await connection.query('SELECT ca.* FROM categoria ca JOIN curso_has_categoria chc ON ca.id = chc.categoria_id WHERE chc.curso_id = $1;', [curso_id]);
        return categorias.rows;
    }


}