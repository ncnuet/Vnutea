import mysql from 'mysql2';
import config from "./env.config";

// create the connection to database
const connection = mysql.createPool({
    port: Number(config.DB_PORT),
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME
})

export default connection.promise();