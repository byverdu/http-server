import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { healthRouter } from './routes/health.mjs'

function expressApp () {
  const app = express()

  app.use(cors())
  app.use(morgan('dev'))
  app.use('/health', healthRouter)
  app.use(express.static('public'))
  app.use((req, res) => {
    res.status(404).send(`No handler found for ${req.url}`)
  })

  return app
}

export { expressApp }
