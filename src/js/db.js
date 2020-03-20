/* eslint-disable no-undef */

import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

//배포일 경우 MONGO 클라우드에 접속 아닐시에는 로컬 MONGO에 접속
mongoose.connect(process.env.PRODUCTION ? process.env.MONGO_URL_PROD : process.env.MONGO_URL, {
  useNewUrlParser: true,
  userFindAndModify: false
})

const db = mongoose.connection

//DB Connection 성공 여부
const handleOpen = () => console.log('Connected to DB Success')
//DB Connection 실패시
const handleError = error => console.log(`Error DB Connection: ${error}`)
//한번만 실행
db.once('open', handleOpen)

db.on('error', handleError)
