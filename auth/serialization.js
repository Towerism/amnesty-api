import models from '../models'
import passport from 'passport'

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  models.User.findById(id).then(user => {
    done(null, user)
  }).catch(err => {
    done(err, false)
  })
})
