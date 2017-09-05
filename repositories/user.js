import models from '../models'

export default class UserRepository {
  getAll() {
    return models.User.findAll()
  }

  getById(id) {
    return models.User.findById(id)
  }

  create(user) {
    return models.User.create(user)
  }

  delete(id) {
    return models.User.destroy({
      where: { id }
    })
  }
}
