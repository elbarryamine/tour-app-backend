import mongoose from 'mongoose'

export interface TourType {
  name: string
  rating: number
  duration: number
  description: string
  price: number
  discount: number
  mainImage: string
  images: Array<string>
  location: Array<string>
  features: Array<string>
  category: Array<string>
  numberOfbooked: number
  active: number
  createdBy: string
  createdAt?: Date
}

const toursSchema = new mongoose.Schema<TourType>({
  name: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  duration: { type: Number, min: 1, max: 5, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, required: true },
  mainImage: { type: String, required: true },
  images: { type: [String], required: true },
  location: { type: [String], required: true },
  features: { type: [String], required: true },
  numberOfbooked: { type: Number, default: 0 },
  active: { type: Number, default: 0, enum: [0, 1] },
  category: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: String, required: true },
})
export const TourModel = mongoose.model('Tours', toursSchema)
