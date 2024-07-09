import createConnection  from '../connection.js';


const connection = await createConnection();


export class UserModel {
    static async getAll() {
        const users = await connection.query('SELECT * FROM usuario');
        return users.rows;
    }

    static async getByName({ username }) {
        const user = await connection.query('SELECT true FROM usuario WHERE username = $1', [username]);
        return user.rows;
    }

    static async getByEmail({ email }) {
        const user = await connection.query('SELECT true FROM usuario WHERE email = $1', [email]);
        return user.rows;
    }

    static async getById({ id }) {
        const user = await connection.query('SELECT * FROM usuario WHERE id = $1', [id]);
        return user.rows;
    }

    static async create({ user }) {
        const { username, email, password, is_admin } = user;
        if (is_admin === undefined) {
            await connection.query('INSERT INTO usuario (username, email, password) VALUES ($1, $2, $3)', [username, email, password]);
        } else {
            await connection.query('INSERT INTO usuario (username, email, password, is_admin) VALUES ($1, $2, $3, $4)', [username, email, password, is_admin]);
        }
    }

    static async delete({ id }) {
        await connection.query('DELETE FROM usuario WHERE id = $1', [id]);
    }

    static async update({ id, user }) {
        const { username, email, password } = user;
        await connection.query('UPDATE usuario SET username = $1, email = $2, password = $3 WHERE id = $4', [username, email, password, id]);
    }

    static async login({ username, password }) {
        const user = await connection.query('SELECT id, username, email, is_admin FROM usuario WHERE username = $1 AND password = $2', [username, password]);
        if (user.rows.length === 0) {
            return null;
        }
        return user.rows;
    }

}



