import express from 'express'
import routes from '../routes'
const globalRouter = express.Router()

globalRouter.get(routes.home, (req, res) => res.send('hi Home!!'))
globalRouter.get(routes.join, (req, res) => res.send('hi join!!'))
globalRouter.get(routes.login, (req, res) => res.send('hi login!!'))
globalRouter.get(routes.logout, (req, res) => res.send('hi logout!!'))
globalRouter.get(routes.search, (req, res) => res.send('hi search!!'))
export default globalRouter
