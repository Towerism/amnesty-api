import passport from 'passport'
import models from '../../../models'
import config from './config'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import _ from 'lodash'

var options = {
  secretOrKey: config.secretOrKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}
_.assign(options, config.claims)

passport.use(new JwtStrategy(options, (jwtPayload, done) => {
  models.User.findById(jwtPayload.sub).then(user => {
    if (user) {
      return done(null, user)
    }
    return done(null, false)
  }).catch(err => {
    return done(err, false)
  })
}))
