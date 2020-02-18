/* eslint-disable no-undef */
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import passport from 'passport'

import session from 'express-session'
import { localMiddleware } from './js/middlewares'
import globalRouter from './routers/globalRouter'
import userRouter from './routers/userRouter'
import videoRouter from './routers/videoRouter'
import routes from './routes'

import './passport'

const app = express()

app.use(helmet())
//Pug view engine
app.set('view engine', 'pug')
//미들웨어
app.use('/uploads', express.static('uploads'))
app.use('/static', express.static('static'))

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false
  })
)
app.use(passport.initialize())
app.use(passport.session())

//localMiddleware
app.use(localMiddleware)

//라우터
app.use(routes.home, globalRouter)
app.use(routes.users, userRouter)
app.use(routes.videos, videoRouter)

export default app
