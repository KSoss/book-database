

const express = require('express');

const { Pool } = require('pg');
const pool = require('./dbConn');

const app = express();
const port = process.env.PORT || 8000;

// only took 1 hour to realize that this was what would help me to deconstruct my postman requests
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// only took 30 minutes to realize I needed this for front end to reach server. Also NPM instal cors
const cors = require('cors');
app.use(cors());

app.listen(port, function() {
  console.log('Listening on port', port);
});

app.get('/books', (req, res, next) => {
  pool.query('SELECT b.*, a.name AS author FROM book b JOIN author a ON b.author_id = a.id', (err, result) => {
    if (err) {
      return next(err);
    }
    res.json(result.rows);
  });
});

app.get('/books/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);
  if(!Number.isInteger(id)) {
    res.status(404).send("That is not a number silly")
  }
  console.log("book ID: ", id);

  pool.query('SELECT b.*, a.name AS author FROM book b JOIN author a ON b.author_id = a.id WHERE b.id = $1', [id], (err, result) => {
    if (err) {
      return next(err);
    }

  const book = result.rows[0];

  console.log("Single book ID ", id, "values", book)

  if (book) {
    console.log('Book retrieved')
    return res.send(book);
  } else {
    return res.status(404).send("We dont have that ID")
  }

  })
})

app.use((err, req, res, next) => {
  console.log('Error:', err);
  res.sendStatus(404);
});




// Lord forgive me for what I must do

app.post('/books', (req, res, next) => {
  console.log(req.body)
  const {title, genre, author} = req.body;
  console.log("Request body title, genre, author", title, genre, author);

  // Check if request data is valid
  if (title && genre && author) {
    // Check if author already exists in the database
    pool.query('SELECT id FROM author WHERE name = $1', [author], (err, result) => {
      if (err) {
        return next(err);
      }
      if (result.rows.length === 0) {
        // Author does not exist, so insert new author record
        pool.query('INSERT INTO author (name) VALUES ($1) RETURNING id', [author], (err, result) => {
          if (err) {
            return next(err);
          }
          // Insert new book record with new author id
          const authorId = result.rows[0].id;
          pool.query('INSERT INTO book (name, genre, author_id) VALUES ($1, $2, $3)', [title, genre, authorId], (err, result) => {
            if (err) {
              return next(err);
            }
            // Book record successfully inserted
            res.status(201).json({ message: 'Book record inserted.' });
          });
        });
      } else {
        // Author exists, so insert new book record with existing author id
        const authorId = result.rows[0].id;
        pool.query('INSERT INTO book (name, genre, author_id) VALUES ($1, $2, $3)', [title, genre, authorId], (err, result) => {
          if (err) {
            return next(err);
          }
          // Book record successfully inserted
          res.status(201).json({ message: 'Book recorded :)' });
        });
      }
    });
  } else {
    // Invalid request data
    res.status(400).json({ message: 'Invalid request data.' });
  }
});

// DELETE to /books/:id - Delete a book
app.delete("/books/:id", (req, res, next) => {
  const id = Number.parseInt(req.params.id);
  if (!Number.isInteger(id)){
    return res.status(400).send("No book found with that ID");
  }

pool.query('DELETE FROM book WHERE id = $1 RETURNING *', [id], (err, data) => {
    if (err){
      return next(err);
    }
    
    const deletedBook = data.rows[0];
    console.log(deletedBook);
    if (deletedBook){
      // respond with deleted row
      res.send(deletedBook);
    } else {
      res.status(404).send("No book found with that ID");
    }
  });


});



module.exports = app;