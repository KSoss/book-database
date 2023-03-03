const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'bookshop',
    password: 'password',
    port: 6432,
});

pool.query(
    `CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    genre TEXT NOT NULL,
    author_id INTEGER NOT NULL REFERENCES authors(id)
  );`
)

pool.query(
    `CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    genre TEXT NOT NULL,
    author_id INTEGER NOT NULL REFERENCES authors(id)
  );`
)
