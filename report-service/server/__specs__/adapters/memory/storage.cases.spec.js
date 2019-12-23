const {expect} = require('chai')
const {
  getTestCases,
  addNewTestCase,
  removeStorageItems,
  _dropStorage
} = require('../../../lib/adapters/memory/storage.cases')

describe('storage cases', function() {



  describe('simple', function() {
    before(async function() {
      await _dropStorage()
    })
    it('addNewTestCase', async function() {
      const data = await addNewTestCase({id: 1})
      expect(data).to.eql({data: 'ok'})
    })

    it('getTestCases', async function() {
      const result = await getTestCases()
      expect(result).to.be.exist

      await (() => new Promise((res) => {
        let data = '';
        result.on('data', function(chunk) {
          data += chunk.toString()
        })
        result.on('end', function() {
          expect(data).to.be.string
          expect(JSON.parse(data)).to.eql({id: 1})
          res()
        })
      })
      )()
    })
  })

  describe('few items', function() {
    it('few items result', async function() {
      await addNewTestCase({id: 1})
      await addNewTestCase({id: 2})
      await addNewTestCase({id: 3})

      const result = await getTestCases()
      expect(result).to.be.exist

      await (() => new Promise((res) => {
        let data = '';
        result.on('data', function(chunk) {
          data += chunk.toString()
        })
        result.on('end', function() {
          expect(data).to.be.string
          expect(JSON.parse(data)).to.eql({id: 1})
          res()
        })
      })
      )()
    })
  })

})
