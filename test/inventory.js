/* eslint-env mocha  */

const chai = require('chai')
const chaiHttp = require('chai-http')
const environment = process.env['NODE_ENV']
const port = process.env['PORT'] || 8000
const configDB = require('../server/db')

const logger = require('../server/logger')({ environment })
const db = configDB({ logger, environment })
const server = require('../server')({ db, logger, environment, port })

chai.use(chaiHttp)
const expect = chai.expect

describe('INVENTORY', function () {
  it('GET /api/inventory', done => {
    chai.request(server)
      .get('/api/inventory')
      .end(function (err, res) {
          expect(err).to.be.null // eslint-disable-line
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('hits')
        expect(res.body.hits.hits[0]).to.have.property('_id')
        done()
      })
  })

  it('GET /api/search/:id', done => {
    chai.request(server)
      .get('/api/inventory')
      .end(function (error, response) { // eslint-disable-line
        expect(error).to.be.null // eslint-disable-line
        expect(response.body).to.have.property('hits')
        chai.request(server)
          .get(`/api/search?slug=${response.body.hits.hits[0]._id}`)
          .end(function (err, res) {
            expect(err).to.be.null  // eslint-disable-line
            expect(res.body).to.have.property('hits')
            done()
          })
      })
  })
})
