import EventEmitter from 'events'
import { inject } from 'aurelia-dependency-injection'
import UserRepository from '../../repositories/user'

@inject(UserRepository)
export default class DeleteById extends EventEmitter {
  constructor(userRepository) {
    super()
    this.userRepository = userRepository
  }

  execute(id) {
    return this.userRepository.delete(id).then(() => {
      this.emit('success')
    })
  }
}
