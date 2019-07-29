import user from '../model/user.schema'

export const loginMiddleware = async (ctx, next) => {
  const { username, password } = ctx.request.body
  let dataUser = await user.findOne({ username: username, password: password })
  if (dataUser !== null) {
    if (username === dataUser.username && password === dataUser.password) {
      next()
    } else ctx.body = 'error'
  } else {
    ctx.body = {
      status: 'Login Error',
    }
  }
}
