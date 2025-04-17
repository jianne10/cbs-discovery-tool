"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `
  type Sitekey {
    name: String!
    partition: String!
  }

  type Category {
    id: String!
    name: String!
    productCount: Int!
  }

  type Product {
    productId: String!
    rank: Int
    metrics: ProductMetrics
  }

  type ProductMetrics {
    revenue: Float
    units: Int
  }

  type CategoryProducts {
    category: String!
    sortedMetricsProduct: [Product!]!
  }

  type Query {
    sitekeys: [Sitekey!]!
    categories(
      sitekey: String!
      locale: String!
      minProductCount: Int
    ): [Category!]!
    categoryProducts(
      sitekey: String!
      category: String!
      limit: Int
    ): CategoryProducts!
    productDetails(sitekey: String!, productIds: [String!]!): [Product!]!
  }
`;
