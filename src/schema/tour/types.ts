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
  numberOfbooked: number
  createdBy: string
  createdAt: string
}
export type CreateTourInterface = {
  name: string
  category: string
  rating: number
  location: string
  duration: string
  description: string
  features: string
  price: string
  discount: string
}
export type TourSearchInterface = {
  search: string
  type: string
  priceRangeMin: number
  priceRangeMax: number
  date: string
  duration: number
}
export type DeleteTourInterface = {
  ids: string[]
}
export type GetTourByUserIdInterface = {
  id: string
}
