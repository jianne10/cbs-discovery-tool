import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useQuery } from "@apollo/client"
import { GET_CATEGORIES } from "../graphql/queries"
import {
  setCategories,
  setSelectedCategory,
  setMinProductCount,
} from "../redux/slices/categoriesSlice"
import { RootState } from "../redux/store"
import Loading from "./Loading"

const CategoryList: React.FC = () => {
  console.log("CategoryList!!!!")
  const dispatch = useDispatch()
  const { selectedSitekey, locale } = useSelector(
    (state: RootState) => state.sitekey
  )
  const { categories, selectedCategory, minProductCount } = useSelector(
    (state: RootState) => state.categories
  )

  const [localMinProductCount, setLocalMinProductCount] =
    useState(minProductCount)

  const { loading, error, data, refetch } = useQuery(GET_CATEGORIES, {
    variables: {
      sitekey: selectedSitekey,
      locale: locale,
      minProductCount: minProductCount,
    },
    skip: !selectedSitekey,
  })

  useEffect(() => {
    if (selectedSitekey) {
      refetch({
        sitekey: selectedSitekey,
        locale: locale,
        minProductCount: minProductCount,
      })
    }
  }, [selectedSitekey, locale, minProductCount, refetch])

  useEffect(() => {
    if (data?.categories) {
      dispatch(setCategories(data.categories))
    }
  }, [data, dispatch])

  const handleCategoryClick = (categoryName: string) => {
    dispatch(setSelectedCategory(categoryName))
  }

  const handleMinProductCountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLocalMinProductCount(parseInt(e.target.value) || 0)
  }

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(setMinProductCount(localMinProductCount))
  }

  console.log(error)
  console.log("31231312")
  console.log(data)
  if (loading) return <Loading />
  if (error)
    return (
      <p className="text-red-500">Error loading categories: {error.message}</p>
    )

  return (
    <div className="bg-white p-6 rounded-lg shadow h-full">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>

      <form onSubmit={handleFilterSubmit} className="mb-4">
        <div className="flex items-end space-x-2">
          <div className="flex-grow">
            <label
              htmlFor="minProductCount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Min Product Count
            </label>
            <input
              id="minProductCount"
              type="number"
              min="0"
              value={localMinProductCount}
              onChange={handleMinProductCountChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Filter
          </button>
        </div>
      </form>

      {categories.length === 0 ? (
        <p className="text-gray-500">
          No categories found matching your criteria.
        </p>
      ) : (
        <div className="overflow-y-auto max-h-96">
          <ul className="divide-y divide-gray-200">
            {categories.map((category) => (
              <li
                key={category.id}
                className={`py-2 px-3 cursor-pointer hover:bg-gray-50 ${
                  selectedCategory === category.name
                    ? "bg-blue-50 border-l-4 border-blue-500 pl-2"
                    : ""
                }`}
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className="font-medium">{category.name}</div>
                <div className="text-sm text-gray-500">
                  Products: {category.productCount}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default CategoryList
