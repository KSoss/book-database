const { Pool } = require('pg');
const pool = require('./dbConn');


pool.query(
  `CREATE TABLE author (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
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


pool.end()