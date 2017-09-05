import EventEmitter from 'events'
import passwordHasher from '../../services/passwordHasher'
import { inject, transient } from 'aurelia-dependency-injection'

@inject('UserRepository')
@transient()
export default class UpdatePassword extends EventEmitter {
  constructor(userRepository) {
    super()
    this.userRepository = userRepository
  }

  execute({ requestedId, authUser, oldPassword, newPassword, confirmPassword }) {
    if (authUser.id !== requestedId) {
      this.emit('userIdMismatch')
    }
    authUser.validatePassword(oldPassword).then(result => {
      if (!result) {
        return this.emit('invalidPassword')
      }
      if (newPassword !== confirmPassword) {
        return this.emit('passwordMismatch')
      }
      passwordHasher.hash(newPassword).then(password => {
        this.userRepository.getById(requestedId).then(user => {
          user.password = password
          user.save({ fields: ['password'] })
        })
      })
      this.emit('success')
    })
  }
}
