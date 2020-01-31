import routes from '../routes'
import Video from '../model/Video'

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 })
    res.render('home', { pageTitle: 'Home', videos })
  } catch (error) {
    console.log(error)
    res.render('home', { pageTitle: 'Home', videos: [] })
  }
}
//검색 --------------------------------------------------------------------------------------------------
export const search = async (req, res) => {
  const {
    query: { search_word }
  } = req
  let videos = []
  try {
    videos = await Video.find({ title: { $regex: search_word, $options: 'i' } })
  } catch (error) {
    console.log(`Controller search error : ${error}`)
  }
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
    res.render('videoDetail', { pageTitle: video.title, video })
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
export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req
  try {
    await Video.findOneAndRemove({ _id: id })
  } catch (error) {
    console.log(`Controller deleteVideo error : ${error}`)
  }
  res.redirect(routes.home)
}
