import routes from '../routes'
import Video from '../models/Video'
import Comment from '../models/Comment'

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
    file: { location }
  } = req
  const newVideo = await Video.create({
    fileUrl: location,
    title,
    description,
    creator: req.user.id
  })
  req.flash('success', '업로드 성공')
  //새로운 비디오 생성 후 로그인된 유저스키마 videos에 새롭게 등록되는 비디오의 id를 저장
  req.user.videos.push(newVideo.id)
  req.user.save()
  res.redirect(routes.videoDetail(newVideo.id))
}

//비디오 상세 --------------------------------------------------------------------------------------------------
export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req
  try {
    // populate() 사용하여 id에 해당하는 비디오를 찾아 creator 객체도 같이 넘겨준다
    const video = await Video.findById(id)
      .populate('creator')
      .populate('comments')
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
    //로그인한 사용자가 다른 사용자의 비디오 수정을 하지 못하도록
    if (String(video.creator) !== req.user.id) {
      throw Error()
    } else {
      res.render('editVideo', { pageTitle: `Edit ${video.title}`, video })
    }
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
    req.flash('success', '비디오 업데이트 성공')
    res.redirect(routes.videoDetail(id))
  } catch (error) {
    req.flash('error', '비디오 업데이트 실패')
    res.redirect(routes.home)
  }
}
//비디오 삭제 --------------------------------------------------------------------------------------------------
export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req
  try {
    const video = await Video.findById(id).populate('creator')
    //로그인한 사용자가 다른 사용자의 비디오 삭제를 하지 못하도록
    if (String(video.creator._id) !== String(req.user.id)) {
      throw Error()
    } else {
      video.remove()
      // await Video.findOneAndRemove({ _id: id })
      req.flash('success', '비디오 삭제 성공')
    }
  } catch (error) {
    console.log(`Controller deleteVideo error : ${error}`)
  }
  res.redirect(routes.home)
}

// 비디오 조회수 카운터
export const postRegisterView = async (req, res) => {
  const {
    params: { id }
  } = req
  try {
    const video = await Video.findById(id)
    video.views = video.views + 1
    video.save()
    res.status(200)
  } catch (error) {
    res.status(400)
  } finally {
    res.end()
  }
}

// add comment
export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user
  } = req
  try {
    const video = await Video.findById(id)
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
      avatarUrl: user.avatarUrl,
      name: user.name
    })
    video.comments.push(newComment.id)
    video.save()
  } catch (error) {
    //댓글 난사하다보면 400 에러.. 원인을 찾아봐야겠다..
    console.log('postAddComment 에러')
    res.status(400)
  } finally {
    res.end()
  }
}
// delete comment
export const postDelComment = async (req, res) => {
  const {
    params: { id },
    body: { delCommentId }
  } = req
  try {
    const commentUser = await Comment.findById(delCommentId)
    //해당 비디오에 댓글을 남긴 사용자가 댓글 삭제하기 위해 비디오 모델 가져옴
    const video = await Video.findById(id)
    if (commentUser.creator != req.user.id) {
      throw Error()
    } else {
      await Comment.findByIdAndRemove({ _id: delCommentId })
      video.save()
    }
  } catch (error) {
    console.log('postDelComment 에러 ' + error)
    res.status(400)
  } finally {
    res.end()
  }
}
