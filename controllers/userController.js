import routes from '../routes'

//GET 방식
export const getJoin = (req, res) => {
  res.render('Join', { pageTitle: 'Join' })
}

//POST 방식
export const postJoin = (req, res) => {
  const {
    body: { name, email, ninkname, password, password2 }
  } = req
  if (password !== password2) {
    //패스워드가 일치하지 않다는 상태 코드(status code) 전달
    res.status(400)
    res.render('Join', { pageTitle: 'Join' })
  } else {
    // 사용자 등록
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
export const logout = (req, res) => res.render('Logout', { pageTitle: 'Logout' })
export const userDetail = (req, res) => res.render('UserDetail', { pageTitle: 'User Detail' })
export const editProfile = (req, res) => res.render('EditProfile', { pageTitle: 'Edit Profile' })
export const changePassword = (req, res) => res.render('ChangePassword', { pageTitle: 'ChangePassword' })
