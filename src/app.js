/* eslint-disable no-undef */
import '@babel/polyfill'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import passport from 'passport'
import path from 'path'
import mongoStore from 'connect-mongo'
import mongoose from 'mongoose'
import session from 'express-session'
import { localMiddleware } from './js/middlewares'
import globalRouter from './routers/globalRouter'
import userRouter from './routers/userRouter'
import videoRouter from './routers/videoRouter'
import apiRouter from './routers/apiRouter'
import routes from './routes'

import './passport'

const app = express()

//Cookie Stroe 생성
const CookieStore = mongoStore(session)

app.use(helmet())
//Pug view engine
app.set('view engine', 'pug')
//미들웨어
app.set('views', path.join(__dirname, 'views'))
app.use('/static', express.static(path.join(__dirname, 'static')))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection })
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
app.use(routes.api, apiRouter)
export default app
