$(document).ready(function() {
    // display existing books on page load
    getAllBooks();
  
    // handle form submission to add new book
    $('#add-book-form').submit(function(event) {
      event.preventDefault();
      const title = $('#title-input').val();
      const genre = $('#genre-input').val();
      const author = $('#author-input').val();
      // check that all fields are filled in
      if (title && genre && author) {
        addNewBook(title, genre, author);
      } else {
        alert('Please fill in all fields');
      }
    });
  });
  
  function getAllBooks() {
    $.get('http://localhost:8000/books', function(data) {
      // display the data on the page
      $('#book-list').html('');
      $.each(data, function(index, book) {
        $('#book-list').append(`<li>${book.title} by ${book.author_name} (${book.genre})</li>`);
      });
    }).fail(function(xhr, status, error) {
      console.log(error);
    });
  }
  
  function addNewBook(title, genre, author) {
    $.post({
      url: 'http://localhost:8000/books',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({ title: title, genre: genre, author: author }),
      success: function(data) {
        console.log(data);
        alert('Book added!');
        // refresh the book list
        getAllBooks();
        // clear the input fields
        $('#title-input').val('');
        $('#genre-input').val('');
        $('#author-input').val('');
      },
      error: function(xhr, status, error) {
        console.log(error);
      }
    });
  }