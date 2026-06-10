import sql from 'mssql';

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
}

export async function connectDB() {
  try {
    const pool = await new sql.ConnectionPool(config).connect()
    return pool;
  } catch(err) {
    throw err; 
  }
}