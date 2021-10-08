import { gql, useQuery } from "@apollo/client";

export const getAllBooks = gql`
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
export const getAllAuthors = gql`
  {
    authors {
      id
      name
    }
  }
`;

export const addAnBook = gql`
  mutation ($name: String!, $genre: String!, $authorId: ID!) {
    addAnBook(name: $name, genre: $genre, authorId: $authorId) {
      name
    }
  }
`;
export const deleteAnBook = gql`
  mutation ($id: ID!) {
    deleteAnBook(id: $id) {
      id
    }
  }
`;

export const getBookById = gql`
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
