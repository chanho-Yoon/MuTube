import multer from 'multer'
import routes from '../routes.js'

const multerVideo = multer({ dest: 'uploads/videos/' })

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = 'MuTube'
  res.locals.routes = routes

  //사용자 user
  res.locals.user = req.user || null
  next()
}

export const uploadVideo = multerVideo.single('videoFile')
