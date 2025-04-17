import React from "react"
import { createRoot } from "react-dom/client"
import { StrictMode } from "react"
import { Provider } from "react-redux"
import { ApolloProvider } from "@apollo/client"
import App from "./components/App"
import { store } from "./redux/store"
import { client } from "./graphql/client"
import "./index.css"

// Create a root
const container = document.getElementById("root")
const root = createRoot(container!)

// Render app to root
root.render(
  <StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </StrictMode>
)
