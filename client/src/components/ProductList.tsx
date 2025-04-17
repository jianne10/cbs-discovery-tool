import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLazyQuery } from "@apollo/client"
import { GET_CATEGORY_PRODUCTS, GET_PRODUCT_DETAILS } from "../graphql/queries"

import {
  setProducts,
  setLoading,
  setError,
} from "../redux/slices/productsSlice"
import { RootState } from "../redux/store"
import Loading from "./Loading"

const ProductList: React.FC = () => {
  const dispatch = useDispatch()
  const { selectedSitekey } = useSelector((state: RootState) => state.sitekey)
  const { selectedCategory } = useSelector(
    (state: RootState) => state.categories
  )
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state: RootState) => state.products)

  const [
    getCategoryProducts,
    { loading: categoryProductsLoading, error: categoryProductsError },
  ] = useLazyQuery(GET_CATEGORY_PRODUCTS)

  const [
    getProductDetails,
    { loading: productDetailsLoading, error: productDetailsError },
  ] = useLazyQuery(GET_PRODUCT_DETAILS)

  useEffect(() => {
    const fetchProducts = async () => {
      if (selectedSitekey && selectedCategory) {
        dispatch(setLoading(true))

        try {
          // Step 1: Get product IDs for the selected category
          const categoryProductsResult = await getCategoryProducts({
            variables: {
              sitekey: selectedSitekey,
              category: selectedCategory,
              limit: 100,
            },
          })

          if (!categoryProductsResult.data?.categoryProducts) {
            dispatch(setError("No category product data returned"))
            dispatch(setLoading(false))
            return
          }

          const productIds =
            categoryProductsResult.data.categoryProducts.sortedMetricsProduct.map(
              (product: { productId: string }) => product.productId
            )

          if (productIds.length === 0) {
            dispatch(setProducts([]))
            dispatch(setLoading(false))
            return
          }

          // Step 2: Get detailed information for the product IDs
          const productDetailsResult = await getProductDetails({
            variables: {
              sitekey: selectedSitekey,
              productIds: productIds,
            },
          })

          if (!productDetailsResult.data?.productDetails?.metricsProduct) {
            dispatch(setError("No product details data returned"))
            dispatch(setLoading(false))
            return
          }

          // Process the products to extract and sort by category rank
          const productsWithRank =
            productDetailsResult.data.productDetails.metricsProduct.map(
              (product: any) => {
                const categoryRank =
                  product.metrics?.categoryRanks?.ranks?.find(
                    (rank: any) => rank.category === selectedCategory
                  )

                return {
                  ...product,
                  rank: categoryRank?.itemRank || 999999, // Default high rank if not found
                  level: categoryRank?.level || 0,
                  totalInCategory: categoryRank?.ranksCount || 0,
                }
              }
            )

          // Sort by rank (lowest first)
          const sortedProducts = productsWithRank.sort(
            (a: any, b: any) => a.rank - b.rank
          )

          dispatch(setProducts(sortedProducts))
        } catch (error) {
          console.error("Error fetching products:", error)
          dispatch(
            setError(error instanceof Error ? error.message : String(error))
          )
        } finally {
          dispatch(setLoading(false))
        }
      }
    }

    fetchProducts()
  }, [
    selectedSitekey,
    selectedCategory,
    dispatch,
    getCategoryProducts,
    getProductDetails,
  ])

  const isLoading =
    productsLoading || categoryProductsLoading || productDetailsLoading
  const error = productsError || categoryProductsError || productDetailsError

  if (isLoading) return <Loading />
  if (error) {
    return (
      <p className="text-red-500">
        Error loading products:{" "}
        {typeof error === "string" ? error : error.message}
      </p>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow h-full">
      <h2 className="text-xl font-semibold mb-4">
        Best Sellers for "{selectedCategory}"
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found for this category.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Ordered
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trending
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Brand Rank
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product, index) => (
                <tr key={product.productId}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.rank}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {product.productId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.metrics?.lastOrdered
                      ? new Date(
                          product.metrics.lastOrdered
                        ).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.metrics?.trending ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.metrics?.brandRank || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ProductList
