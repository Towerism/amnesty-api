import express from 'express'
import { authenticated } from '../auth'
import useMethodFactory from './util/useMethodFactory'
import * as executors from '../executors/users'
import ioc from '../ioc'

var router = express.Router()

router.all('*', authenticated())

var useMethod = useMethodFactory('UsersController')

router.get('/', useMethod('getAll'))
router.get('/:userId', useMethod('getById'))
router.post('/password/:userId', useMethod('updatePassword'))
router.post('/create', useMethod('create'))
router.delete('/:userId', useMethod('delete'))

export default router
