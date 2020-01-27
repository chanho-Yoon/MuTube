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
  console.log(search_word)
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
export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req
  try {
    const video = await Video.findById(id)
    console.log(video)
    res.render('videoDetail', { pageTitle: 'Video Detail', video })
  } catch (error) {
    //에러 발생시 홈으로 강제이동
    res.redirect(routes.home)
  }
}

//비디오 수정 --------------------------------------------------------------------------------------------------
export const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req
  try {
    const video = await Video.findById(id)
    res.render('editVideo', { pageTitle: `Edit ${video.title}`, video })
  } catch (error) {
    res.redirect(routes.home)
  }
}
export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description })
    res.redirect(routes.videoDetail(id))
  } catch (error) {
    res.redirect(routes.home)
  }
}
//비디오 삭제 --------------------------------------------------------------------------------------------------
export const deleteVideo = (req, res) => {
  res.render('deleteVideo', { pageTitle: 'Delete Video' })
}
