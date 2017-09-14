import EventEmitter from 'events'
import { inject, transient } from 'aurelia-dependency-injection'

@inject('UserRepository', 'PasswordHasher')
@transient()
export default class UpdatePassword extends EventEmitter {
  constructor(userRepository, passwordHasher) {
    super()
    this.userRepository = userRepository
    this.passwordHasher = passwordHasher
  }

  execute({ requestedId, authUser, oldPassword, newPassword, confirmPassword }) {
    if (authUser.id !== requestedId) {
      this.emit('userIdMismatch')
    }
    this.passwordHasher.compare(oldPassword, authUser.password).then(result => {
      if (!result) {
        return this.emit('invalidPassword')
      }
      if (newPassword !== confirmPassword) {
        return this.emit('passwordMismatch')
      }
      this.passwordHasher.hash(newPassword).then(password => {
        this.userRepository.getById(requestedId).then(user => {
          user.password = password
          user.save({ fields: ['password'] })
        })
      })
      this.emit('success')
    })
  }
}
