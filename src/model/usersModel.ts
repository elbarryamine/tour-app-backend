import mongoose from 'mongoose'

export interface UserType {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  image: string
}
const usersSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String, required: false },
  role: { type: String, enum: ['admin', 'user', 'super'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
})

export const UsersModel = mongoose.model('Users', usersSchema)
