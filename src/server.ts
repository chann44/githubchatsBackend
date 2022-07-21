import express from 'express'
import cors from 'cors'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import authRouter from './uttils/githubauth'
import userRouter from '../src/routes/user'
import { prisma } from './uttils/prisma'
const app = express()
const server = http.createServer(app)

app.use(cors({ origin: true, credentials: true }))
app.use(bodyParser.json())
app.use(cookieParser())

const findall = async () => {
    const users = await prisma.user.findMany()
    console.log(users)
}

findall()

app.use('/api/auth', authRouter)
app.use('/api/me', userRouter)

export default server
