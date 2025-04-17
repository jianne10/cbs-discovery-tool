import axios from "axios"
import { getSitekeyPartition } from "../config/partitions"

export const resolvers = {
  Query: {
    sitekeys: () => {
      // Return all available sitekeys with their partition info
      const sitekeys: any = []
      const { partitions } = require("../config/partitions")

      partitions.forEach((partition: any) => {
        partition.sitekeys.forEach((sitekey: any) => {
          sitekeys.push({
            name: sitekey,
            partition: partition.name,
          })
        })
      })

      return sitekeys
    },

    categories: async (
      _: any,
      { sitekey, locale, minProductCount = 5 }: any
    ) => {
      const partition = getSitekeyPartition(sitekey)
      if (!partition) {
        throw new Error(`Sitekey "${sitekey}" not found in any partition`)
      }

      try {
        const response = await axios.get(
          `http://${partition.apiHost}:${partition.port}/api/v1/key/${sitekey}/categories/query?locale=${locale}`
        )

        console.log(minProductCount)
        return response.data.categories
          .filter((category: any) => category.productCount >= minProductCount)
          .map((category: any) => ({
            ...category,
            id: category.name,
          }))
      } catch (error) {
        console.error("Error fetching categories:", error)
        throw new Error("Failed to fetch categories")
      }
    },

    categoryProducts: async (
      _: any,
      { sitekey, category, limit = 100 }: any
    ) => {
      const partition = getSitekeyPartition(sitekey)
      if (!partition) {
        throw new Error(`Sitekey "${sitekey}" not found in any partition`)
      }

      // Encode the category for the URL
      const encodedCategory = encodeURIComponent(category)

      try {
        const response = await axios.get(
          `http://${partition.apiHostAlt}:${partition.portAlt}/api/v1/key/${sitekey}/orders/metrics/category/${encodedCategory}?limit=${limit}&projection=id`
        )

        //http://172.31.90.48:9300/api/v1/key/ctshirtscom/orders/metrics/category/Black%20Tie?limit=100&projection=id
        //http://172.31.28.170:9300/api/v1/key/ctshirtscom/orders/metrics/category/%2FBlack%20Tie?limit=100&projection=id
        //http://172.31.28.170:9300/api/v1/key/ctshirtscom/orders/metrics/category/%2FBlack%20Tie?limit=100&projection=id%27

        console.log("1234")
        console.log(response)

        return response.data
      } catch (error) {
        console.error("Error fetching category products:", error)
        throw new Error("Failed to fetch category products")
      }
    },

    productDetails: async (_: any, { sitekey, productIds }: any) => {
      const partition = getSitekeyPartition(sitekey)
      if (!partition) {
        throw new Error(`Sitekey "${sitekey}" not found in any partition`)
      }

      try {
        console.log(
          `Fetching details for products: ${JSON.stringify(productIds)}`
        )

        const response = await axios.post(
          `http://${partition.apiHostAlt}:${partition.portAlt}/api/v1/key/${sitekey}/orders/metrics/search`,
          { products: productIds },
          { headers: { "Content-Type": "application/json" } }
        )

        console.log(
          "Product details response:",
          JSON.stringify(response.data, null, 2)
        )

        // Return the data directly, as it already matches our schema
        return response.data
      } catch (error) {
        console.error("Error fetching product details:", error)
        throw new Error("Failed to fetch product details")
      }
    },
  },
}
