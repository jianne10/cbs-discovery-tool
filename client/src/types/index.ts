export interface Sitekey {
  name: string
  partition: string
}

export interface Category {
  id: string
  name: string
  productCount: number
}
export interface CategoryRank {
  category: string
  level: number
  itemRank: number
  ranksCount: number
}

export interface CategoryRanks {
  ranks: CategoryRank[]
}

export interface ProductMetrics {
  // Keep the existing properties
  revenue?: number
  units?: number

  // Add the new properties from your API
  lastOrdered?: string
  trending?: boolean
  sellingRank?: number
  categoryRanks?: CategoryRanks
  brandRank?: number
}

export interface Product {
  productId: string
  metrics?: ProductMetrics
  rank?: number // Added for sorting
  level?: number // Added from category ranks
  totalInCategory?: number // Added from ranksCount
}

export interface CategoryProducts {
  category: string
  sortedMetricsProduct: Product[]
}
