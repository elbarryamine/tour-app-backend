export type TourInterface = {
  id: string
  name: string
  category: string
  rating: number
  location: string
  duration: string
  description: string
  features: string
  price: string
  discount: string
  mainImage: string
  images: string
  createdBy: string
  createdAt: string
}
export type TourSearchInterface = {
  search: string
  type: string
  priceRangeMin: string
  priceRangeMax: string
  date: string
  duration: string
}
export type DeleteTourInterface = {
  id: string
}
