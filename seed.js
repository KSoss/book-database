const { Pool } = require('pg');
const pool = require('./dbConn');


pool.query('SELECT COUNT(*) FROM author'), (err, data) => {
    console.log("data ", data);
    if (data == 0) {
        pool.query('INSERT INTO book (id, name, genre, author_id) VALUES (DUNE)')
    }
}

pool.query('SELECT COUNT(*) FROM book'), (err, data) => {
    console.log("data ", data);
    if (data == 0) {
        pool.query('INSERT INTO book (id, name, genre, author_id) VALUES (DUNE)')
    }
}