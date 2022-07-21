import { prisma } from '../uttils/prisma'
import { Router } from 'express'
import { Request, Response } from 'express'

const router = Router()

router.post('/', async (req: Request, res: Response) => {
    let username = req.body.searchterm
    console.log(username)
    try {
        const user = await prisma.user.findFirst({
            where: {
                username: username,
            },
        })
        console.log(user)
        res.json(user)
    } catch (e) {
        res.json(e)
    }
})

export default router
