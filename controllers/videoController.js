import { videos } from '../js/dbtest'

export const home = (req, res) => {
  res.render('home', { pageTitle: 'Home', testId: '1234ss', videos })
}
export const search = (req, res) => {
  const {
    query: { search_word }
  } = req
  res.render('search', { pageTitle: 'Search', search_word })
}
export const upload = (req, res) => {
  res.render('upload', { pageTitle: 'Upload' })
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
