import { HttpMethod, route } from 'koa-decorator'
import mongoose from 'mongoose'
import work from '../../../model/work.schema'
import _ from 'lodash'

@route('/v1')
export default class Work {
  @route('/works', HttpMethod.POST)
  async createWork(ctx) {
    let requestWork = ctx.request.body
    console.log(requestWork)
    if (!_.isEmpty(requestWork)) {
      ctx.body = {
        status: '404',
        message: 'no data',
      }
    } else {
      work.create(requestWork)
      ctx.body = {
        status: 200,
        log: 'Create Work Successfully',
      }
    }
  }
}
