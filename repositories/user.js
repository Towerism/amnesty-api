import models from '../models'

export default class UserRepository {
  getAll() {
    return models.User.findAll()
  }

  getById(id) {
    return models.User.findById(id)
  }

  getByEmail(email) {
    return models.User.findOne({
      where: { email }
    })
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
