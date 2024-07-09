import createConnection  from '../connection.js';


const connection = await createConnection();

export class CategoriaModel {
    static async getAll() {
        const categorias = await connection.query('SELECT * FROM categoria ORDER BY nombre ASC');
        return categorias.rows;
    }

    static async getById({ id }) {
        const categoria = await connection.query('SELECT * FROM categoria WHERE id = $1', [id]);
        return categoria.rows;
    }

    static async create({ categoria }) {
        const { nombre } = categoria;
        await connection.query('INSERT INTO categoria (nombre) VALUES ($1)', [nombre]);
    }

    static async delete({ id }) {
        await connection.query('DELETE FROM categoria WHERE id = $1', [id]);
    }

    static async update({ id, categoria }) {
        const { nombre } = categoria;
        await connection.query('UPDATE categoria SET nombre = $1 WHERE id = $2', [nombre, id]);
    }
}