/* eslint-disable no-undef */
import passport from 'passport'
import User from './models/User'
import GithubStrategy from 'passport-github'
import FacebookStrategy from 'passport-facebook'

import { githubLoginCallback, facebookLoginCallback } from './controllers/userController'
import routes from './routes'
passport.use(User.createStrategy())

//github Authenticate
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`
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
      callbackURL: `http://localhost:4000${routes.facebookCallback}`
    },
    facebookLoginCallback
  )
)

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
