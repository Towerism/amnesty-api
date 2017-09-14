import { Container } from 'aurelia-dependency-injection'
import UserRepository from '../repositories/user'
import PasswordHasher from '../services/passwordHasher'
import UsersController from '../controllers/users'

const ioc = new Container()

ioc.registerSingleton('UserRepository', UserRepository)
ioc.registerTransient('UsersController', UsersController)
ioc.registerSingleton('PasswordHasher', PasswordHasher)

export default ioc
