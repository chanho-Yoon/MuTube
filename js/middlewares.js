import routes from '../routes.js'

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = 'MuTube'
  res.locals.routes = routes

  //임시로 만든 가짜 사용자 데이터
  res.locals.user = {
    idCheck: true,
    id: 1
  }
  next()
}
