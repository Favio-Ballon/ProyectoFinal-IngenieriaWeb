import pg from 'pg';
const { Client } = pg;


async function createConnection() {
    const config = {
        host: 'localhost',
        user: 'postgres',
        port: 5432,
        password: 'root',
        database: 'Paragon'
    };
    const connection = new Client(config);
    await connection.connect();
    return connection;
}

export default createConnection;