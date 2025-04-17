import { gql } from "apollo-server-express"

export const typeDefs = gql`
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
    metrics: ProductMetrics
  }

  type CategoryRank {
    category: String!
    level: Int!
    itemRank: Int!
    ranksCount: Int!
  }

  type CategoryRanks {
    ranks: [CategoryRank!]!
  }

  type ProductMetrics {
    lastOrdered: String
    trending: Boolean
    sellingRank: Int
    categoryRanks: CategoryRanks
    brandRank: Int
    revenue: Float
    units: Int
  }
  type ProductSearchResponse {
    metricsProduct: [Product!]!
    streamResultsProducts: [Product!]!
    streamResultsTags: [String!]!
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
    productDetails(
      sitekey: String!
      productIds: [String!]!
    ): ProductSearchResponse!
  }
`
