import createConnection from '../connection.js';


const connection = await createConnection();

export class cursoModel {
    static async getAll() {
        const cursos = await connection.query('SELECT * FROM curso ORDER BY titulo');
        return cursos.rows;
    }

    static async getById({ id }) {
        const curso = await connection.query('SELECT * FROM curso WHERE id = $1', [id]);
        return curso.rows;
    }

    static async getByName({ titulo }) {
        //convert titulo to lowercase
        titulo = titulo.toLowerCase();
        //search for the title in the database in lower case with like %%
        const curso = await connection.query('SELECT * FROM curso WHERE lower(titulo) like $1 ORDER BY titulo', ['%' + titulo + '%'] );
        return curso.rows;
    }


    static async create({ curso }) {
        console.log("----------------------", curso)
        const { titulo, descripcion, autor, admin_id, imagen_path } = curso;
        await connection.query('INSERT INTO curso (titulo, descripcion, autor, admin_id, imagen_path) VALUES ($1, $2, $3, $4, $5)', [titulo, descripcion, autor, admin_id, imagen_path]);
    }

    static async delete({ id }) {
        await connection.query('DELETE FROM curso WHERE id = $1', [id]);
    }

    static async update({ id, curso }) {
        const { titulo, descripcion, autor, imagen_path } = curso;
        if (!imagen_path) {
            await connection.query('UPDATE curso SET titulo = $1, descripcion = $2, autor = $3 WHERE id = $4', [titulo, descripcion, autor, id]);
        } else {
            await connection.query('UPDATE curso SET titulo = $1, descripcion = $2, autor = $3, imagen_path= $4 WHERE id = $5', [titulo, descripcion, autor, imagen_path, id]);
        }
    }
}