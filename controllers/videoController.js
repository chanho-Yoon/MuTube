import routes from '../routes'
import Video from '../model/Video'

export const home = async (req, res) => {
  try {
    const videos = await Video.find({})
    res.render('home', { pageTitle: 'Home', videos })
  } catch (error) {
    console.log(error)
    res.render('home', { pageTitle: 'Home', videos })
  }
}
//검색 --------------------------------------------------------------------------------------------------
export const search = (req, res) => {
  const {
    query: { search_word }
  } = req
  res.render('search', { pageTitle: 'Search', search_word, videos })
}
//업로드 --------------------------------------------------------------------------------------------------
export const getUpload = (req, res) => {
  res.render('upload', { pageTitle: 'Upload' })
}
export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path }
  } = req
  console.log(`path: ${path}`)
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description
  })
  console.log(newVideo)
  //비디오 업로드 및 저장
  res.redirect(routes.videoDetail(newVideo.id))
}

//비디오 상세 --------------------------------------------------------------------------------------------------
export const videoDetail = (req, res) => {
  res.render('videoDetail', { pageTitle: 'Video Detail' })
}

//비디오 수정 --------------------------------------------------------------------------------------------------
export const editVideo = (req, res) => {
  res.render('editVideo', { pageTitle: 'Edit Video' })
}

//비디오 삭제 --------------------------------------------------------------------------------------------------
export const deleteVideo = (req, res) => {
  res.render('deleteVideo', { pageTitle: 'Delete Video' })
}
