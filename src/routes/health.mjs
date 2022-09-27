import { Router } from 'express'

const healthRouter = Router()

healthRouter.get('/', (_, res) => {
  res.send('ok')
})

export { healthRouter }
