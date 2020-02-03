import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import globalRouter from './routers/globalRouter'
import userRouter from './routers/userRouter'
import videoRouter from './routers/videoRouter'
import routes from './routes'
import { localMiddleware } from './js/middlewares'
const app = express()

//Pug view engine
app.set('view engine', 'pug')
//미들웨어
app.use('/uploads', express.static('uploads'))
app.use('/static', express.static('static'))

app.use(helmet())
app.use(morgan('dev'))

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extends: true }))
//localMiddleware
app.use(localMiddleware)

//라우터
app.use(routes.home, globalRouter)
app.use(routes.users, userRouter)
app.use(routes.videos, videoRouter)

export default app
