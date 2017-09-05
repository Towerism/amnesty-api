import EventEmitter from 'events'
import util from './util'
import { inject, transient } from 'aurelia-dependency-injection'
import UserRepository from '../../repositories/user'

@inject(UserRepository)
@transient()
export default class GetById extends EventEmitter {
  constructor(userRepository) {
    super()
    this.userRepository = userRepository
  }

  execute(id) {
    this.userRepository.getById(id).then(user => {
      this.emit('success', util.mapToUserViewModel(user))
    })
  }
}
