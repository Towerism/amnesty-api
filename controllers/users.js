import * as executors from '../executors/users'
import { inject } from 'aurelia-dependency-injection'

@inject(
  executors.GetAll,
  executors.GetById,
  executors.UpdatePassword,
  executors.Create,
  executors.DeleteById
)
export default class UserController {
  constructor(getAll, getById, updatePassword, create, deleteById) {
    this.getAllExecutor = getAll
    this.getByIdExecutor = getById
    this.updatePasswordExecutor = updatePassword
    this.createExecutor = create
    this.deleteByIdExecutor = deleteById
  }

  getAll(req, res) {
    this.getAllExecutor.on('success', users => {
      res.send(users)
    })
    this.getAllExecutor.execute()
  }

  getById(req, res) {
    this.getById.on('success', user => {
      res.send(user)
    })
    this.getById.execute(req.params.userId)
  }

  updatePassword(req, res) {
    this.updatePassword
      .on('userIdMismatch', () => res.sendStatus(401))
      .on('invalidPassword', () => res.status(400).send({ error: 'Failed', message: 'Invalid Password' }))
      .on('passwordMismatch', () => res.status(400).send({ error: 'Failed', message: 'Passwords did not match' }))
      .on('success', () => res.sendStatus(200))
    this.updatePassword.execute(Object.assign({
      requestedId: parseInt(req.params.userId),
      authUser: req.user
    }, req.body))
  }

  create(req, res, next) {
    this.create
      .on('success', () => res.sendStatus(200))
      .on('validationError', message => res.status(400).send({ error: 'Validation', message }))
      .on('error', err => next(err))
    this.create.execute(req.body)
  }

  delete(req, res) {
    this.deleteById.on('success', () => res.sendStatus(200))
    this.deleteById.execute(req.params.userId)
  }
}
