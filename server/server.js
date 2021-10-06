const express = require("express");
const app = express();
const mongoose = require("mongoose");

const schema = require("./schema/schema");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGO_DB_CONNECTION);

mongoose.connection.once("open", () => console.log("Connected to DB"));

const { graphqlHTTP } = require("express-graphql");

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/test", graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, (error) => !error && console.log("Node Server Running"));
