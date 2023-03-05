const { Pool } = require('pg');
const pool = require('./dbConn');


pool.query(
  `CREATE TABLE IF NOT EXISTS author (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
  );`
);

pool.query(
  `CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    genre TEXT NOT NULL,
    author_id INTEGER NOT NULL REFERENCES authors(id)
  );`
);

//promise to potentially handle node errors

process.on('unhandledRejection', error => {
  console.error('Unhandled Promise Rejection:', error);
  process.exit(1);
});