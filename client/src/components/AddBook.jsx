import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { addAnBook, getAllAuthors, getAllBooks } from "../queries";
const AddBook = () => {
  const [formData, setFormData] = React.useState({
    bookName: "",
    genre: "",
    authorId: "",
  });

  const { loading, error, data } = useQuery(getAllAuthors);
  const [addAnBookFuntion, addAnBookProps] = useMutation(addAnBook);

  if (error) return <p>Error :(</p>;
  const authorData = data?.authors;
  console.log("addAnBookProps ", addAnBookProps);
  return (
    <div className="add-book-zone">
      <h2>Add a Book</h2>
      <form
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
            placeholder="Book name"
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
            required
          />
          <span className="focus-border" />
        </div>

        <div className="field">
          {/* <label>Author:</label> */}
          <select
            onChange={(e) =>
              setFormData({ ...formData, authorId: e.target.value })
            }
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
    </div>
  );
};
export default AddBook;
