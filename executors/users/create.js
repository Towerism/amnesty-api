import EventEmitter from 'events'
import passwordHasher from '../../services/passwordHasher'
import { inject } from 'aurelia-dependency-injection'

@inject('UserRepository')
export default class Create extends EventEmitter {
  constructor(userRepository) {
    super()
    this.userRepository = userRepository
  }

  execute(user) {
    let u = user
    passwordHasher.hash('Password2').then(password => {
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
