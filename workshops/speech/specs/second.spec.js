const {expect} = require('chai')
const {fetchy} = require('../utils/request')

const fetch = fetchy('http://localhost:8888/userData')

describe('Some test suite second', function() {
  Array.from(Array(1)).forEach(function(item, index) {
    it(`Some test case ${index}`, async function() {
      await fetch.get({path: '/userData'})
      await fetch.get({path: '/userData'})
      await fetch.get({path: '/userData'})
      await fetch.get({path: '/userData'})
      await fetch.get({path: '/userData'})
      await fetch.get({path: '/userData'})
      await fetch.get({path: '/userData'})
      await fetch.get({path: '/userData'})
      await fetch.get({path: '/userData'})
      await fetch.get({path: '/userData'})
      await fetch.get({path: '/userData'})
    })
  })
})

