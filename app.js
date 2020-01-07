import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import globalRouter from './routers/globalRouter'
import userRouter from './routers/userRouter'
import videoRouter from './routers/videoRouter'
import routes from './routes'
const app = express()

//미들웨어
app.use(helmet())
app.use(morgan('dev'))

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extends: true }))
//라우터
app.use(routes.home, globalRouter)
app.use(routes.users, userRouter)
app.use(routes.vidoes, videoRouter)

export default app
