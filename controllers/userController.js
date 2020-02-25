import routes from '../routes'
import User from '../models/User'
import passport from 'passport'
//GET 방식
export const getJoin = (req, res) => {
  res.render('Join', { pageTitle: 'Join' })
}

//POST 방식
export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, nickname, password, password2 }
  } = req
  if (password !== password2) {
    //패스워드가 일치하지 않다는 상태 코드(status code) 전달
    res.status(400)
    res.render('Join', { pageTitle: 'Join' })
  } else {
    // 사용자 등록
    try {
      const user = await User({
        name,
        email,
        nickname
      })
      await User.register(user, password)
      next()
    } catch (error) {
      console.log(error)
      res.redirect(routes.home)
    }
  }
}

export const getLogin = (req, res) => {
  res.render('Login', { pageTitle: 'Login' })
}
//github로 로그인
export const githubLogin = passport.authenticate('github')

export const githubLoginCallback = async (accessToken, refreshToken, profile, cb) => {
  const {
    _json: { id, avatar_url, login: name, email }
  } = profile
  try {
    const user = await User.findOne({ email: email })
    //동일한 이메을 가졌을 때는 이미 가입중인 사용자라 바로 로그인하도록 아니라면 신규 사용자 생성
    if (user) {
      user.githubId = id
      user.save()
      return cb(null, user)
    } else {
      const newUser = await User.create({
        email,
        name,
        githubId: id,
        avatarUrl: avatar_url
      })
      return cb(null, newUser)
    }
  } catch (error) {
    return cb(error)
  }
}
export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home)
}
//-----------------------------------------------------------------------------------
//facebook로 로그인 , https 문제로 ngrok로 https 도메인 생성 후 테스트 해봐도 페이스북 개발자 페이지에서 등록되지 않음.. 다음 https때 테스트 예정
export const facebookLogin = passport.authenticate('facebook')

export const facebookLoginCallback = async (accessToken, refreshToken, profile, cb) => {
  console.log(accessToken, refreshToken, profile, cb)
}
export const postFacebookLogIn = (req, res) => {
  res.redirect(routes.home)
}
//-----------------------------------------------------------------------------------
// google로 로그인
export const googleLogin = passport.authenticate('google', { scope: ['profile', 'email'] })

export const googleLoginCallback = async (accessToken, refreshToken, profile, cb) => {
  const {
    _json: { sub: id, picture: avatar_url, name, email }
  } = profile

  try {
    const user = await User.findOne({ email: email })
    if (user) {
      user.googleId = id
      user.save()
      return cb(null, user)
    } else {
      const newUser = await User.create({
        email,
        name,
        googleId: id,
        avatarUrl: avatar_url
      })
      return cb(null, newUser)
    }
  } catch (error) {
    return cb(error)
  }
}
export const postGoogleLogin = (req, res) => {
  res.redirect(routes.home)
}
//-----------------------------------------------------------------------------------

export const postLogin = passport.authenticate('local', {
  //로그인 실패시 failure, 성공시 success
  failureRedirect: routes.login,
  successRedirect: routes.home
})

export const logout = (req, res) => {
  // 로그아웃
  req.logout()
  res.redirect(routes.home)
}

export const getMe = (req, res) => {
  res.render('UserDetail', { pageTitle: 'User Detail', user: req.user })
}

export const userDetail = async (req, res) => {
  //url에 users/무작위값 을 넣었을 경우 홈으로 바로 이동 되도록
  try {
    const {
      params: { id }
    } = req
    const user = await User.findById(id)
    res.render('UserDetail', { pageTitle: 'User Detail', user })
  } catch (error) {
    res.redirect(routes.home)
  }
}
export const editProfile = (req, res) => res.render('EditProfile', { pageTitle: 'Edit Profile' })
export const changePassword = (req, res) => res.render('ChangePassword', { pageTitle: 'ChangePassword' })
