import EventEmitter from 'events'
import { inject, transient } from 'aurelia-dependency-injection'

@inject('UserRepository', 'PasswordHasher')
@transient()
export default class Create extends EventEmitter {
  constructor(userRepository, passwordHasher) {
    super()
    this.userRepository = userRepository
    this.passwordHasher = passwordHasher
  }

  execute(user) {
    let u = user
    this.passwordHasher.hash('Password2').then(password => {
      u.password = password
      this.userRepository.create(u).then(() => {
        this.emit('success')
      }).catch(err => {
        if ('message' in err) {
          return this.emit('validationError', err.message)
        }
        return this.emit('error', err)
      })
    })
  }
}
