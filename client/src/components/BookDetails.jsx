import React from "react";
const BookDetails = (props) => {
  //   const { loading, error, data } = useQuery(getBookById);
  //   if (loading) return <p>Calling Data...</p>;
  //   if (error) return <p>Error :(</p>;
  const { bookData, bookId } = props;
  const selectedBook = bookData.find((book) => book.id === bookId);
  if (bookId) {
    return (
      <div className="book-details">
        <h1>Selected Book</h1>
        <p>Book : {selectedBook.name}</p>
        <p>ID : {selectedBook.id}</p>
        <p>Genre : {selectedBook.genre}</p>
        <p>
          Author Name : {selectedBook?.author?.name} (
          {selectedBook?.author?.age})
        </p>
        <span>Authors other work</span>
        <ul>
          {selectedBook?.author?.books.map((bookName) => {
            return bookName?.name === selectedBook.name ? (
              <></>
            ) : (
              <li>{bookName?.name}</li>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="no-book">
        <p>No Book Selected</p>
      </div>
    );
  }
};
export default BookDetails;
