import models from '../models'
import express from 'express'
import { authenticated } from '../auth'
import _ from 'lodash'
import bcrypt from 'bcrypt'

var router = express.Router()

function mapToUserViewModel(user) {
  return {
    id: user.id,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname
  }
}

router.all('*', authenticated())

router.get('/', (req, res) => {
  models.User.findAll().then(users => {
    res.send(_(users).map(mapToUserViewModel))
  })
})

router.get('/:userId', (req, res) => {
  models.User.findById(req.params.userId).then(user => {
    res.send(mapToUserViewModel(user))
  })
})

router.post('/:userId/password', (req, res) => {
  if (req.user.id !== parseInt(req.params.userId)) {
    return res.status(401).send('UNAUTHORIZED')
  }
  var model = req.body
  req.user.validatePassword(model.oldPassword).then(result => {
    if (!result) {
      return res.status(400).send({ title: 'Failed', message: 'Invalid Password' })
    }
    if (model.newPassword !== model.confirmPassword) {
      return res.status(400).send({ title: 'Failed', message: 'Passwords did not match' })
    }
    bcrypt.hash(model.newPassword, 10).then(password => {
      models.User.findById(req.params.userId).then(user => {
        user.password = password
        user.save({ fields: ['password'] })
      })
    })
    res.send('SUCCESS')
  })
})

router.post('/create', function(req, res, next) {
  bcrypt.hash('Password2', 10).then(password => {
    var user = req.body
    user.password = password
    models.User.create(user).then(() => {
      res.send(mapToUserViewModel(user))
    }).catch(err => {
      next(err)
    })
  })
})

router.delete('/:userId', function(req, res) {
  models.User.destroy({
    where: {
      id: req.params.userId
    }
  }).then(function() {
    res.status(200).send('Success')
  })
})

export default router
