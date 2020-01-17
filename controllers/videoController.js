import '../js/db'
import routes from '../routes'

export const home = (req, res) => {
  res.render('home', { pageTitle: 'Home', videos })
}

export const search = (req, res) => {
  const {
    query: { search_word }
  } = req
  res.render('search', { pageTitle: 'Search', search_word, videos })
}

export const getUpload = (req, res) => {
  res.render('upload', { pageTitle: 'Upload' })
}
export const postUpload = (req, res) => {
  const {
    body: { file, title, description }
  } = req
  //비디오 업로드 및 저장
  res.redirect(routes.videoDetail(12345))
}

export const videoDetail = (req, res) => {
  res.render('videoDetail', { pageTitle: 'Video Detail' })
}

export const editVideo = (req, res) => {
  res.render('editVideo', { pageTitle: 'Edit Video' })
}

export const deleteVideo = (req, res) => {
  res.render('deleteVideo', { pageTitle: 'Delete Video' })
}
