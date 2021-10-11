import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { addAnBook, addAnAuthor, getAllAuthors, getAllBooks } from "../queries";
const AddAuthorOrBook = () => {
  const [formData, setFormData] = React.useState({
    bookName: "",
    genre: "",
    authorId: "",
    authorName: 0,
    authorAge: "",
  });

  const bookFormRef = React.useRef(null);
  const authorFormRef = React.useRef(null);

  const { loading, error, data } = useQuery(getAllAuthors);
  const [addAnBookFuntion, addAnBookProps] = useMutation(addAnBook);
  const [addAnAuthorFuntion, addAnAuthorProps] = useMutation(addAnAuthor);
  const [isBookPane, setIsBookPane] = useState(true);
  if (error) return <p>Error :(</p>;
  const authorData = data?.authors;
  if (isBookPane) {
    return (
      <div className="add-book-zone">
        <h2>Add a Book</h2>
        <form
          ref={bookFormRef}
          className="add-book-form"
          onSubmit={(event) => {
            event.preventDefault();
            addAnBookFuntion({
              variables: {
                name: formData.bookName,
                genre: formData.genre,
                authorId: formData.authorId,
              },
              refetchQueries: [getAllBooks],
            });
          }}
        >
          <div className="field" x>
            {/* <label>Book name:</label> */}
            <input
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, bookName: e.target.value })
              }
              name="bookName"
              placeholder="Book name"
              value={formData.bookName}
              required
            />
            <span className="focus-border" />
          </div>

          <div className="field">
            {/* <label>Genre:</label> */}
            <input
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, genre: e.target.value })
              }
              placeholder="Genre"
              name="genre"
              value={formData.genre}
              required
            />
            <span className="focus-border" />
          </div>

          <div className="field">
            {/* <label>Author:</label> */}
            <select
              onChange={(e) => {
                setFormData({ ...formData, authorId: e.target.value });
              }}
              name="authorId"
              required
            >
              <option value="">Select Author</option>
              {loading ? (
                <option disabled>Loading...</option>
              ) : (
                authorData.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))
              )}
            </select>
            <span className="focus-border" />
          </div>
          <button type="submit">
            <span>+</span>
          </button>
        </form>
        <div
          className="toggle-section"
          onClick={() => {
            bookFormRef.current?.reset();
            setFormData({});
            setIsBookPane(false);
          }}
        >
          or Add an Author
        </div>
      </div>
    );
  } else {
    return (
      <div className="add-book-zone">
        <h2>Add an Author</h2>
        <form
          ref={authorFormRef}
          className="add-book-form"
          onSubmit={(event) => {
            event.preventDefault();
            addAnAuthorFuntion({
              variables: {
                name: formData.authorName,
                age: Number(formData.authorAge),
              },
              refetchQueries: [getAllAuthors],
            });
          }}
        >
          <div className="field" x>
            <input
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, authorName: e.target.value })
              }
              name="authorName"
              value={formData.authorName}
              placeholder="Author Name"
              required
            />
            <span className="focus-border" />
          </div>

          <div className="field">
            {/* <label>Genre:</label> */}
            <input
              type="number"
              min="10"
              max="100"
              name="age"
              onChange={(e) =>
                setFormData({ ...formData, authorAge: e.target.value })
              }
              placeholder="Age"
              value={formData.authorAge}
              required
            />
            <span className="focus-border" />
          </div>

          <button type="submit">
            <span>+</span>
          </button>
        </form>
        <div
          className="toggle-section"
          onClick={() => {
            authorFormRef.current?.reset();
            setFormData({});
            setIsBookPane(true);
          }}
        >
          or Add a Book
        </div>
      </div>
    );
  }
};
export default AddAuthorOrBook;
