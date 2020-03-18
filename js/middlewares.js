/* eslint-disable no-undef */ //process에 빨간줄 해결
import multer from 'multer'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'
import routes from '../routes'
import Video from '../models/Video'

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: 'ap-northeast-2'
})
// upload video
const multerVideo = multer({
  storage: multerS3({
    s3: s3,
    acl: 'public-read',
    bucket: 'mutube/video'
  })
})
// upload avatar
const multerAvatar = multer({
  storage: multerS3({
    s3: s3,
    acl: 'public-read',
    bucket: 'mutube/avatar'
  })
})

export const uploadVideo = multerVideo.single('videoFile')
export const uploadAvatar = multerAvatar.single('avatar')

// delete video
export const awsDeleteVideo = async (req, res, next) => {
  const {
    params: { id }
  } = req
  const video = await Video.findById(id)
  const url = video.fileUrl.split('/')
  const delFileName = url[url.length - 1]
  const params = {
    Bucket: 'mutube/video',
    Key: delFileName
  }
  s3.deleteObject(params, function(err, data) {
    if (err) {
      console.log('aws video delete error')
      console.log(err, err.stack)
      res.redirect(routes.home)
    } else {
      console.log('aws video delete success' + data)
    }
  })
  next()
}

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
