"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Server entry point
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const schema_1 = require("./graphql/schema");
const resolvers_1 = require("./graphql/resolvers");
async function startApolloServer() {
    const app = (0, express_1.default)();
    const httpServer = http_1.default.createServer(app);
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: schema_1.typeDefs,
        resolvers: resolvers_1.resolvers,
        plugins: [(0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
    });
    await server.start();
    server.applyMiddleware({ app });
    const PORT = process.env.PORT || 4000;
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
}
startApolloServer().catch((err) => {
    console.error("Error starting server:", err);
});
