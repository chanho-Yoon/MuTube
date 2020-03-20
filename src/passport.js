/* eslint-disable no-undef */
import passport from 'passport'
import User from './models/User'
import GithubStrategy from 'passport-github'
import FacebookStrategy from 'passport-facebook'
import GoogleStrategy from 'passport-google-oauth20'
import { githubLoginCallback, facebookLoginCallback, googleLoginCallback } from './controllers/userController'
import routes from './routes'
passport.use(User.createStrategy())

//github Authenticate
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: process.env.PRODUCTION
        ? `https://powerful-fortress-80578.herokuapp.com${routes.githubCallback}`
        : `http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback
  )
)
//facebook Authenticate
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: `https://903309e6.ngrok.io${routes.facebookCallback}`
    },
    facebookLoginCallback
  )
)

//google Authenticate
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.PRODUCTION
        ? `https://powerful-fortress-80578.herokuapp.com${routes.githubCallback}`
        : `http://localhost:4000${routes.googleCallback}`
    },
    googleLoginCallback
  )
)

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
