"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const axios_1 = __importDefault(require("axios"));
const partitions_1 = require("../config/partitions");
exports.resolvers = {
    Query: {
        sitekeys: () => {
            // Return all available sitekeys with their partition info
            const sitekeys = [];
            const { partitions } = require("../config/partitions");
            partitions.forEach((partition) => {
                partition.sitekeys.forEach((sitekey) => {
                    sitekeys.push({
                        name: sitekey,
                        partition: partition.name,
                    });
                });
            });
            return sitekeys;
        },
        categories: async (_, { sitekey, locale, minProductCount = 5 }) => {
            const partition = (0, partitions_1.getSitekeyPartition)(sitekey);
            if (!partition) {
                throw new Error(`Sitekey "${sitekey}" not found in any partition`);
            }
            try {
                const response = await axios_1.default.get(`http://${partition.apiHost}:${partition.port}/api/v1/key/${sitekey}/categories/query?locale=${locale}`);
                console.log(minProductCount);
                return response.data.categories
                    .filter((category) => category.productCount >= minProductCount)
                    .map((category) => ({
                    ...category,
                    id: category.name,
                }));
            }
            catch (error) {
                console.error("Error fetching categories:", error);
                throw new Error("Failed to fetch categories");
            }
        },
        categoryProducts: async (_, { sitekey, category, limit = 100 }) => {
            const partition = (0, partitions_1.getSitekeyPartition)(sitekey);
            if (!partition) {
                throw new Error(`Sitekey "${sitekey}" not found in any partition`);
            }
            // Encode the category for the URL
            const encodedCategory = encodeURIComponent(category);
            try {
                const response = await axios_1.default.get(`http://${partition.apiHostAlt}:${partition.portAlt}/api/v1/key/${sitekey}/orders/metrics/category/${encodedCategory}?limit=${limit}&projection=id`);
                //http://172.31.90.48:9300/api/v1/key/ctshirtscom/orders/metrics/category/Black%20Tie?limit=100&projection=id
                //http://172.31.28.170:9300/api/v1/key/ctshirtscom/orders/metrics/category/%2FBlack%20Tie?limit=100&projection=id
                //http://172.31.28.170:9300/api/v1/key/ctshirtscom/orders/metrics/category/%2FBlack%20Tie?limit=100&projection=id%27
                console.log("1234");
                console.log(response);
                return response.data;
            }
            catch (error) {
                console.error("Error fetching category products:", error);
                throw new Error("Failed to fetch category products");
            }
        },
        productDetails: async (_, { sitekey, productIds }) => {
            const partition = (0, partitions_1.getSitekeyPartition)(sitekey);
            if (!partition) {
                throw new Error(`Sitekey "${sitekey}" not found in any partition`);
            }
            try {
                console.log(`Fetching details for products: ${JSON.stringify(productIds)}`);
                const response = await axios_1.default.post(`http://${partition.apiHostAlt}:${partition.portAlt}/api/v1/key/${sitekey}/orders/metrics/search`, { products: productIds }, { headers: { "Content-Type": "application/json" } });
                console.log("Product details response:", JSON.stringify(response.data, null, 2));
                // Return the data directly, as it already matches our schema
                return response.data;
            }
            catch (error) {
                console.error("Error fetching product details:", error);
                throw new Error("Failed to fetch product details");
            }
        },
    },
};
