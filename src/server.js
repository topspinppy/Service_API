import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { load } from 'koa-decorator'
import cors from '@koa/cors'
import path from 'path'
import mongoose from 'mongoose'

const app = new Koa()

app.use(bodyParser())
app.use(
  cors({
    origin: '*',
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    exposeHeaders: ['X-Request-Id'],
  }),
)

const apiRouter = load(path.resolve(__dirname, 'controllers'), 'controller.js')
app.use(apiRouter.routes())
app.use(
  apiRouter.allowedMethods({
    throw: true,
    notImplemented: () => new errors.NotImplemented('NotImplemented'),
    methodNotAllowed: () => new errors.MethodNotAllowed('MethodNotAllowed'),
  }),
)

mongoose.connect(`mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/services?authSource=admin`)

const server = app
  .listen(3333, () => {
    console.log(`app listening run on port 3333`)
  })
  .on('error', err => {
    console.log(`error = `, err)
  })

export default server
