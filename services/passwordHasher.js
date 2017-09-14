import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export default class PasswordHasher {
  hash(data) {
    return bcrypt.hash(data, SALT_ROUNDS)
  }

  compare(data, hash) {
    return bcrypt.compare(data, hash)
  }
}
