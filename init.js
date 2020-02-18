/* eslint-disable no-undef */
import dotenv from 'dotenv'
import './js/db'
import app from './app'

dotenv.config()

import './models/Video'
import './models/User'
import './models/Comment'

const PORT = process.env.PORT

const handleListening = () => console.log(`✅ Listening on : http://localhost:${PORT}`)

app.listen(PORT, handleListening)
