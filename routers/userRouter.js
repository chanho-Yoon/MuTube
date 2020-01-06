import express from 'express'

const userRouter = express.Router()

userRouter.use((req, res) => {
  res.send('hi user Router!')
})

export default userRouter
