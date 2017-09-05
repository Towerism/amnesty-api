import { Container } from 'aurelia-dependency-injection'
import UserRepository from '../repositories/user'

const ioc = new Container()

ioc.registerSingleton('UserRepository', UserRepository)

export default ioc
