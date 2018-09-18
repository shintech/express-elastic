const router = require('express').Router()

module.exports = function ({ db }) {
  router.get('/search', (req, res) => {
    db.search({
      index: 'inventory',
      type: 'device',
      from: 0,
      size: 100,
      body: {
        sort: [{ '_id': { 'order': 'asc' } }],
        query: {
          multi_match: {
            query: req.query.slug,
            fields: ['serial', 'manufacturer', 'model', 'facility', 'type'],
            fuzziness: '1'
          }
        }
      }
    })

      .then(resp => res.json(resp))
      .catch(err => {
        throw new Error(err.message)
      })
  })

  router.get('/inventory', (req, res) => {
    db.search({
      index: 'inventory',
      type: 'device',
      from: 0,
      size: 100,
      body: {
        sort: [{ '_id': { 'order': 'asc' } }],
        query: {
          match_all: {}
        }
      }
    })

      .then(resp => res.send(resp))
      .catch(err => {
        throw new Error(err.message)
      })
  })

  router.post('/inventory', async (req, res) => {
    let response = await db.index({
      index: 'inventory',
      type: 'device',
      body: req.body
    })

    res.json(response)
  })

  return router
}
