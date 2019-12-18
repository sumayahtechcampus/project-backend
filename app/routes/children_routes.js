const express = require('express')
const passport = require('passport')
const Children = require('../models/children')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()



router.get('/childrens',requireToken,(req, res, next) => {
  
  Children.find()
    .then(children => res.status(200).json({childrens: children}))
    .catch(next)
  
  
})
router.get('/children/:id', (req, res, next) => {
 
  Children.findById(req.params.id)
    .then(handle404)
   
    .then(children => {
     
      requireOwnership(req, children)
    
      res.status(200).json({ children: children.toObject() })
    })
   
    .catch(next)
})
// CREATE
// POST /children
router.post('/children', requireToken, (req, res, next) => {
  
  req.body.children.owner = req.user.id
  console.log("post method")
  Children.create(req.body.children)
    
    .then(children => {
      res.status(201).json({ children: children.toObject() })
    })
    
    .catch(error => {
      res.json({error: error})
    })
})
router.patch('/children/:id', removeBlanks, (req, res, next) => {
  
  delete req.body.children.owner
  Children.findByIdAndUpdate(req.params.id)
    .then(handle404)
    .then(children => {
      
      requireOwnership(req, children)
      return children.update(req.body.children)
    })
  
    .then(() => res.status(204))
    .catch(next)
})
router.delete('/children /:id', (req, res, next) => {
  Children.findById(req.params.id)
    .then(handle404)
    .then(children => {
    
      requireOwnership(req, children)
 
      children.remove()
    })
   
    .then(() => res.sendStatus(204))
   
    .catch(next)
})
module.exports = router