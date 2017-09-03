import express from 'express'

const router = express.Router()

/* GET index page. */
router.get('/', (req, res) => {
  res.json({
    result: 'Success'
  })
})

export default router
