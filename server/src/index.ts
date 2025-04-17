// Server entry point
import express from "express"
import { ApolloServer } from "apollo-server-express"
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core"
import http from "http"
import cors from "cors"
import { typeDefs } from "./graphql/schema"
import { resolvers } from "./graphql/resolvers"

async function startApolloServer() {
  const app = express()
  const httpServer = http.createServer(app)

  app.use(cors())
  app.use(express.json())

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()
  server.applyMiddleware({ app })

  const PORT = process.env.PORT || 4000
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  )
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
}

startApolloServer().catch((err) => {
  console.error("Error starting server:", err)
})
