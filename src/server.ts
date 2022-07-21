import express from 'express'
import cors from 'cors'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import authRouter from './uttils/githubauth'
import userRouter from '../src/routes/user'
import { Server } from 'socket.io'
import chat from './controllers/chat'
import search from './routes/search'
const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
})

app.use(cors({ origin: true, credentials: true }))
app.use(bodyParser.json())
app.use(cookieParser())

chat(io)

app.use('/api/auth', authRouter)
app.use('/api/me', userRouter)
app.use('/api/search', search)

export default server
