import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const DB_CONFIG = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

interface DatabaseInterface {
  insertOne(tableName: string, data: {}): Promise<any>;
  query(sql: string, parameters?: any[]): Promise<any>;
}

export class Database implements DatabaseInterface {
  private static instance: Database;

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async query(sql: string, parameters?: any[]): Promise<any> {
    const client = await mysql.createConnection(DB_CONFIG);

    try {
      const result = await client.query(sql, parameters);
      // return result.rows;
      return result;
    } catch (err) {
      console.error('Database query error:', err);
      throw err;
    } finally {
      client.destroy();
    }
  }

  public async insertOne(tableName: string, data: {}): Promise<any> {
    const client = await mysql.createConnection(DB_CONFIG);

    const fields = Object.keys(data);
    const values = Object.values(data);

    const fieldString = fields.join(', ');

    const placeholders = fields.map(() => '?').join(', ');

    const sql = `INSERT INTO ${tableName} (${fieldString}) VALUES (${placeholders});`;

    try {
      const result = await client.query(sql, values);
      return result;
      // return result.rows[0].id;
    } catch (err) {
      console.error('Database query error:', err);
      throw err;
    } finally {
      client.destroy();
    }
  }
}

const dbInstance = Database.getInstance();
export default dbInstance;
