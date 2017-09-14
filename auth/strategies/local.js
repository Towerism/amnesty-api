import passport from 'passport'
import models from '../../models'
import { inject } from 'aurelia-dependency-injection'

import { Strategy as LocalStrategy } from 'passport-local'

@inject('UserRepository', 'PasswordHasher')
export default class Local {
  constructor(userRepository, passwordHasher) {
    passport.use(new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      (email, password, done) => {
        return userRepository.getByEmail(email).then(user => {
          if (!user) { return done(null, false) }
          passwordHasher.compare(password, user.password).then(result => {
            if (!result) {
              return done(null, false)
            }
            return done(null, user)
          })
        }).catch(err => {
          return done(err)
        })
      }
    ))
  }
}
