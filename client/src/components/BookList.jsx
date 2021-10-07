import { useQuery } from "@apollo/client";
import React from "react";
import { getAllBooks } from "../queries";
import BookDetails from "./BookDetails";

const BookList = () => {
  const [selectedBook, setSelectedBook] = React.useState("");
  const { loading, error, data } = useQuery(getAllBooks);
  if (loading) return <p>Calling Data...</p>;
  if (error) return <p>Error :(</p>;
  const bookData = data.books;
  return (
    <div className="book-pane">
      <div className="booklist">
        <h1>Books List</h1>
        <ul>
          {bookData.map((book) => {
            return (
              <li
                key={book.id}
                onClick={() => {
                  setSelectedBook(book.id);
                }}
              >
                {book.name}
              </li>
            );
          })}
        </ul>
      </div>
      <BookDetails bookData={bookData} bookId={selectedBook} />
    </div>
  );
};
export default BookList;
