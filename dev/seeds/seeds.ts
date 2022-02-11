import { Knex } from 'knex'
import faker from 'faker'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('tour').del()
  // await knex('notification').del();
  // await knex('booking').del();
  // await knex('review').del();
  // Inserts seed entries
  let seedsUser = []
  for (let i = 0; i < 10; i++) {
    seedsUser.push({
      id: i,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      password: faker.random.words(),
      birthDate: faker.date.past(5).toISOString().slice(0, 19).replace('T', ' '),
      avatar: faker.random.image(),
    })
  }
  await knex('user').insert(seedsUser)
  let seedsTour = []
  for (let i = 0; i < 10; i++) {
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
      images: JSON.stringify([faker.random.image(), faker.random.image(), faker.random.image()]),
      location: JSON.stringify([faker.address.city(), faker.address.city(), faker.address.city()]),
      features: JSON.stringify(selectedFeatures),
      category: JSON.stringify(selectedCategories),
      createdBy: i,
    })
  }
  await knex('tour').insert(seedsTour)
}
