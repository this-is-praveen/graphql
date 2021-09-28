const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

const dummyData = require("../data/data.json");
const bookData = dummyData.books;

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "Loreum Epsum",
  fields: () => ({
    isbn: { type: GraphQLString },
    title: { type: GraphQLString },
    subtitle: { type: GraphQLString },
    author: { type: GraphQLString },
    published: { type: GraphQLString },
    publisher: { type: GraphQLString },
    pages: { type: GraphQLInt },
    description: { type: GraphQLString },
    website: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootType",
  fields: {
    book: {
      type: BookType,
      args: { isbn: { type: GraphQLString } },
      resolve(parent, args) {
        const bookIsbn = args.isbn;
        return bookData.find((data) => data.isbn === bookIsbn);
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery });
