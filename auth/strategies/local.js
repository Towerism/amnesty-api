import passport from 'passport'
import models from '../../models'

import { Strategy as LocalStrategy } from 'passport-local'

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  (email, password, done) => {
    models.User.findOne({
      where: {
        email
      }
    }).then(user => {
      if (!user) { return done(null, false) }
      user.validatePassword(password).then(result => {
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
