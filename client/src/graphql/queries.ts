import { gql } from "@apollo/client"

export const GET_SITEKEYS = gql`
  query GetSitekeys {
    sitekeys {
      name
      partition
    }
  }
`

export const GET_CATEGORIES = gql`
  query GetCategories(
    $sitekey: String!
    $locale: String!
    $minProductCount: Int
  ) {
    categories(
      sitekey: $sitekey
      locale: $locale
      minProductCount: $minProductCount
    ) {
      id
      name
      productCount
    }
  }
`

export const GET_CATEGORY_PRODUCTS = gql`
  query GetCategoryProducts(
    $sitekey: String!
    $category: String!
    $limit: Int
  ) {
    categoryProducts(sitekey: $sitekey, category: $category, limit: $limit) {
      category
      sortedMetricsProduct {
        productId
      }
    }
  }
`

export const GET_PRODUCT_DETAILS = gql`
  query GetProductDetails($sitekey: String!, $productIds: [String!]!) {
    productDetails(sitekey: $sitekey, productIds: $productIds) {
      metricsProduct {
        productId
        metrics {
          lastOrdered
          trending
          sellingRank
          categoryRanks {
            ranks {
              category
              level
              itemRank
              ranksCount
            }
          }
          brandRank
        }
      }
    }
  }
`
