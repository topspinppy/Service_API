export const loginMiddleware = async (ctx, next) => {
  const { username, password } = ctx.request.body
  if (username === 'admin' && password === '1234') {
    next()
  } else ctx.body = 'error'
}
