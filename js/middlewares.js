import multer from 'multer'
import routes from '../routes.js'

const multerVideo = multer({ dest: 'uploads/videos/' })

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = 'MuTube'
  res.locals.routes = routes

  //사용자 user
  res.locals.loggedUser = req.user || null
  next()
}
//로그인 상태라면 접근하면 안되는 경로를 처리
export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home)
  } else {
    next()
  }
}
//로그인 상태에서만 접근가능한 경로를 처리
export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.redirect(routes.home)
  }
}

export const uploadVideo = multerVideo.single('videoFile')
