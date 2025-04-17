import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Category } from "../../types"

interface CategoriesState {
  categories: Category[]
  selectedCategory: string | null
  minProductCount: number
  loading: boolean
  error: string | null
}

const initialState: CategoriesState = {
  categories: [],
  selectedCategory: null,
  minProductCount: 0,
  loading: false,
  error: null,
}

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload
    },
    setSelectedCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload
    },
    setMinProductCount(state, action: PayloadAction<number>) {
      state.minProductCount = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
  },
})

export const {
  setCategories,
  setSelectedCategory,
  setMinProductCount,
  setLoading,
  setError,
} = categoriesSlice.actions

export default categoriesSlice.reducer
