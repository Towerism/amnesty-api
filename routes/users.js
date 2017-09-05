import express from 'express'
import { authenticated } from '../auth'
import * as executors from '../executors/users'
import ioc from '../ioc'

var router = express.Router()

router.all('*', authenticated())

router.get('/', (req, res) => {
  const getAll = ioc.get(executors.GetAll)
  getAll.on('success', users => {
    res.send(users)
  })
  getAll.execute()
})

router.get('/:userId', (req, res) => {
  const getById = ioc.get(executors.GetById)
  getById.on('success', user => {
    res.send(user)
  })
  getById.execute(req.params.userId)
})

router.post('/:userId/password', (req, res) => {
  const updatePassword = ioc.get(executors.UpdatePassword)
  updatePassword
    .on('userIdMismatch', () => res.sendStatus(401))
    .on('invalidPassword', () => res.status(400).send({ error: 'Failed', message: 'Invalid Password' }))
    .on('passwordMismatch', () => res.status(400).send({ error: 'Failed', message: 'Passwords did not match' }))
    .on('success', () => res.sendStatus(200))
  updatePassword.execute(Object.assign({
    requestedId: parseInt(req.params.userId),
    authUser: req.user
  }, req.body))
})

router.post('/create', function(req, res, next) {
  const create = ioc.get(executors.Create)
  create
    .on('success', () => res.sendStatus(200))
    .on('validationError', message => res.status(400).send({ error: 'Validation', message }))
    .on('error', err => next(err))
  create.execute(req.body)
})

router.delete('/:userId', function(req, res) {
  const deleteById = ioc.get(executors.DeleteById)
  deleteById.on('success', () => res.sendStatus(200))
  deleteById.execute(req.params.userId)
})

export default router
