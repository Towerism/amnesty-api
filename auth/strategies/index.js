import Jwt from './jwt'
import Local from './local'
import ioc from '../../ioc'

var strategies = [
  Jwt,
  Local
]

strategies.forEach(strategy => ioc.get(strategy))
