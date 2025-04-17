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
        categories: async (_, { sitekey, locale, minProductCount = 0 }) => {
            const partition = (0, partitions_1.getSitekeyPartition)(sitekey);
            if (!partition) {
                throw new Error(`Sitekey "${sitekey}" not found in any partition`);
            }
            try {
                const response = await axios_1.default.get(`http://${partition.apiHost}:${partition.port}/api/v1/key/${sitekey}/categories/query?locale=${locale}`);
                // console.table(response.data.categories)
                // Filter categories based on minProductCount
                // console.log(JSON.stringify(response.data, null, 2))
                return response.data.categories.filter((category) => category.productCount >= minProductCount);
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
                const response = await axios_1.default.get(`http://${partition.apiHost}:${partition.port}/api/v1/key/${sitekey}/orders/metrics/category/${encodedCategory}?limit=${limit}&projection=id`);
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
                const response = await axios_1.default.post(`http://${partition.apiHost}:${partition.port}/api/v1/key/${sitekey}/orders/metrics/search`, { products: productIds }, { headers: { "Content-Type": "application/json" } });
                return response.data;
            }
            catch (error) {
                console.error("Error fetching product details:", error);
                throw new Error("Failed to fetch product details");
            }
        },
    },
};
