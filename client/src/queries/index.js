import { gql, useQuery } from "@apollo/client";

const getAllBooks = gql`
  {
    books {
      id
      name
      genre
      author {
        name
        age
        id
        books {
          name
          id
        }
      }
    }
  }
`;
const getAllAuthors = gql`
  {
    authors {
      id
      name
    }
  }
`;

const addAnBook = gql`
  mutation ($name: String!, $genre: String!, $authorId: ID!) {
    addAnBook(name: $name, genre: $genre, authorId: $authorId) {
      name
    }
  }
`;

const getBookById = gql`
  query ($id: ID!) {
    book(id: $id) {
      name
      genre
      author {
        name
        age
        book {
          name
        }
      }
    }
  }
`;
export { getAllBooks, getAllAuthors, addAnBook, getBookById };
