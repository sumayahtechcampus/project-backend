// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for parents
const Parent = require('../models/parent')


const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /parents
router.get('/parents', requireToken, (req, res, next) => {
  
  Example.find({owner: req.user.id})
    .then(examples => res.status(200).json({examples: examples}))
    .catch(next)
  

})

// SHOW
// GET /parents/5a7db6c74d55bc51bdf39793
router.get('/parents/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Parent.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "example" JSON
    .then(parent => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, parent)
    
      res.status(200).json({ parent: parent.toObject() })
    })
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /parent
router.post('/parents', requireToken, (req, res, next) => {
  req.body.parent.owner = req.user.id

  Parent.create(req.body.parent)
    // respond to succesful `create` with status 201 and JSON of new "parent"
    .then(parent => {
      res.status(201).json({ parent: parent.toObject() })
    })
    
    .catch(next)
})

// UPDATE
// PATCH /parents/5a7db6c74d55bc51bdf39793
router.patch('/parents/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.parent.owner

  Parent.findById(req.params.id)
    .then(handle404)
    .then(parent => {
      
      requireOwnership(req, parent)

      // pass the result of Mongoose's `.update` to the next `.then`
      return parent.update(req.body.parent)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.status(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /parents/5a7db6c74d55bc51bdf39793
router.delete('/parents/:id', requireToken, (req, res, next) => {
  Parent.findById(req.params.id)
    .then(handle404)
    .then(parent => {
      requireOwnership(req, parent)
      parent.remove()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
