import { HttpMethod, route } from 'koa-decorator'
import mongoose from 'mongoose'

@route('/v1/health')
export default class Health {
  @route('/', HttpMethod.GET)
  async main(ctx) {
    if (mongoose.connection.readyState === 0) {
      throw Error('Error')
    }
    ctx.body = {
      status: mongoose.connection.readyState,
    }
  }
}
