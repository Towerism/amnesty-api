import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import Debug from 'debug'
import express from 'express'
import logger from 'morgan'
import path from 'path'
import cors from 'cors'

import auth from './auth'

import index from './routes/index'
import users from './routes/users'
import login from './routes/login'

const app = express()
const debug = Debug('api:app')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(cookieParser())
app.unsubscribe(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }))

app.use(express.static(path.join(__dirname, 'public')))

app.use(auth.initialize())
app.use(auth.session())

app.use(cors())

app.use('/login', login)
app.use('/', index)
app.use('/users', users)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
/* eslint no-unused-vars: 0 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
    // render the error page
  res.status(err.status || 500)
  res.json(err)
})

// Handle uncaughtException
process.on('uncaughtException', (err) => {
  debug('Caught exception: %j', err)
  process.exit(1)
})

export default app
