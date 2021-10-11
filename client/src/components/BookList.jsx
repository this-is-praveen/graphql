import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { deleteAnBook, getAllBooks } from "../queries";
import BookDetails from "./BookDetails";

const RenderList = (props) => {
  const { setSelectedBook = () => {}, book } = props;
  const [deleteConfirmation, setDeleteConfirmation] = React.useState(false);
  const [deleteAnBookFuntion] = useMutation(deleteAnBook);

  return (
    <li
      key={book.id}
      onClick={() => {
        setSelectedBook(book.id);
      }}
    >
      {deleteConfirmation ? (
        <span
          onClick={(e) => {
            deleteAnBookFuntion({
              variables: {
                id: book.id,
              },
              refetchQueries: [getAllBooks],
            });
            setDeleteConfirmation(false);
          }}
        >
          Wanna Trash 🗑
        </span>
      ) : (
        <>
          {book.name}
          <span
            className="close-icon"
            onClick={() => {
              setDeleteConfirmation(true);
              setTimeout(() => {
                setDeleteConfirmation(false);
              }, 5000);
            }}
          >
            x
          </span>
        </>
      )}
    </li>
  );
};

const BookList = () => {
  const [selectedBook, setSelectedBook] = React.useState("");
  const { loading, error, data } = useQuery(getAllBooks);
  if (loading) return <p>Calling Data...</p>;
  if (error) return <p>Error :(</p>;
  const bookData = data.books;
  return (
    <>
      Prawin
      <div className="book-pane">
        <div className="booklist">
          <h1>Books List</h1>
          <ul>
            {bookData.map((book) => (
              <RenderList setSelectedBook={setSelectedBook} book={book} />
            ))}
          </ul>
        </div>
        <BookDetails bookData={bookData} bookId={selectedBook} />
      </div>
    </>
  );
};
export default BookList;
