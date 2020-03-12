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
const ME = '/me'
//

//비디오
const VIDEOS = '/videos'
const UPLOAD = '/upload'
const VIDEO_DETAIL = '/:id'
const EDIT_VIDEO = '/:id/edit'
const DELETE_VIDEO = '/:id/delete'

// Github
const GITHUB = '/auth/github'
const GITHUB_CALLBACK = '/auth/github/callback'
// Facebook
const FACEBOOK = '/auth/facebook'
const FACEBOOK_CALLBACK = '/auth/facebook/callback'
// Google
const GOOGLE = '/auth/google'
const GOOGLE_CALLBACK = '/auth/google/callback'

// API
const API = '/api'
const REGISTER_VIEW = '/:id/view'

//경로를 저장할 오브젝트 생성
const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  me: ME,
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
  deleteVideo: id => {
    if (id) {
      return `/videos/${id}/delete`
    } else {
      return DELETE_VIDEO
    }
  },
  github: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  facebook: FACEBOOK,
  facebookCallback: FACEBOOK_CALLBACK,
  google: GOOGLE,
  googleCallback: GOOGLE_CALLBACK,
  api: API,
  registerView: REGISTER_VIEW
}

export default routes
