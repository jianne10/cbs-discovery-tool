import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL || "http://localhost:4000/graphql",
})

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})
