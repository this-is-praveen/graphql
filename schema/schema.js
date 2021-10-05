const graphql = require("graphql");
const Book = require("../model/book");
const Author = require("../model/author");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

// dummy data
// var bookData = [
//   { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
//   { name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "615c3fe66df4b4925bf902f2" },
//   { name: "The Hero of Ages", genre: "Fantasy", id: "4", authorId: "615c3fe66df4b4925bf902f2" },
//   { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "615c3fe66df4b4925bf902f3" },
//   { name: "The Colour of Magic", genre: "Fantasy", id: "5", authorId: "615c3fe66df4b4925bf902f3" },
//   { name: "The Light Fantastic", genre: "Fantasy", id: "6", authorId: "615c3fe66df4b4925bf902f3" },
// ];

// var authorsData = [
//   { name: "Patrick Rothfuss", age: 44, id: "1" },
//   { name: "Brandon Sanderson", age: 42, id: "2" },
//   { name: "Terry Pratchett", age: 66, id: "3" },
// ];

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "Book Data Fields",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: (parent, args) => {
        // parent retrieves the current node
        const authorIdOfBook = parent.authorId;
        // return authorsData.find(
        //   (currentAuthor) => currentAuthor.id === authorIdOfBook
        // );
        return Author.findById(authorIdOfBook);
      },
    },
  }),
});
const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "Author Data Fields",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      // Not BookType Since it retrieves a single Book , Author Books gives list of Books written by the Author
      type: new GraphQLList(BookType),
      resolve: (parent, args) => {
        const authorId = parent.id;
        // return booksData.filter(
        //   (currentBook) => currentBook.authorId === authorId
        // );
        return Book.find({ authorId: authorId });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootType",
  description: "Main Tree Node",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        const bookId = args.id;
        // return booksData.find((currentBook) => currentBook.id === bookId);
        return Book.findById(bookId);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        const authorId = args.id;
        // return authorsData.find(
        //   (currentAuthor) => currentAuthor.id === authorId
        // );
        return Author.find({ id: authorId });
      },
    },
    books: {
      type: new GraphQLList(BookType),
      // resolve: () => booksData,
      resolve: () => Book.find(),
    },
    authors: {
      type: new GraphQLList(AuthorType),
      // resolve: () => authorsData,
      resolve: () => Author.find(),
    },
  },
});

const Mutations = new GraphQLObjectType({
  name: "Mutations_Test",
  fields: {
    addAnAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        const author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
    addAnBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        const book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        const savedBook = book.save();
        return savedBook;
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutations });
