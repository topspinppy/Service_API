import { HttpMethod, route } from 'koa-decorator'
import user from '../../../model/user.schema'

import { isAuthenticated } from '../../../middleware/auth'
import { loginMiddleware } from '../../../middleware/login'
import jwt from 'jwt-simple'

const SECRET = 'MY_SECRET_KEY'

@route('/v1')
export default class User {
  @route('/signin', HttpMethod.POST, loginMiddleware)
  async signin(ctx) {
    let users = ctx.request.body
    const payload = {
      sub: users.username,
      iat: new Date().getTime(),
    }

    ctx.body = jwt.encode(payload, SECRET)
  }

  @route('/users', HttpMethod.GET, isAuthenticated)
  async getuser(ctx) {
    let dataUser = await user.find({})
    ctx.body = dataUser.map(dataUsers => {
      let data = {
        _id: dataUsers._id.toString(),
        user_type: dataUsers.user_type,
        name: dataUsers.name,
        username: dataUsers.username,
        password: dataUsers.password,
      }
      return data
    })
  }

  @route('/users', HttpMethod.POST, isAuthenticated)
  async createuser(ctx) {
    let requestData = ctx.request.body
    console.log("requestdata => ", requestData)
      let data = await user.findOne({ username: requestData.username })
      if (data) {
        ctx.body = {
          status: 500,
          log: 'Username is Duplicate',
        }
      } else {
        user.create(requestData)
        ctx.body = {
          status: 200,
          log: 'Create User Successfully',
        }
      }
  }

  @route('/users/:id', HttpMethod.PUT, isAuthenticated)
  async updateuser(ctx) {
    let idUser = ctx.params.id
    let requestData = ctx.request.body
    let dataUser = await user.findOne({ _id: idUser })
    if (dataUser._id.toString() !== idUser) {
      ctx.body = {
        status: 500,
        log: 'Username is Duplicate',
      }
    } else {
      let { user_type, name, username, password } = requestData
      const result = await user.update({ _id: idUser }, { user_type, name, username, password })
      ctx.body = {
        status: 200,
        message: result.ok == 1 ? 'Update Successfully' : 'Update fail',
      }
    }
  }

  @route('/users/:id', HttpMethod.DELETE, isAuthenticated)
  async deleteuser(ctx) {
    let idUser = ctx.params.id

    const result = await user.deleteOne({ _id: idUser })

    ctx.body = {
      status: 200,
      message: result.ok == 1 ? 'Delete Successfully' : 'Update fail',
    }
  }
}
