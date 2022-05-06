import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import faker from 'faker'
import { TourType, TourModel } from '../../model/toursModel'
import { UsersModel, UserType } from '../../model/usersModel'

export async function migrate(req: Request, res: Response, next: NextFunction) {
  try {
    let seedsTour: Array<TourType> = []
    for (let i = 0; i < 500; i++) {
      const categories = ['Quad', 'Beach', 'Mountain', 'Hiking', 'Ballon']
      const feature = ['Support Kids', 'breakfast', 'Dinner']
      const selectedCategories = []
      const selectedFeatures = []
      feature.forEach((el) => {
        if (Math.floor(Math.random() * 2) == 1) selectedFeatures.push(el)
      })
      categories.forEach((el) => {
        if (Math.floor(Math.random() * 2) == 1) selectedCategories.push(el)
      })
      if (!selectedFeatures.length) {
        selectedFeatures.push(feature[Math.floor(Math.random() * feature.length + 0)])
      }
      if (!selectedCategories.length) {
        selectedCategories.push(categories[Math.floor(Math.random() * categories.length + 0)])
      }
      seedsTour.push({
        name: faker.name.title(),
        rating: faker.datatype.number({ min: 1, max: 5 }),
        duration: faker.datatype.number({ min: 1, max: 5 }),
        description: faker.lorem.words(),
        price: faker.datatype.number(),
        discount: faker.datatype.number(),
        mainImage: faker.random.image(),
        images: [faker.random.image(), faker.random.image(), faker.random.image()],
        location: [faker.address.city(), faker.address.city(), faker.address.city()],
        features: selectedFeatures,
        category: selectedCategories,
        createdBy: faker.lorem.words(),
      })
    }
    let seedsUser: Array<UserType> = []
    for (let i = 0; i < 400; i++) {
      seedsUser.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        password: faker.random.words(),
        image: faker.random.image(),
      })
    }
    await TourModel.insertMany(seedsTour)
    await UsersModel.insertMany(seedsUser)
    res.json({ message: 'SuccessFully Inserted', statusCode: 200 })
  } catch (err) {
    return res.json({ message: 'Failed to Insert', statusCode: 500 })
  }
}
