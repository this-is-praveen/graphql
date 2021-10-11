// import { BookList } from "./components/BookList";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React, { lazy, Suspense } from "react";

function App() {
  const BookList = lazy(() => import("./components/BookList"));
  const AddAuthorOrBook = lazy(() => import("./components/AddAuthorOrBook"));
  const apolloClient = new ApolloClient({
    uri: "http://localhost:4000/test",
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={apolloClient}>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <BookList />
          <AddAuthorOrBook />
        </Suspense>
      </div>
    </ApolloProvider>
  );
}

export default App;
