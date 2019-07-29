import { HttpMethod, route } from 'koa-decorator'
import { isAuthenticated, loginMiddleware } from '../../../middleware'
import location from '../../../model/location.schema'
import mongoose from 'mongoose'
import _ from 'lodash'

@route('/v1')
export default class Location {
  @route('/location', HttpMethod.POST, isAuthenticated)
  async findLocation(ctx) {
    let { search } = ctx.request.body
    let results = await location.find({
      $or: [{ code: new RegExp(search) }, { name: new RegExp(search) }],
    })
    console.log(results)
    ctx.body = results
  }

  @route('/location', HttpMethod.GET , isAuthenticated)
  async getLocation(ctx) {
    let dataLocation = await location.find({})
    let meltLocation = dataLocation.map(value => {
      let data = {
        id: value._id,
        code: value.code,
        name: value.name,
      }
      return data
    })
    ctx.body = meltLocation
  }

  @route('/location', HttpMethod.POST , isAuthenticated)
  async createlocation(ctx) {
    let requestData = ctx.request.body
    if (!_.isEmpty(requestData)) {
      let data = await location.findOne({ name: requestData.name })
      if (data) {
        ctx.body = {
          status: 500,
          log: 'Location is Duplicate',
        }
      } else {
        location.create(requestData)
        ctx.body = {
          status: 200,
          log: 'Create Location Successfully',
        }
      }
    } else {
      ctx.body = {
        status: 500,
        log: 'No Data',
      }
    }
  }

  @route('/location/:id', HttpMethod.PUT , isAuthenticated)
  async updatelocation(ctx) {
    let idLocation = ctx.params.id
    let requestData = ctx.request.body
    let dataLocation = await location.findOne({ _id: idLocation })
    if (dataLocation._id.toString() !== idLocation) {
      ctx.body = {
        status: 500,
        message: 'Username is Duplicate',
      }
    } else {
      let { code, name } = requestData
      const result = await location.update({ _id: idLocation }, { code, name })
      ctx.body = {
        status: 200,
        message: result.ok == 1 ? 'Update Successfully' : 'Update fail',
      }
    }
    
  }
}

