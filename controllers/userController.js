import routes from '../routes'
import User from '../models/User'
//GET 방식
export const getJoin = (req, res) => {
  res.render('Join', { pageTitle: 'Join' })
}

//POST 방식
export const postJoin = async (req, res) => {
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
    } catch (error) {
      console.log(error)
    }

    // 사용자 로그인
    res.redirect(routes.home)
  }
}
export const getLogin = (req, res) => {
  res.render('Login', { pageTitle: 'Login' })
}
export const postLogin = (req, res) => {
  res.redirect(routes.home)
}
export const logout = (req, res) => {
  // 로그아웃
  res.redirect(routes.home)
}
export const userDetail = (req, res) => res.render('UserDetail', { pageTitle: 'User Detail' })
export const editProfile = (req, res) => res.render('EditProfile', { pageTitle: 'Edit Profile' })
export const changePassword = (req, res) => res.render('ChangePassword', { pageTitle: 'ChangePassword' })
