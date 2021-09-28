const express = require("express");
const app = express();

const templateSchema = require("./schema/schema");

const { graphqlHTTP } = require("express-graphql");
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/test", graphqlHTTP({ schema: templateSchema, graphiql: true }));

app.listen(4000, (error) => !error && console.log("Node Server Running"));
