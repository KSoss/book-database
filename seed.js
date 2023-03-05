const { Pool } = require('pg');
const pool = require('./dbConn');


// Check if there are any authors in the database
pool.query('SELECT COUNT(*) FROM author', (err, result) => {
    if (err) {
      console.log('Error checking author count:', err);
      return;
    }
    const count = parseInt(result.rows[0].count);
    if (count === 0) {
      // Insert the authors into the database
      pool.query(
        `INSERT INTO author (name) VALUES 
        ('Frank Herbert'), 
        ('H. P. Lovecraft'), 
        ('George Orwell'), 
        ('John Steinbeck')`,
        (err, result) => {
          if (err) {
            console.log('Error inserting authors:', err);
          } else {
            console.log('Authors inserted successfully');
          }
        }
      );
    }
  });
  
  // Insert books into the database
  pool.query('SELECT COUNT(*) FROM books', (err, result) => {
    if (err) {
      console.log('Error checking book count:', err);
      return;
    }
    const count = parseInt(result.rows[0].count);
    if (count === 0) {
      // Get the author ids from the database
      pool.query('SELECT id, name FROM author', (err, result) => {
        if (err) {
          console.log('Error getting authors:', err);
          return;
        }
        const authors = result.rows;
        // Insert the books into the database with their respective author ids
        pool.query(
          `INSERT INTO books (name, genre, author_id) VALUES 
          ('Dune', 'Science Fiction', ${authors[0].id}),
          ('Dune Messiah', 'Science Fiction', ${authors[0].id}),
          ('Children of Dune', 'Science Fiction', ${authors[0].id}),
          ('The Call of Cthulhu', 'Horror Fiction', ${authors[1].id}),
          ('Of Mice and Men', 'Fiction', ${authors[3].id})`,
          (err, result) => {
            if (err) {
              console.log('Error inserting books:', err);
            } else {
              console.log('Books inserted successfully');
            }
          }
        );
      });
    }
  });


pool.end()