//전역적으로 사용하는 경로 변수 선언
const HOME = '/'
const JOIN = '/join'
const LOGIN = '/login'
const LOGOUT = '/logout'
const SEARCH = '/search'
//

// 유저
const USERS = '/users'
const USER_DETAIL = '/:id'
// /users/id("hi123")
const EDIT_PROFILE = '/edit-profile'
const CHANGE_PASSWORD = '/change-password'
//

//비디오
const VIDEOS = '/videos'
const UPLOAD = '/upload'
const VIDEO_DETAIL = '/:id'
const EDIT_VIDEO = '/:id/edit'
const DELETE_VIDEO = '/:id/delete'

//경로를 저장할 오브젝트 생성
const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: id => {
    if (id) {
      return `${USERS}/${id}`
    } else {
      return USER_DETAIL
    }
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIDEOS,
  upload: UPLOAD,
  videoDetail: id => {
    if (id) {
      return `/videos/${id}`
    } else {
      return VIDEO_DETAIL
    }
  },
  editVideo: id => {
    if (id) {
      return `/videos/${id}/edit`
    } else {
      return EDIT_VIDEO
    }
  },
  deleteVideo: DELETE_VIDEO
}

export default routes
