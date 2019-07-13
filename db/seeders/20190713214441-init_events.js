'use strict';
const { 
  events
} = require('../models')
const faker = require('faker')

const generatingFakeEvents = async howMany => {
 
    let event = {}
    for(let i =0; i<howMany; i +=1) {
      event = {
        name : faker.commerce.productName(),
        description: faker.hacker.phrase()
      }
      await events.create(event)
      .catch(err => {
        console.log(`Error ${err}`)
      
      })
  
    }
   
  }

module.exports = {
  up: (queryInterface, Sequelize) => {
    return generatingFakeEvents(600)
    .then(res => {
      console.log(res)
    })
    
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
