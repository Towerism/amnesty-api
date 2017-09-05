import EventEmitter from 'events'
import { inject, transient } from 'aurelia-dependency-injection'

@inject('UserRepository')
@transient()
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
