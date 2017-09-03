import config from './strategies/jwt/config'
import jwt from 'jsonwebtoken'
import _ from 'lodash'

export function generateAuthToken(user) {
  var claims = _.assign({}, config.claims)
  claims.subject = `${user.id}`
  return jwt.sign({
    email: user.email,
    fullname: user.fullname
  }, config.secretOrKey, claims)
}
