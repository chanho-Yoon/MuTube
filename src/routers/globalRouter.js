import express from 'express'
import passport from 'passport'
import routes from '../routes'
import { home, search } from '../controllers/videoController'
import {
  logout,
  getJoin,
  postJoin,
  postLogin,
  getLogin,
  githubLogin,
  postGithubLogIn,
  getMe,
  facebookLogin,
  postFacebookLogIn,
  googleLogin,
  postGoogleLogin
} from '../controllers/userController'
import { onlyPublic, onlyPrivate } from '../js/middlewares'

const globalRouter = express.Router()

globalRouter.get(routes.join, onlyPublic, getJoin)
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin)

globalRouter.get(routes.login, onlyPublic, getLogin)
globalRouter.post(routes.login, onlyPublic, postLogin)

globalRouter.get(routes.home, home)
globalRouter.get(routes.search, search)
globalRouter.get(routes.logout, onlyPrivate, logout)

globalRouter.get(routes.github, githubLogin)
globalRouter.get(
  routes.githubCallback,
  passport.authenticate('github', {
    failureRedirect: '/login',
    successFlash: '로그인 성공',
    failureFlash: '로그인 실패, 아이디 또는 비밀번호를 확인해주세요'
  }),
  postGithubLogIn
)

//페이스북 https로 인해 값 받아오는 것까지 완료, 터널링 ngrok 해봤지만 페이스북 자체에서 부정이라 등록이 안된다고함..
globalRouter.get(routes.facebook, facebookLogin)
globalRouter.get(
  routes.facebookCallback,
  passport.authenticate('facebook', {
    failureRedirect: '/login',
    successFlash: '로그인 성공',
    failureFlash: '로그인 실패, 아이디 또는 비밀번호를 확인해주세요'
  }),
  postFacebookLogIn
)

globalRouter.get(routes.google, googleLogin)
globalRouter.get(
  routes.googleCallback,
  passport.authenticate('google', {
    failureRedirect: '/login',
    successFlash: '로그인 성공',
    failureFlash: '로그인 실패, 아이디 또는 비밀번호를 확인해주세요'
  }),
  postGoogleLogin
)

globalRouter.get(routes.me, getMe)

export default globalRouter
