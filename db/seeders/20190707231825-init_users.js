'use strict';
const {
  sequelize,
  users
} = require('../models')
const faker = require('faker')

const generatingFakeUsers = async howMany => {
 
  let user = {}
  for(let i =0; i<howMany; i +=1) {
    user = {
      username : faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }
    await users.create(user)
    .catch(err => {
      console.log(`Error ${err}`)
    
    })

  }
 
}
module.exports = {
  up: (queryInterface, Sequelize) => {

    return generatingFakeUsers(600)
  
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
