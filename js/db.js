import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })

const db = mongoose.connection

//DB Connection 성공 여부
const handleOpen = () => console.log('Connected to DB Success')
//DB Connection 실패시
const handleError = error => console.log(`Error DB Connection: ${error}`)
//한번만 실행
db.once('open', handleOpen)

db.on('error', handleError)
