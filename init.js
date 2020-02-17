/* eslint-disable no-undef */
import app from './app'
import dotenv from 'dotenv'
import './js/db'
import './models/Video'
import './models/User'
import './models/Comment'
dotenv.config()

const PORT = process.env.PORT || 4000

const handleListening = () => console.log(`✅ Listening on : http://localhost:${PORT}`)

app.listen(PORT, handleListening)
