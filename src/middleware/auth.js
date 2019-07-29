import user from '../model/user.schema'
import passport from 'koa-passport'
import passportJWT from 'passport-jwt'

const JwtStrategy = passportJWT.Strategy
const ExtractJwt = passportJWT.ExtractJwt
const SECRET = 'MY_SECRET_KEY'

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: SECRET, //SECRETเดียวกับตอนencodeในกรณีนี้คือ MY_SECRET_KEY
}
const jwtAuth = new JwtStrategy(jwtOptions, async (payload, done) => {
  let data = await user.findOne({ username: payload.sub })
  if (payload.sub === data.username) done(null, true)
  else done(null, false)
})

passport.use(jwtAuth)
//ทำ Passport Middleware
export const isAuthenticated = passport.authenticate('jwt', { session: false })
