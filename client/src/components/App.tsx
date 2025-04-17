import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import Header from "./Header"
import SitekeySelector from "./SitekeySelector"
import CategoryList from "./CategoryList"
import ProductList from "./ProductList"

const App: React.FC = () => {
  const { selectedSitekey } = useSelector((state: RootState) => state.sitekey)
  const { selectedCategory } = useSelector(
    (state: RootState) => state.categories
  )
  console.log(selectedSitekey)
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-12">
            <SitekeySelector />
          </div>

          {selectedSitekey && (
            <div className="md:col-span-4">
              <CategoryList />
            </div>
          )}

          {selectedSitekey && selectedCategory && (
            <div className="md:col-span-8">
              <ProductList />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
