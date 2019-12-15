
const express = require('express')

const passport = require('passport')


const Children = require('../models/children')


const customErrors = require('../../lib/custom_errors')


const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

router.get('/children', requireToken, (req, res, next) => {
  
  Children.find({owner: req.user.id})
    .then(children => res.status(200).json({children: children}))
    .catch(next)
  
  
})

router.get('/children/:id', requireToken, (req, res, next) => {
 
  Children.findById(req.params.id)
    .then(handle404)
   
    .then(children => {
     
      requireOwnership(req, children)
    
      res.status(200).json({ children: children.toObject() })
    })
   
    .catch(next)
})


router.post('/children', requireToken, (req, res, next) => {
  
  req.body.children.owner = req.user.id

  Children.create(req.body.children)
    
    .then(children => {
      res.status(201).json({ children: children.toObject() })
    })
    
    .catch(next)
})

router.patch('/children/:id', requireToken, removeBlanks, (req, res, next) => {
  
  delete req.body.children.owner

  Children.findById(req.params.id)
    .then(handle404)
    .then(children => {
      
      requireOwnership(req, children)


      return children.update(req.body.children)
    })
  
    .then(() => res.status(204))

    .catch(next)
})


router.delete('/children /:id', requireToken, (req, res, next) => {
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
