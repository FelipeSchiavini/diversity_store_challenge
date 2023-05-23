import 'reflect-metadata'
import express from 'express'
import { useExpressServer } from 'routing-controllers'
import { controllers } from './app/controllers'

const ServerInitialize = async () => {
  const server = express()

  server.use(express.json())

  useExpressServer(server, {
    controllers,
    // classTransformer: true,
  })

  return server.listen(3333, () => console.log(`Listening on port 3333`))
}

ServerInitialize()
