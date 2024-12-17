// Create a server with koa
import {apiRoutes} from "./api-router";
import express from 'express'
import cors from 'cors'
import * as bodyParser from 'body-parser'

console.log('STARTING')

const app = express()
app.use(cors({
  exposedHeaders: ['X-Total-Count'],
}));

app
  .use(cors())
  .use(bodyParser.json())
  .use('/api', apiRoutes)

try {
  app.listen(3000, () => {
    console.log('Listening on port 3000')
  })
} catch (err) {
  console.error(err)
}
