import EventEmitter from 'events'
import util from './util'
import _ from 'lodash'
import { inject } from 'aurelia-dependency-injection'
import UserRepository from '../../repositories/user'

@inject(UserRepository)
export default class GetAll extends EventEmitter {
  constructor(userRepository) {
    super()
    this.userRepository = userRepository
  }

  execute() {
    this.userRepository.getAll().then(users => {
      return this.emit('success', _(users).map(util.mapToUserViewModel))
    })
  }
}
