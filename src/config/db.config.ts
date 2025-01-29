export const dbConfig = () => ({
    database: {
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        dbName: process.env.DB_NAME
    }
})

export default dbConfig;