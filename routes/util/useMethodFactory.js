import ioc from '../../ioc'

export default function controllerMethodFactory(iocIdentifier) {
  return (method) => {
    let controller = () => ioc.get(iocIdentifier)
    return (...args) => controller()[method](...args)
  }
}
