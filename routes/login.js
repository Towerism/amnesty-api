import express from 'express'
import passport from 'passport'
import { generateAuthToken } from '../auth'

var router = express.Router()

router.post('/', (request, response, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) { return response.status(401).send('Unauthorized') }
    request.login(user, (err) => {
      if (err) { next(err) }
      var token = generateAuthToken(user)
      return response.send(token)
    })
  })(request, response, next)
})

export default router
